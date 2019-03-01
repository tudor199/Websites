<?php declare(strict_types=1);
  require("../SQL_login.php");
  session_start();
  $conn = new mysqli($SQL_hostname, $SQL_username, $SQL_password, $SQL_database);
  if ($conn->connect_error) {
    die(0); // "Connection failed: " . $conn->connect_error
  }

  $pattern = htmlspecialchars($_GET["pattern"]);
  $cUser =  ($_COOKIE["username"] ? $_COOKIE["username"] : $_SESSION["username"]);

  $sql = "SELECT username FROM accounts
      WHERE username LIKE '$pattern' AND username <> '$cUser';";


  if ($result = $conn->query($sql)) {
    $outp = [];
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($arr as $key => $value) {
      $outp[$key] = $value["username"];
    }
    echo json_encode($outp);
  } else {
    die(0); // "query error: " . $conn->error
  }

  $conn->close();
