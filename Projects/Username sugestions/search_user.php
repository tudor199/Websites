<?php
    require("SQL_login.php");

    $conn = new mysqli($SQL_hostname, $SQL_username, $SQL_password, $SQL_database);
    if ($conn->connect_error) {
        die("connection error: " . $conn->connect_error);
    }

    $pattern = htmlspecialchars($_GET["pattern"]);
    // $pattern = htmlspecialchars($_POST["pattern"]);

    $hint = "";

    $sql = "SELECT username FROM accounts
            WHERE username LIKE '$pattern" . "%';";


    // array method
    if ($result = $conn->query($sql)) {
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        foreach ($outp as $key => $value) {
            $hint .= ', ' . $value["username"];
        }
        $hint = $hint === "" ? "no suggestions" : substr($hint, 2);
        echo $hint;
    } else {
        die("query error: " . $conn->error);
    }


    die();


    // row by row method;
    if ($result = $conn->query($sql)) {
        while ($rows = $result->fetch_array()) {
            $hint .= ', ' . $rows[0];
        }
        $hint = $hint === "" ? "no suggestions" : substr($hint, 2);
        echo $hint;
    } else {
        die("query error: " . $conn->error);
    }
?>
