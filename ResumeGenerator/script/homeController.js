(function () {
    var module = angular.module("app");

    module.controller("homeController", function ($scope, $location) {
        $scope.header = "GITHUB RESUME GENERATOR";
        $scope.message = "Enter a github user name, then click the button to generte a user resume";
        $scope.userName = "";
        $scope.valid = true;

        $scope.generateUserResume = function () {
            $location.path("/userresume/" + $scope.userName);
        };
    });
})();