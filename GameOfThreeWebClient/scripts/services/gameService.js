(function () {
    var gameService = function ($http, authenticationService) {
        var webApiUrl = "http://46.121.26.112:8084";

        var GetGame = function (currentGameId) {
            var url = webApiUrl + "/api/Game/" + currentGameId;

            return $http.get(url)
                .then(onSuccess, onError);
        };

        var createGame = function (player1, player2, currentplayer, currentvalue) {
            game = { player1: player1, player2: player2};
            var url = webApiUrl + "/api/Game";

            return $http.post(url, game)
                .then(onSuccess, onError);
        };

        var updateGame = function (gameid, player1, player2, currentplayer, newvalue) {
            game = { gameid: gameid, player1: player1, player2: player2, currentplayer: currentplayer, CurrentValue: newvalue };
            var url = webApiUrl + "/api/Game";

            return $http.put(url, game)
                .then(onSuccess, onError);
        };

        //on success: return an Object {success, data}
        function onSuccess(response) {
            return { success: true, data: response.data };
        }

        //on error: return an Object {success, statuscode, message}
        function onError(response) {
            var errorMessage = response.data.ExceptionMessage || "";
            return { success: false, statusCode: response.status, errorMessage: errorMessage };
        }

        return {
            GetGame: GetGame,
            createGame: createGame,
            updateGame: updateGame
        };
    };

    var module = angular.module("app");
    module.factory("gameService", gameService);
}());