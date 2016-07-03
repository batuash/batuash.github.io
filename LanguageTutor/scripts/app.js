/// <reference path="angular.min.js" />
(function () {
    var module = angular.module("app", ["ngCookies", "ui.router"]);

    module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login/")

        $stateProvider
          .state('master', {
              templateUrl: "/LanguageTutor/html/master/master.html",
              controller: "masterController"
          })
          .state('login', {
              url: "/login/{webApiAddress}",
              params: {
                  webApiAddress: { value: "" }
              },
              templateUrl: "/LanguageTutor/Html/login.html",
              controller: "loginController"
          })
          .state('register', {
              url: "/register",
              templateUrl: "/LanguageTutor/Html/register.html",
              controller: "registerController"
          })
          .state('master.dictionaries', {
              url: "/dictionaries",
              templateUrl: "/LanguageTutor/html/dictionaries.html",
              controller: "dictionariesController"
          })
          .state('master.pages', {
              url: "/pages/{dictionaryId}",
              params: {
                  dictionaryId: { value: 0 }
              },
              templateUrl: "/LanguageTutor/html/pages.html",
              controller: "pagesController"
          })
          .state('master.sentences', {
              url: "/sentences/{dictionaryId}/{pageId}",
              params: {
                  dictionaryId: {value: 0},
                  pageId: { value: 0 }
              },
              templateUrl: "/LanguageTutor/html/sentences.html",
              controller: "sentencesController"
          })
          //management
          .state('master.dictionariesManagement', {
              url: "/management/dictionaries",
              templateUrl: "/LanguageTutor/html/management/dictionariesManagement.html",
              controller: "dictionariesManagement"
          })
          .state('master.editDictionary', {
              url: "/management/dictionaries/edit",
              params: {
                  dictionaryId: { value: 0 },
                  dictionaryName: { value: '' },
                  dictionaryDesc: { value: '' }
              },
              templateUrl: "/LanguageTutor/html/management/editDictionary.html",
              controller: "editDictionaryController"
          })
          .state('master.pagesManagement', {
              url: "/management/pages/{dictionaryId}",
              params: {
                  dictionaryId: { value: 0 }
              },
              templateUrl: "/LanguageTutor/html/management/pagesManagement.html",
              controller: "pagesManagement"
          })
          .state('master.editPage', {
              url: "/management/page/edit",
              params: {
                  dictionaryId: {value: 0},
                  pageId: { value: 0 },
                  pageName: { value: '' }
              },
              templateUrl: "/LanguageTutor/html/management/editPage.html",
              controller: "editPageController"
          })
          .state('master.sentencesManagement', {
              url: "/management/sentences/{pageId}",
              params: {
                  pageId: { value: 0 }
              },
              templateUrl: "/LanguageTutor/html/management/sentencesManagement.html",
              controller: "sentencesManagement"
          })
          .state('master.editSentence', {
              url: "/management/sentence/edit",
              params: {
                  pageId: { value: 0 },
                  sentenceId: { value: 0 },
                  sentence: { sentence: '' },
                  translation: { translation: '' }
              },
              templateUrl: "/LanguageTutor/html/management/editSentence.html",
              controller: "editSentenceController"
          })
    }]);

    module.run(['$rootScope', '$location', 'authenticationService', '$state', function ($rootScope, $location, authenticationService, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            // redirect to login page if not logged in and trying to access a restricted page
            var state = $state.current.name;
            var restrictedPage = $.inArray(toState.name, ['login', 'register']) === -1;
            var loggedIn = authenticationService.getCredentials();
            if (restrictedPage && !loggedIn) {
                event.preventDefault();
                $location.path('/login/');
            }
        });
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