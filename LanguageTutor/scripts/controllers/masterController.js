(function () {
    var module = angular.module("app");
    module.controller("masterController", ['$scope', '$location', 'authenticationService', function ($scope, $location, authenticationService) {
        $scope.userName = authenticationService.getCredentials().username;
        $scope.blnIsLoading = false;

        $scope.signOut = function () {
            authenticationService.clearCredentials();
            $location.path('/login/');
        };

        //getter n setter
        $scope.showLoadingIcon = function () {
            $scope.blnIsLoading = true;
        }

        $scope.hideLoadingIcon = function () {
            $scope.blnIsLoading = false;
        }
    }]);
})();