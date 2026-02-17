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
  <?php
  $assetDirectory = __DIR__ . '/public/assets';
  $manifestFile = $assetDirectory . '/manifest.json';
  $cssBundle = '';
  $jsBundle = '';

  if (file_exists($manifestFile)) {
    $manifestContent = file_get_contents($manifestFile);
    $manifest = json_decode($manifestContent ?: '', true);

    if (is_array($manifest) && isset($manifest['index.html'])) {
      $entry = $manifest['index.html'];

      if (isset($entry['file'])) {
        $jsBundle = '/public/assets/' . ltrim($entry['file'], '/');
      }

      if (isset($entry['css'][0])) {
        $cssBundle = '/public/assets/' . ltrim($entry['css'][0], '/');
      }
    }
  }

  if (empty($jsBundle) || empty($cssBundle)) {
    if (is_dir($assetDirectory)) {
      $cssMatches = glob($assetDirectory . '/index-*.css');
      $jsMatches = glob($assetDirectory . '/index-*.js');

      if (empty($cssBundle) && $cssMatches !== false && !empty($cssMatches)) {
        usort($cssMatches, static fn($a, $b) => filemtime($b) <=> filemtime($a));
        $cssBundle = '/public/assets/' . basename($cssMatches[0]);
      }

      if (empty($jsBundle) && $jsMatches !== false && !empty($jsMatches)) {
        usort($jsMatches, static fn($a, $b) => filemtime($b) <=> filemtime($a));
        $jsBundle = '/public/assets/' . basename($jsMatches[0]);
      }
    }
  }
  ?>
  <?php if (!empty($cssBundle)) : ?>
    <link rel="stylesheet" href="<?= $cssBundle ?>">
  <?php endif; ?>

  <?php if (!empty($jsBundle)) : ?>
    <script type="module" crossorigin src="<?= $jsBundle ?>"></script>
  <?php else : ?>
    <!-- Frontend bundle not found. Run `npm run build` to generate public/assets files. -->
  <?php endif; ?>
</head>

<body>
  <div id="root"></div>
  
</body>

</html>