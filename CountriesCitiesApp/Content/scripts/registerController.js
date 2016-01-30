(function () {
    var module = angular.module("app");

    module.controller("registerController", ['$scope', 'webApiService', '$timeout', '$location', function ($scope, webApiService, $timeout, $location) {
        $scope.userName = "";
        $scope.userPassword = "";
        $scope.registerMessage = "";

        $scope.register = function () {
            $scope.registerMessage = "";

            webApiService.createUser($scope.userName, $scope.userPassword).then(function (response) {
                if (response.success) {
                    $scope.registerMessage = "User created, redirecting to login page..";
                    $timeout(function () { $location.path('/login/'); }, 3000);          
                }
                else if (response.statusCode == 409) {
                    $scope.registerMessage = "User name already exist, please choose a different user name";
                }
            });
        };
    }]);
})();