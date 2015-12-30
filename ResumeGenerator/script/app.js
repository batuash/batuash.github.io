(function () {
    var module = angular.module("app", ["ngRoute"]);

    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/ResumeGenerator/html/home.html",
                controller: "homeController"
            })
            .when("/home", {
                templateUrl: "/ResumeGenerator/html/home.html",
                controller: "homeController"
            })
            .when("/userresume/:username", {
                templateUrl: "/ResumeGenerator/html/userResume.html",
                controller: "userResumeController"
            })
            .when("/user_repos", {
                templateUrl: "/ResumeGenerator/files/repos.json"
            })
            .otherwise({ redirectTo: "/home" });
    }]);
})();