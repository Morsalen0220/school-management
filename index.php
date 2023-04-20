<?php
# Include config file
require_once __DIR__ . "/config.php";

# Load installation page if site is not installed
if (APP_INSTALLED == false) {
  require __DIR__ . "/setup.php";
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image" href="/public/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>School Management System</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
    rel="stylesheet">
  <script type="module" crossorigin src="/public/assets/index-37e3ab65.js"></script>
  <link rel="stylesheet" href="/public/assets/index-47feb48f.css">
</head>

<body>
  <div id="root"></div>
  
</body>

</html>