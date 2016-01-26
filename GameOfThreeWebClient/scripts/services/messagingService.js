(function () {
    var messagingService = function ($http, authenticationService) {
        var webApiUrl = "http://46.121.26.112:8084";

        var getMessages = function () {
            var userName = authenticationService.getCredentials().username;
            var url = webApiUrl + "/api/Message/" + userName;

            return $http.get(url).then(onSuccess, onError);
        }

        var sendMessage = function (message) {
            var url = webApiUrl + "/api/Message";

            return $http.post(url, message)
                .then(onSuccess, onError);
        }

        var createMessage = function (messagetype, from, to, content) {
            return { messagetype: messagetype, from: from, to: to, content: content };
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
            createMessage: createMessage,
            getMessages: getMessages,
            sendMessage: sendMessage
        };
    };

    var module = angular.module("app");
    module.factory("messagingService", messagingService);
}());