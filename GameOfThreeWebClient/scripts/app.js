(function () {
    var module = angular.module("app", ["ngCookies", "ui.router"]);

    module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login")

        $stateProvider
          .state('mainViewTemplate', {
              templateUrl: "/GameOfThreeWebClient/html/layout/mainViewTemplate.html",
              controller: "mainController"
          })
        $stateProvider
          .state('login', {
              url: "/login",
              templateUrl: "/GameOfThreeWebClient/html/login.html",
              controller: "loginController"
          })
          .state('mainViewTemplate.home', {
              url: "/home",
              templateUrl: "/GameOfThreeWebClient/html/home.html",
              controller: "homeController"
          })
          .state('mainViewTemplate.game', {
              url: "/game",
              templateUrl: "/GameOfThreeWebClient/html/game.html",
              controller: "gameController"
          })
    }]);

    module.run(['$rootScope', '$location', 'authenticationService', function ($rootScope, $location, authenticationService) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = authenticationService.getCredentials();
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }]);
})();