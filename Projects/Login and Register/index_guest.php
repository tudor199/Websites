<?php
    session_start();
    $user =  ($_COOKIE["username"] ? $_COOKIE["username"] : $_SESSION["username"]);
    if ($user) {
        header('LOCATION: ./index.php');
    }
 ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Guest</title>

    <!-- CDNs -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>

    <!-- Local files -->
    <link rel="stylesheet" href="./style.css">

</head>

<body>

    <div class="container-fluid bg-light" ng-app="guestApp" ng-controller="guestCtrl"  ng-init="init()">
        <div class="row">

            <!-- Register -->
            <div class="col-sm-6 my-3">
                <h1>Register</h1>
                <form name="rForm">
                    <input class="form-control col-md-4" type="text" name="rUser" placeholder="Username" pattern=".{3,}" required ng-model="rUser">
                    <div class="input-group">
                        <input class="form-control col-md-4" type="password" autocomplete="off" placeholder="Password" pattern=".{5,}" required ng-model="rPassword">
                        <input class="form-control col-md-4" type="password" autocomplete="off" placeholder="Repeat Password" pattern=".{5,}" required ng-model="repeatP">
                    </div>
                    <button class="btn btn-primary ml-3" type="button" name="button" ng-click="goRegister()" ng-disabled="rForm.$invalid">Register</button>
                </form>
            </div>

            <!-- Login -->
            <div class="col-sm-6 my-3">
                <h1>Login</h1>
                <form name="lForm">
                    <input class="form-control col-md-4" type="text" name="lUser" placeholder="Username" pattern=".{3,}" required ng-model="lUser">
                    <input class="form-control col-md-4" type="password" autocomplete="off" placeholder="Password" pattern=".{5,}" required ng-model="lPassword">
                    <div class="input-group">
                        <button class="btn btn-primary ml-3" type="button" name="button" ng-click="goLogin()" ng-disabled="lForm.$invalid">Login</button>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <input type="checkbox" id="persistence" ng-model="persistence">
                            </div>
                            <label class="input-group-text" for="persistence">Remember me</label>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>

    <script src="./guestApp.js"></script>

</body>

</html>
