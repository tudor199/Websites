var app = angular.module("guestApp", []);
app.controller("guestCtrl", function($scope, $http) {
    $scope.persistence = false;

    var config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    $scope.goRegister = function() {
        var data = "username=" + $scope.rUser + "&password=" + $scope.rPassword + "&rep_password=" + $scope.repeatP;
        $http.post("./register.php", data, config).then(function(response) {
            if (~~response.data) {
                window.location.replace("./index_user.php");
            }
        });
    }
    $scope.goLogin = function() {
        var data = "username=" + $scope.lUser + "&password=" + $scope.lPassword + "&persistence=" + $scope.persistence;
        $http.post("./login.php", data, config).then(function(response) {
            console.log(response.data);

            if (~~response.data) {
                window.location.replace("./index_user.php");
            }
        });
    }
})
