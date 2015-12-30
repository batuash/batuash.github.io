(function () {
    var app = angular.module("module1", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "/view/main.html",
                controller: "mainController"
            })
            .otherwise({redirectTo: "/main"});
    });
}());
