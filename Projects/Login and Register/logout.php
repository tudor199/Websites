<?php declare(strict_types=1);
  session_start();
  session_unset();
  setcookie("username", "", time() - (86400 * 30), "./"); // 86400 = 1 day
