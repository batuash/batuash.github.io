(function () {
    var module = angular.module("app", ["ngRoute", "ngCookies"]);

    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/LanguageTutor/html/tickets.html",
                controller: "ticketsController"
            })
            .when("/tickets", {
                templateUrl: "/LanguageTutor/html/tickets.html",
                controller: "ticketsController"
            })
            .when("/dictionary/:pageName", {
                templateUrl: "/LanguageTutor/html/dictionary.html",
                controller: "dictionaryController"
            })
            .otherwise({ redirectTo: "/tickets" });
    }]);

    //Object.is() is a proposed addition to the ECMA-262 standard; as such it may not be present in all browsers
    //This will allow the app to use Object.is() when there is no built–in support.
    if (!Object.is) {
        Object.is = function (x, y) {
            // SameValue algorithm
            if (x === y) { // Steps 1-5, 7-10
                // Steps 6.b-6.e: +0 != -0
                return x !== 0 || 1 / x === 1 / y;
            } else {
                // Step 6.a: NaN == NaN
                return x !== x && y !== y;
            }
        };
    }
})();