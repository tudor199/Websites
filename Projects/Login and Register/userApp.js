"use strict";

var app = angular.module("userApp", []);
app.controller("userCtrl", function($scope, $http) {
  $scope.init = function() {
    $scope.pattern = "";
    $scope.friendSugestions = [];
  }

  $scope.goLogout = function() {
    $http.get("./logout.php");
    window.location.replace("./index_guest.php");
  }

  $scope.searchFriend = function() {
    var pattern = $scope.pattern + "%";
    $http.get("./search_user.php?pattern=" + pattern).then(function(response) {
      $scope.friendSugestions = response.data;
    });
  }
})
