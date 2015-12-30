(function () {
    var module = angular.module("app");

    module.controller("dictionaryController", function ($scope, $routeParams, apiService, $cookies, $location, $interval, appConfigurationService) {
        $scope.data = "";
        $scope.ogWord = "";
        $scope.translatedWord = "";
        $scope.index = 0;
        $scope.audioName = "";
        $scope.audioUrl = apiService.audioUrl;
        $scope.audioMode = appConfigurationService.audioMode;
        $scope.audioModes = appConfigurationService.audioModes;
        $scope.playMode = appConfigurationService.playMode;
        $scope.playModes = appConfigurationService.playModes;

        //set the configurtion property according to the user pick
        $scope.$watch('audioMode', function () {
            appConfigurationService.audioMode = $scope.audioMode;
        });

        $scope.$watch('playMode', function () {
            appConfigurationService.playMode = $scope.playMode;
        });

        $scope.nextTicket = function () {
            $scope.index++;
            //jump to next Card
            if ($scope.index == $scope.data.length) {
                $scope.index = 0;
                nextCard();
            }
            $scope.ogWord = $scope.data[$scope.index].ENWORD;
            $scope.translatedWord = $scope.data[$scope.index].GERWORD;
            $scope.audioName = "";

            //figure out what causes the exception here
            if (Object.is($scope.playMode, $scope.playModes.noPlay))
            {
                $scope.$apply();
            }
        }

        var nextCard = function () {
            if (Object.is($scope.playMode, $scope.playModes.repeatCard)) {
                return;
            }
            apiService.getTickets().then(function (data) {
                var cardName = "";
                angular.forEach(data, function (value, key) {
                    //jump to next card, unless this is the last card
                    if (value.PAGENAME == $routeParams.pageName && data.length != key + 1)
                    {
                        cardName = data[key + 1].PAGENAME;
                        $location.path('/dictionary/' + cardName);
                    }
                });
            });
        }

        $scope.triggerAudio = function (event) {
            //setAudioUrl($scope)
            //var audio = new Audio($scope.audioUrl + $scope.audioName);
            //audio.play();

            
            //var audio = new Audio("http://46.121.26.8:8083/Content/mp3/mai.mp3");
            $scope.audio = new Audio();
            $scope.audio.src = "http://46.121.26.8:8083/Content/mp3/mai.mp3";
            $scope.audio.play();
        }

        var onFetchDictionaryError = function (response) {
            $scope.error = "Could not fetch tickets";
        };

        var onFetchDictionaryComplete = function (data) {
            $scope.data = data;
            $scope.ogWord = data[$scope.index].ENWORD;
            $scope.translatedWord = data[$scope.index].GERWORD;
        };

        var setAudioUrl = function($scope) {
            if ($scope.audioName == "") {
                var word = $scope.translatedWord;
                var eowComma = word.indexOf(",");
                eowComma = (eowComma < 0) ? word.length : eowComma;

                var eowParentheses = word.indexOf("(");
                eowParentheses = (eowParentheses < 0) ? word.length : eowParentheses;

                var eow = Math.min(eowComma, eowParentheses);
                word = word.substring(0, eow);
                word = word.split(' ').join('');
                $scope.audioName = word + ".mp3";
            }
        }

        //init
        apiService.getDictionary($routeParams.pageName).then(onFetchDictionaryComplete, onFetchDictionaryError);
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.put('lastVisitedTicket', $routeParams.pageName, { 'expires': expireDate });
    });

    module.directive('myTicketAnimation', function ($interval, appConfigurationService) {
        return {
            restrict: 'E',
            scope: { myNextTicket: '&', myTriggerAudio: '&', myPlayMode: '=' },
            link: function (scope, element, attr) {

                var sliderRef;
                var clickAction = function () {
                    scope.myTriggerAudio();
                    //if (element.find('div.hiddenWord').css("opacity") == "0") {
                        
                    //    if (Object.is(appConfigurationService.audioMode, appConfigurationService.audioModes.play)) {
                    //        //scope.myTriggerAudio();
                    //    }
                    //    element.find('div.hiddenWord').animate({ opacity: 1 }, appConfigurationService.fadeInSpeed);
                    //    return false;
                    //}
                    //else if (element.find('div.hiddenWord').css("opacity") == "1") {
                    //    element.find('div.hiddenWord').css("opacity", "0");
                    //    scope.myNextTicket();
                    //}
                }
                var stopSilde = function () {
                    if (angular.isDefined(sliderRef)) {
                        $interval.cancel(sliderRef);
                        sliderRef = undefined;
                    }
                };

                element.find('div.hiddenWord').css("opacity", "0");
                element.on("click", clickAction);
                scope.$watch('myPlayMode', function () {
                    if (!Object.is(scope.myPlayMode, appConfigurationService.playModes.noPlay)) {
                        stopSilde();
                        sliderRef = $interval(clickAction, appConfigurationService.slideShowSpeed);
                    }
                    else {
                        stopSilde();
                    }
                });

                scope.$on('$destroy', function () {
                    // Make sure that the interval is destroyed too
                    stopSilde();
                });
            }
        };
    });
})();