<?php
require_once __DIR__ . "/../config.php";

if (APP_ENVIRONMENT === "development") {
  # Silent warning in api dev via postman, etc
  @header("Access-Control-Allow-Origin: " . $_SERVER["HTTP_ORIGIN"]);
}

header("Access-Control-Allow-Methods: 'GET, POST, PATCH, DELETE, OPTIONS'");
header(
  "Access-Control-Allow-Headers: 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'"
);
header("Access-Control-Allow-Credentials: true");

require_once __DIR__ . "/../inc/Query.php";
require_once __DIR__ . "/../inc/Request.php";
require_once __DIR__ . "/../inc/util.php";

# Handle request
$request = new Request($_SERVER);
$request->options();

$url = $_SERVER["REQUEST_URI"];
$parsedURL = parse_url($url);
$path = urldecode(substr($parsedURL["path"], 5));

if (strlen(trim($path)) === 0) {
  send_response(false, 404, ["endpoint not found"]);
}

/**
 * Get last part of an url to handle specific task
 */
preg_match('/[A-z0-9.]+$/i', $path, $matches);
@$specific_part = $matches[0];

try {
  switch ($path) {
    case str_starts_with($path, "login/"):
      # remove login/ from current path
      switch (substr($path, 6)) {
        case "super-admin":
          $request->post("SuperAdmin", "login");
          send_response(false, 405, ["method not allowed"]);
          break;

        case "admin":
          $request->post("Admin", "login");
          send_response(false, 405, ["method not allowed"]);
          break;

        case "student":
          $request->post("Student", "login");
          send_response(false, 405, ["method not allowed"]);
          break;
      }
      break;

    case "logout":
      $request->get("User", "remove_session");
      send_response(false, 405, ["method not allowed"]);
      break;

    case str_starts_with($path, "user"):
      # Remove user/
      switch (substr($path, 5)) {
        case "super-admin":
          $request
            ->get("SuperAdmin", "isAvailable")
            ->post("SuperAdmin", "create")
            ->auth("super_admin")
            ->patch("SuperAdmin", "update");

          send_response(false, 405, ["method not allowed"]);
          break;

        case "admin":
          $request
            ->auth("super_admin")
            ->get("Admin", "get")
            ->post("Admin", "create")
            ->patch("Admin", "update");

          send_response(false, 405, ["method not allowed"]);
          break;

        case str_starts_with(substr($path, 5), "admin/"):
          $request
            ->auth("admin")
            ->get("Admin", "get_specific")
            ->patch("Admin", "update")
            ->delete("Admin", "delete");

          send_response(false, 405, ["method not allowed"]);
          break;

        case "librarian":
          send_response(false, 405, ["method not allowed"]);
          break;

        case "accountant":
          $request
            ->auth("admin")
            ->get("Accountant", "get")
            ->post("Accountant", "create")
            ->patch("Accountant", "update");

          send_response(false, 405, ["method not allowed"]);
          break;

        case "student":
          send_response(false, 405, ["method not allowed"]);
          break;

        case "me":
          $request->get("User", "me");
          send_response(false, 405, ["method not allowed"]);
      }

      break;

    case "school":
      $request
        ->auth("super_admin")
        ->get("School", "get")
        ->post("School", "create")
        ->patch("School", "update");

      send_response(false, 405, ["method not allowed"]);
      break;

    case str_starts_with($path, "school"):
      $request
        ->auth("super_admin")
        ->get("School", "get_specific", $specific_part)
        ->patch("School", "update", $specific_part)
        ->delete("School", "delete", $specific_part);

      send_response(false, 405, ["method not allowed"]);
      break;

    /**
     * Handle all image action
     */
    case "image":
      $request
        ->auth("any")
        ->get("Image", "return_all")
        ->post("Image", "upload");
      send_response(false, 405, ["method not allowed"]);
      break;

    /**
     * Handle specific image action
     */
    case str_starts_with($path, "image"):
      $request
        ->get("Image", "return", $specific_part) // TODO remove if not found any use case
        ->delete("Image", "delete", $specific_part);
      send_response(false, 405, ["method not allowed"]);
      break;
  }
} catch (CustomException $e) {
  send_response(false, 400, [$e->getMessage()]);
} catch (PDOException $e) {
  if (SHOW_PDO_ERROR === true) {
    send_response(false, 500, [$e->getMessage()]);
  } else {
    send_response(false, 500, [
      "something went wrong, please try again later!",
    ]);
  }
}

send_response(false, 404, ["endpoint not found"]);
