(function () {
    var userService = function ($http, authenticationService, $q) {
        var webApiUrl = "http://46.121.26.112:8084";

        var getCurrentUser = function () {
            return getUsers().then(function (response) {
                if (response.success) {
                    var currentPlayer = response.data.filter(
                        function (player) {
                            return player.Name == authenticationService.getCredentials().username
                        });

                    var deferred = $q.defer();
                    deferred.resolve({ success: true, data: currentPlayer[0] });
                    return deferred.promise;
                }
            });
        }

        var getUsers = function () {
            var url = webApiUrl + "/api/user";

            return $http.get(url).then(onSuccess, onError);
        }

        var createUser = function (username) {
            var url = webApiUrl + "/api/user";
            var userData = { name: username, status: 2, messagelist: [], currentgame: '' };

            return $http.post(url, userData)
                .then(onSuccess, onError);
        }

        var updateUser = function (username, status, currentgame) {
            var url = webApiUrl + "/api/user";
            var userData = { name: username, status: status, messagelist: [], currentgame: currentgame };

            return $http.put(url, userData)
                .then(onSuccess, onError);
        }

        //on success: return an Object {success, data}
        function onSuccess(response) {
            return { success: true, data: response.data };
        }

        //on error: return an Object {success, statuscode, message}
        function onError(response) {
            var errorMessage = response.data.ExceptionMessage || "";
            return { success: false, statusCode: response.status, errorMessage: errorMessage};
        }

        return {
            getCurrentUser: getCurrentUser,
            getUsers: getUsers,
            createUser: createUser,
            updateUser: updateUser
        };
    };

    var module = angular.module("app");
    module.factory("userService", userService);
}());