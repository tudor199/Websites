<?php
    session_start();
    $user =  ($_COOKIE["username"] ? $_COOKIE["username"] : $_SESSION["username"]);
    if (!$user) {
        header('LOCATION: ./index_guest.php');
    }
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>User</title>

        <!-- CDNs -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>


        <!-- Local files -->
        <link rel="stylesheet" href="./lrcss.css">
        <script src="./userApp.js"></script>


    </head>
    <body>
        <div class="fluid-container m-4 row" ng-app="userApp" ng-controller="userCtrl" ng-init="init()">
            <div class="col-md-6">
                <div class="row text-info">
                    <?php
                        echo "<h1>You are logged in as " . $user . "<h1>";
                     ?>
                     <button class="btn btn-primary" type="button" ng-click="goLogout()">Logout</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Find more friends</span>
                    </div>
                    <input class="form-control" type="text" ng-model="pattern" ng-keyup="searchFriend()" ng-click="searchFriend()">
                    <table class="form-control-text table table-hover">
                        <tr class="table-info"
                            ng-repeat="x in friendSugestions" ng-if="$index < 3">
                            <td>{{x}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
