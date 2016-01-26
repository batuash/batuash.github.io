(function () {
    var module = angular.module("app");

    module.controller("gameController", ['$scope', 'gameService', 'authenticationService', '$interval', 'userService', function ($scope, gameService, authenticationService, $interval, userService) {
        $scope.dropDownCollection = {
            "negativeOne": { 'value': -1 },
            "zero": { 'value': 0 },
            "positiveOne": { 'value': 1 },
        };
        $scope.valueToAdd = 0;
        $scope.messageList = [];
        $scope.gameData = {};
        $scope.showForm = false;
        $scope.showBackBtn = false;
        $scope.errorMessage = "";

        $scope.send = function () {
            console.log($scope.valueToAdd);
            var valueToAdd = $scope.valueToAdd.value;
            if (($scope.gameData.CurrentValue + valueToAdd) % 3 == 0) {
                update($scope.gameData.CurrentValue + valueToAdd);
            }
            else {
                $scope.errorMessage = "Please add a number so that the result is dividable by 3";
            }
        }

        var intervalPromise = "";
        var currentUser = {};

        var update = function (newValue) {
            gameService.updateGame($scope.gameData.GameId, $scope.gameData.Player1, $scope.gameData.Player2, $scope.gameData.CurrentPlayer, newValue)
            .then(function (response) {
                if (response.success) {
                    refresh();
                }
                else {
                    console.log("error");
                }
            });
        }

        var refresh = function () {
            gameService.GetGame(currentUser.CurrentGame).then(function (response) {
                if (response.success) {
                    $scope.gameData = response.data;
                    $scope.messageList = response.data.MessageList;
                    $scope.showForm = (response.data.CurrentPlayer == authenticationService.getCredentials().username);
                    setCorrectValue();
                    if ($scope.gameData.CurrentValue == 1) {
                        $interval.cancel(intervalPromise);
                        userService.updateUser(currentUser.Name, currentUser.status, '');
                        $scope.showForm = false;
                        $scope.showBackBtn = true;
                    }
                }
                else {
                    console.log("error");
                }
            });
        };

        var setCorrectValue = function () {
            if (($scope.gameData.CurrentValue + $scope.dropDownCollection.negativeOne.value) % 3 == 0) {
                $scope.valueToAdd = $scope.dropDownCollection.negativeOne;
            }
            else if (($scope.gameData.CurrentValue + $scope.dropDownCollection.zero.value) % 3 == 0) {
                $scope.valueToAdd = $scope.dropDownCollection.zero;
            }
            else {
                $scope.valueToAdd = $scope.dropDownCollection.positiveOne;
            }
        }

        var init = function () {
            userService.getCurrentUser().then(function (response) {
                if (response.success) {
                   currentUser = response.data;
                    intervalPromise = $interval(function () {
                        refresh();
                    }, 3000);

                    $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
                }
            });
        };

        init();
    }]);
})();