(function () {
    var module = angular.module("app");

    module.controller("homeController", ['$scope', 'userService', 'authenticationService', '$interval', 'messagingService', '$location',
        function ($scope, userService, authenticationService, $interval, messagingService, $location) {

        $scope.players = "";
        $scope.sendInvitation = function (playerName) {
            inviteMessage = messagingService.createMessage(1, authenticationService.getCredentials().username, playerName, "Hi, do you want to play with me");
            messagingService.sendMessage(inviteMessage);
        };

        var init = function () {
            var intervalPromise = $interval(function () {
                userService.getUsers().then(function (response) {
                    if (response.success) {
                        //refresh players list if needed
                        if (response.data.length != $scope.players.length) {
                            $scope.players = response.data.filter(
                                function (player) {
                                    return player.Name != authenticationService.getCredentials().username
                                });
                        }
 
                        var currentPlayer = response.data.filter(
                            function (player) {
                                return player.Name == authenticationService.getCredentials().username
                            });

                        //redirect to a game session
                        if (currentPlayer[0].CurrentGame != '') {
                            $location.path('/game');
                        }
                    }
                    else {
                        console.log("error");
                    }
                });
            }, 5000);

            $scope.$on('$destroy', function () { $interval.cancel(intervalPromise); });
        };

        init();
    }]);
})();