<?php
    require("../SQL_login.php");

    $conn = new mysqli($SQL_hostname, $SQL_username, $SQL_password, $SQL_database);
    if ($conn->connect_error) {
        die(0); // "Connection failed: " . $conn->connect_error
    }
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);
    $persistence = htmlspecialchars($_POST["persistence"]) === "true";
    $hash = hash('sha256', $password);
    $sql = "SELECT * FROM accounts
            WHERE username = '$username' AND hash = '$hash';";
    if ($result = $conn->query($sql)) {
        if ($result->num_rows != 0) {
            if ($persistence == "true") {
                setcookie("username", $username, time() + (86400 * 30), "./"); // 86400 = 1 day
            } else {
                session_start();
                $_SESSION["username"] = $username;
            }

            echo 1; // "Login succesful!"
        } else {
            echo 0; // "Wrong password and username combination!";
        }
    } else {
        die(0); // "error: " . $conn->error
    }

    $conn->close();
 ?>
