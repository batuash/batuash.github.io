(function () {
    var module = angular.module("app");

    module.controller("userResumeController", function ($scope, $location, $routeParams, apiService) {
        $scope.description = "PASSIONATE GITHUB USER";
        $scope.error = "";
        $scope.showForm = false;
        $scope.userData = "{}";
        $scope.createdYear = "";
        $scope.userName = "";
        $scope.userLocation = "";
        $scope.userRepos = 0;
        $scope.userFollows = 0;
        $scope.userWebsite = "";
        $scope.userEmail = "";

        var onFetchUserComplete = function (data) {
            setUserInfo(data);
            apiService.getRepos(data).then(onFetchReposComplete, onFetchReposError);
        };

        var onFetchUserError = function (response) {
            $scope.error = "Could not fetch user";
        };

        var onFetchReposComplete = function (data) {
            $scope.userData = data;
        };

        var onFetchReposError = function (response) {
            $scope.error = "Could not fetch user data";
        };

        var setUserInfo = function (data) {
            $scope.showForm = true;
            var since = new Date(data.created_at);
            $scope.createdYear = since.getFullYear();
            $scope.userName = data.name;
            $scope.userLocation = data.location;
            $scope.userRepos = data.public_repos;
            $scope.userFollows = data.followers;
            $scope.userWebsite = data.blog;
            $scope.userEmail = data.email;
        };

        apiService.getUser($routeParams.username).then(onFetchUserComplete, onFetchUserError);
    });

})();