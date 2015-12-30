//example of implementing a custom service in angular
(function () {

    //service constructor
    var customService = function ($http) {

        //service method: getUser returns the requested user object
        var getUser = function (username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        //service method: getRepos returns the requested repos collection
        var getRepos = function (user) {
            return $http.get(user.repos_url)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepoDetails = function (username, reponame) {
            var url = "https://api.github.com/repos/" + username + "/" + reponame;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        };
        //finally return the API of the service 
        return {
            getUser: getUser,
            getRepos: getRepos,
            getRepoDetails: getRepoDetails
        };
    };

    //get an existing module
    var module = angular.module("module1");

    //create a new custom service, pass-in the name of the service and a function that init's the service
    module.factory("customService", customService);
}());