(function () {
    var module = angular.module("app");
    module.controller("mainController", ['$scope', 'authenticationService', '$location', function ($scope, authenticationService, $location) {
        $scope.userName = authenticationService.getCredentials().username;

        $scope.signOut = function () {
            authenticationService.clearCredentials();
            $location.path('/login/');
        };
    }]);
})();