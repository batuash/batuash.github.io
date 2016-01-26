(function () {
    var module = angular.module("app");

    module.controller("loginController", ['$scope', 'userService', 'authenticationService', '$timeout', '$location', function ($scope, userService, authenticationService, $timeout, $location) {
        $scope.userName = "";
        $scope.loginMessage = "";

        $scope.login = function () {
            userService.createUser($scope.userName).then(function (response) {
                if (response.success) {
                    $scope.loginMessage = 'Logged in, redirecting to home page..';
                    authenticationService.setCredentials($scope.userName);
                    $timeout(function () { $location.path('/home'); }, 2000);
                }
                else if (response.statusCode == 409) {
                    $scope.loginMessage = response.errorMessage;
                }
            });
        }
    }]);
})();