(function () {
    var module = angular.module("app");

    module.controller("dictionaryController", function ($scope, $routeParams, apiService, cookiesService, $location, $interval, appConfigurationService) {
        $scope.data = "";
        $scope.ogWord = "";
        $scope.translatedWord = "";
        $scope.index = 0;
        $scope.audioName = "";
        $scope.audioUrl = apiService.audioUrl;

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

            //todo:figure out what why apply is needed here
            $scope.$apply();
        }

        var nextCard = function () {
            if (Object.is(appConfigurationService.repeat, appConfigurationService.repeatModes.repeatCard)) {
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
            setAudioUrl($scope)
            var audio = new Audio($scope.audioUrl + $scope.audioName);
            audio.play();
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
        cookiesService.setCookie('lastVisitedTicket', $routeParams.pageName);
    });
})();