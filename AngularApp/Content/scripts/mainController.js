(function () {
    var module = angular.module("module1", ["ngRoute"]);

    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/AngularApp/view/main.html",
                controller: "mainController"
            })
            .when("/main", {
                templateUrl: "/AngularApp/view/main.html",
                controller: "mainController"
            })
            .when("/user/:username", {
                templateUrl: "/AngularApp/view/user.html",
                controller: "userController"
            })
            .when("/repo/:username/:reponame", {
                templateUrl: "/AngularApp/view/repo.html",
                controller: "repoController"
            })
            .otherwise({ redirectTo: "/main" });

        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
    }]);

    module.controller("mainController", function ($scope, $interval, $location) {
        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        var countdownInterval = null;
        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };

        $scope.search = function (username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + username);
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    });

    module.controller("userController", function ($scope, customService, $routeParams) {
        var onUserComplete = function (data) {
            $scope.error = "";
            $scope.user = data;
            customService.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function (data) {
            $scope.repos = data;
        };

        var onError = function (response) {
            $scope.error = "Could not fetch the user";
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = '-stargazers_count';
        customService.getUser($scope.username).then(onUserComplete, onerror);
    });

    module.controller("repoController", function ($scope, customService, $routeParams) {
        $scope.username = $routeParams.username;
        $scope.reponame = $routeParams.reponame;

        var onRepoDetailsComplete = function (data) {
            $scope.repoDetails = data;
        };
        var onRepoDetailsError = function (response) {
            $scope.error = "Could not fetch repo details";
        };

        customService.getRepoDetails($scope.username, $scope.reponame).then(onRepoDetailsComplete, onRepoDetailsError);
    });

}());