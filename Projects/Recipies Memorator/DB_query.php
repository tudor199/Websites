<?php declare(strict_types=1);
  require("../SQL_login.php");

  $conn = new mysqli($SQL_hostname, $SQL_username, $SQL_password, $SQL_database);
  $outp = [];

  $type = $_GET["type"];

  if ($type == "hint") {
    $pattern = $_GET["pattern"];
    $sql = "SELECT name FROM recipies WHERE name LIKE '$pattern';";
    $result = $conn->query($sql);
    $resultarr = $result->fetch_all(MYSQLI_ASSOC);
    foreach ($resultarr as $key => $value) {
      $outp[$key] = $value["name"];
    }
    echo json_encode($outp);
  } elseif ($type == "load") {
    $name = $_GET["name"];
    $sql = "SELECT ingredients FROM recipies WHERE name = '$name';";
    $result = $conn->query($sql);
    $resultarr = $result->fetch_all(MYSQLI_ASSOC);
    if (sizeof($resultarr) == 0) {
      echo 1;
    } else {
      echo $resultarr[0]["ingredients"];
    }
  } else {
    $name = $_GET["name"];
    $ingredients = $_GET["ingredients"];
    $sql1 = "SELECT ingredients FROM recipies WHERE name = '$name';";
    $result = $conn->query($sql1);
    $resultarr = $result->fetch_all(MYSQLI_ASSOC);

    if ($type == "add") {
      if (sizeof($resultarr) == 0) {
        $sql2 = "INSERT INTO recipies (name, ingredients) VALUES ('$name', '$ingredients')";
        $conn->query($sql2);
        echo 0;
      } else {
        echo 1;
      }
    } else {
      if (sizeof($resultarr) == 0) {
        $sql2 = "INSERT INTO recipies (name, ingredients) VALUES ('$name', '$ingredients')";
        echo 0;
      } else {
        $sql2 = "UPDATE recipies SET ingredients = '$ingredients' WHERE name = '$name'";
        echo 1;
      }
      $conn->query($sql2);
    }
  }

  $conn->close();
