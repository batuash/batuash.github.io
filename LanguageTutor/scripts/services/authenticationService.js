(function () {
    var authenticationService = function ($http, $rootScope, $cookieStore) {
        var setCredentials = function (userid, username, password) {
            $rootScope.globals = {
                currentUser: {
                    userid: userid,
                    username: username,
                    password: password
                }
            };
            //todo: set a term for the cookie
            $cookieStore.put('globals', $rootScope.globals);
        }

        var clearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }

        var getCredentials = function () {
            if (!$rootScope.globals)
                $rootScope.globals = $cookieStore.get('globals') || {};

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
