(function () {
    var module = angular.module('app');
    module.directive('messagesPopupDirective', ['$interval', 'messagingService', 'authenticationService', '$location', 'gameService',
        function ($interval, messagingService, authenticationService, $location, gameService) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/GameOfThreeWebClient/html/template/messagesPopup.html',
            link: function (scope, element, attr) {
                scope.header = '';
                scope.from = '';
                scope.content = '';
                var intervalPromise = $interval(function () {
                    messagingService.getMessages().then(function (response) {
                        if (response.success) {
                            if (response.data.length > 0 && element.find('#messagePopup').css('display') == 'none') {
                                var message = response.data[0];
                                switch (message.MessageType) {
                                    case 1:
                                        scope.from = message.From;
                                        scope.header = "You have recived a game invitation from " + scope.from;
                                        scope.content = message.Content;
                                        element.find('.modal-header').show();
                                        element.find('.modal-body').show();
                                        element.find('.modal-footer').show();
                                        element.find('#messagePopupBtn').trigger("click");
                                        break
                                    case 2:
                                        scope.from = message.From;
                                        scope.header = scope.from + " accepted your game invitation";
                                        scope.content = "Starting Game..";
                                        element.find('.modal-header').show();
                                        element.find('.modal-body').show();
                                        element.find('.modal-footer').hide();
                                        element.find('#messagePopupBtn').trigger("click");
                                        startNewGame();
                                        break
                                    case 3:
                                        scope.from = message.From;
                                        scope.header = scope.from + " rejected your game invitation";
                                        scope.content = scope.from + " says: " + message.Content;
                                        element.find('.modal-header').show();
                                        element.find('.modal-body').show();
                                        element.find('.modal-footer').hide();
                                        element.find('#messagePopupBtn').trigger("click");
                                        break
                                }
                            }
                        }
                        else {
                            console.log('error');
                        }
                    });
                }, 2000);

                scope.rejectInvitation = function () {
                    inviteMessage = messagingService.createMessage(3, authenticationService.getCredentials().username, scope.from, "i dont want to play with you!");
                    messagingService.sendMessage(inviteMessage);
                }

                scope.accesptInvitation = function () {
                    inviteMessage = messagingService.createMessage(2, authenticationService.getCredentials().username, scope.from, "i'd like to play with you!");
                    messagingService.sendMessage(inviteMessage);
                    scope.content = "Starting Game..";
                    element.find('.modal-footer').hide();
                }

                var startNewGame = function () {
                    gameService.createGame(authenticationService.getCredentials().username, scope.from);
                }

                scope.$on('$destroy', function () {
                    $interval.cancel(intervalPromise);
                    if (element.find('#messagePopup').css('display') == 'block') {
                        element.find('#messagePopupBtn').trigger("click");
                        $(document).find('.modal-backdrop').remove();       
                    }
                });
            }

        };
    }]);
})();