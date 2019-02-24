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
  <link rel="stylesheet" href="./style.css">

</head>

<body>

  <div class="container-fluid bg-dark" ng-app="userApp" ng-controller="userCtrl" ng-init="init()">
    <div class="row">

      <div class="col-md-6 my-3">
        <div class="container-fluid">
          <h1 class="text-info d-inline float-left">You are logged in as
            <?php echo $user; ?>
            <h1>
              <button class="btn btn-primary d-inline float-right" type="button" ng-click="goLogout()">Logout</button>
        </div>
      </div>

      <div class="col-md-6 my-3">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Find more friends</span>
          </div>
          <input class="form-control" type="text" ng-model="pattern" ng-keyup="searchFriend()" ng-click="searchFriend()">
          <table class="form-control-text table table-hover">
            <tr class="table-info" ng-repeat="x in friendSugestions track by $index" ng-if="$index < 3">
              <td>{{x}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

  </div>

  <script src="./userApp.js"></script>

</body>

</html>
