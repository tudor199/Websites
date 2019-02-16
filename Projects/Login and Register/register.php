<?php
    require("../SQL_login.php");

    $conn = new mysqli($SQL_hostname, $SQL_username, $SQL_password, $SQL_database);
    if ($conn->connect_error) {
        die(0); // "Connection failed: " . $conn->connect_error
    }
    
    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);
    $rep_password = htmlspecialchars($_POST["rep_password"]) . $salt;
    $salt = "mySalt";
    $hash = hash('sha256', $password . $salt);

    if ($password != $rep_password) {
        die(0); // "Passwords don`t match!"
    }

    $sql = "SELECT * FROM accounts
            WHERE username = '$username'";
    if ($result = $conn->query($sql)) {
        if ($result->num_rows != 0) {
            die(0); // "Username already exists!"
        }
    } else {
        die(0); // "error 1st querry: " . $conn->error
    }

    $sql = "INSERT INTO accounts (username, password, hash)
            VALUES ( '$username', '$password','$hash' );";
    if ($conn->query($sql)) {
        session_start();
        $_SESSION["username"] = $username;
        echo 1; // "Register succesful!"
    } else {
        die(0); // "error 2nd querry: " . $conn->error
    }
    $conn->close();
