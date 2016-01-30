(function () {
    var module = angular.module("app", ["ngCookies", "ui.router"]);

    module.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login/")

        $stateProvider
          .state('mainViewTemplate', {
              templateUrl: "/CountriesCitiesApp/Html/templates/mainViewTemplate.html",
              controller: "mainController"        
          })
          .state('mainViewTemplate.countries', {
              url: "/countries",
              templateUrl: "/CountriesCitiesApp/Html/countries.html",
              controller: "countriesController"
          })
          .state('mainViewTemplate.editcountry', {
              url: "/countries/edit/{countryId}/{countryName}",
              templateUrl: "/CountriesCitiesApp/Html/editItem.html",
              controller: "editCountryController"
          })
          .state('mainViewTemplate.cities', {
              url: "/cities/{countryid}",
              templateUrl: "/CountriesCitiesApp/Html/cities.html",
              controller: "citiesController"
          })
          .state('mainViewTemplate.editCity', {
              url: "/cities/edit/{countryId}/{cityId}/{cityName}",
              templateUrl: "/CountriesCitiesApp/Html/editItem.html",
              controller: "editCityController"
          })
          .state('login', {
              url: "/login/{webApiAddress}",
              params: {
                  webApiAddress: { value: "" }
              },
              templateUrl: "/CountriesCitiesApp/Html/login.html",
              controller: "loginController"
          })
          .state('register', {
              url: "/register",
              templateUrl: "/CountriesCitiesApp/Html/register.html",
              controller: "registerController"
          })
    })

    module.run(['$rootScope', '$location', 'authenticationService', function ($rootScope, $location, authenticationService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = authenticationService.getCredentials();
            if (restrictedPage && !loggedIn) {
                $location.path('/login/');
            }
        });
    }]);
})();