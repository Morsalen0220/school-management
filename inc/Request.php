<?php
/**
 * This file handle request method
 */

/**
 * Implement autoload for controller classes
 */
spl_autoload_register(function ($className) {
  $file = __DIR__ . "/../api/controller/" . $className . ".php";
  if (file_exists($file)) {
    require_once $file;
  }
});

class Request
{
  private $_request = null;

  private $_user_role_points = [
    "super_admin" => 20,
    "admin" => 15,
    "accountant" => 10,
    "teacher" => 10,
    "librarian" => 10,
    "parent" => 7,
    "student" => 5,
  ];

  public function __construct($request)
  {
    $this->_request = $request;
  }

  public function get(
    string $class,
    string $method,
    string $parameter = ""
  ): Request {
    if ($this->_request["REQUEST_METHOD"] === "GET") {
      call_user_func([$class, $method], $parameter);
    }
    return $this;
  }

  public function post(string $class, string $method, $parameter = ""): Request
  {
    if ($this->_request["REQUEST_METHOD"] === "POST") {
      call_user_func([$class, $method], $parameter);
    }
    return $this;
  }

  public function patch(string $class, string $method, $parameter = ""): Request
  {
    if ($this->_request["REQUEST_METHOD"] === "PATCH") {
      call_user_func([$class, $method], $parameter);
    }
    return $this;
  }

  public function delete(
    string $class,
    string $method,
    $parameter = ""
  ): Request {
    if ($this->_request["REQUEST_METHOD"] === "DELETE") {
      call_user_func([$class, $method], $parameter);
    }
    return $this;
  }

  public function options(): Request
  {
    if ($this->_request["REQUEST_METHOD"] === "OPTIONS") {
      http_response_code(204);
      exit();
    }
    return $this;
  }

  private function valid_role($role): bool
  {
    if ($role === "any") {
      return true;
    }

    $required_point = $this->_user_role_points[$role];
    $current_point = $this->_user_role_points[LOGGEDIN_IN_USER_ROLE];

    return $required_point <= $current_point;
  }

  /**
   * Handle authentication
   * @param string user role
   */
  public function auth(string $role): Request
  {
    $data = User::verify_session();

    define("LOGGEDIN_IN_USER_ROLE", $data["user_role"]);
    define("LOGGEDIN_IN_USER_ID", $data["user_id"]);
    define("LOGGEDIN_IN_USER_SCHOOL_ID", ""); // TODO

    if (!$this->valid_role($role)) {
      send_response(false, 403, [
        'you don\'t have access to complete this request',
      ]);
    }

    return $this;
  }
}
