(function () {
    var authenticationService = function ($http, $rootScope, $cookieStore) {
        var setCredentials = function (username) {
            $rootScope.globals = {
                currentUser: {
                    username: username
                }
            };
        }

        var clearCredentials = function () {
            $rootScope.globals = {};
        }

        var getCredentials = function () {
            if (!$rootScope.globals) {
                $rootScope.globals = {};
            }
            return $rootScope.globals.currentUser;
        }

        return {
            setCredentials: setCredentials,
            clearCredentials: clearCredentials,
            getCredentials: getCredentials
        };
    }

    var module = angular.module("app");
    module.factory("authenticationService", authenticationService);

}());
