(function () {
    var module = angular.module("app");

    module.controller("sentencesController", function ($scope, $stateParams, apiService, $location, $interval, appConfigurationService) {
        $scope.data = [];
        $scope.sentence = "";
        $scope.translation = "";
        $scope.index = 0;
        $scope.audioName = "";
        $scope.audioUrl = apiService.audioUrl;
        $scope.dictionaryId = $stateParams.dictionaryId;
        $scope.error = ''; //todo: error is not displaying

        $scope.nextSentence = function () {
            $scope.index++;
            //jump to next Card
            if ($scope.index == $scope.data.length) {
                $scope.index = 0;
                nextPage();
            }
            $scope.sentence = $scope.data[$scope.index].Sentence1;
            $scope.translation = $scope.data[$scope.index].Translation;
            $scope.audioName = "";

            //todo:figure out what why apply is needed here
            $scope.$apply();
        }

        var nextPage = function () {
            if (Object.is(appConfigurationService.repeat, appConfigurationService.repeatModes.repeatPage)) {
                return;
            }

            $scope.showLoadingIcon();
            apiService.getPages($scope.dictionaryId).then(function (response) {
                if (response.success) {
                    var nextPageId = "";
                    angular.forEach(response.data, function (value, key) {
                        //jump to next page, unless this is the last page
                        if (value.Id == $stateParams.pageId && response.data.length != key + 1) {
                            nextPageId = response.data[key + 1].Id;
                            $location.path('/sentences/' + $scope.dictionaryId + '/' + nextPageId);
                        }
                    });
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        }

        $scope.triggerAudio = function (event) {
            setAudioUrl($scope)
            var audio = new Audio($scope.audioUrl + $scope.audioName);
            audio.play();
        }

        var setAudioUrl = function($scope) {
            if ($scope.audioName == "") {
                var word = $scope.sentence;
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

        var init = function () {
            $scope.showLoadingIcon();
            apiService.getSentences($stateParams.pageId).then(function (response) {
                $scope.hideLoadingIcon();
                if (response.success) {
                    $scope.data = response.data;
                    $scope.sentence = $scope.data[$scope.index].Sentence1;
                    $scope.translation = $scope.data[$scope.index].Translation;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });

            localStorage.intLastVisitedPageId = $stateParams.pageId;
        }

        init();
    });
})();