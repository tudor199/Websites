var app = angular.module("recipieApp", []);
app.controller("recipieCtrl", function($scope, $http, $timeout) {
    $scope.show_hint = false;

    $scope.blur_hintTimeout = function() {
        $timeout(function() {
            $scope.show_hint = false;
        }, 100);
    }
    $scope.focus_hintTimeout = function() {
        $timeout(function() {
            $scope.show_hint = true;
        }, 110);
    }

    $scope.hintSet = function(idx) {
        if (document.getElementById("hint_display").style.top == "113px") {
            $scope.hintPattern = $scope.hints[idx];
        } else {
            $scope.recipieName = $scope.hints[idx];
        }
    }

    $scope.removeItem = function(idx) {
        $scope.ingredients.splice(idx, 1);
    }
    $scope.addItem = function() {
        if ((~~$scope.addMeWeight) == 0) {
            $scope.ingredients.push({
                name: $scope.addMeName.toLowerCase(),
                weight: ""
            });
        } else {
            $scope.ingredients.push({
                name: $scope.addMeName.toLowerCase(),
                weight: $scope.addMeWeight + " g"
            });
        }
        $scope.addMeName = null;
        $scope.addMeWeight = null;
        document.getElementById("inp21").focus();
    }

    $scope.loadRecipie = function() {
        var name = $scope.hintPattern.toLowerCase();
        $http.get("./DB_query.php?type=load&name=" + name).then(function(response) {
            if (~~response.data != 0) {
                alert("No recipie found for this product!");
                return;
            }
            $scope.ingredients = response.data;
            $scope.recipieName = name;
            $scope.hintPattern = "";
        });
    }
    $scope.clearInputs = function() {
        $scope.ingredients = [];
        $scope.hintPattern = "";
        $scope.recipieName = "";
        $scope.addMeName = "";
        $scope.addMeWeight = null;
    }

    $scope.getHint = function(forSearch) {
        var pattern = (forSearch == "loadHint" ? $scope.hintPattern : $scope.recipieName);
        pattern += "%";
        $http.get("./DB_query.php?type=hint&pattern=" + pattern).then(function(response) {
            if (forSearch == "loadHint") {
                document.getElementById("hint_display").style.top = "113px";
            } else {
                var hintEl = Math.min(response.data.length, 3);
                var ingrEl = ($scope.ingredients.length == 0 ? 1 : $scope.ingredients.length);
                var startPoint = 200;
                var rowsize = 50;
                document.getElementById("hint_display").style.top = (startPoint + (ingrEl - hintEl) * rowsize) + "px";
            }
            $scope.hints = response.data;
        });
    }

    $scope.updateData = function(type) {
        if (type == "update" && !confirm("Are you sure you want to modify current recipie?")) {
            return;
        }
        var name = $scope.recipieName.toLowerCase();
        var ingredients_json = JSON.stringify($scope.ingredients);
        $http.get("./DB_query.php?type=" + type + "&name=" + name + "&ingredients_json=" + ingredients_json).then(function(response) {
            if (type == "add") {
                if (~~response.data != 0) {
                    window.alert("Recipie already exists!");
                } else {
                    window.alert("Recipie has been added!");
                }
            } else {
                if (~~response.data != 0) {
                    window.alert("Recipie has been modified!");
                } else {
                    window.alert("Recipie has been added!");
                }
            }
        });
    }

});
