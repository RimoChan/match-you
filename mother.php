<?php

function rmrf($path)
{
  if (is_dir($path)) {
    // https://www.php.net/manual/en/function.glob.php#125723
    foreach (glob(rtrim($path, '/') . '/{.[!.],}*', GLOB_BRACE) as $sub) {
      rmrf($sub);
    }
    rmdir($path);
  } else {
    unlink($path);
  }
}


echo "Delete vendor folder" . PHP_EOL;
rmrf("./vendor");

echo "Clear composer cache" . PHP_EOL;
exec("composer clear-cache");

echo "Done" . PHP_EOL;
