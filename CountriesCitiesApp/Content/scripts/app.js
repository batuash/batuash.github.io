(function () {
    var module = angular.module("app", ["ngRoute"]);

    module.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/CountriesCitiesApp/Html/countries.html",
                controller: "countriesController"
            })
            .when("/countries", {
                templateUrl: "/CountriesCitiesApp/Html/countries.html",
                controller: "countriesController"
            })
            .when("/countries/edit/:countryId/:countryName", {
                templateUrl: "/CountriesCitiesApp/Html/editItem.html",
                controller: "editCountryController"
            })
            .when("/cities/edit/:countryId/:cityId/:cityName", {
                templateUrl: "/CountriesCitiesApp/Html/editItem.html",
                controller: "editCityController"
            })
            .when("/cities/:countryid", {
                templateUrl: "/CountriesCitiesApp/Html/cities.html",
                controller: "citiesController"
            })
            .otherwise({ redirectTo: "/countries" });
    }]);
})();