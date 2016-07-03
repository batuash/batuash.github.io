(function () {
    var module = angular.module("app");

    module.controller("sentencesManagement", ['$scope', 'apiService', '$stateParams', function ($scope, apiService, $stateParams) {
        $scope.sentence = $stateParams.sentence;
        $scope.translation = $stateParams.translation;
        $scope.pageId = $stateParams.pageId;
        $scope.sentencesCollection = [];//todo: see if pagination is requeired here
        $scope.error = ''; //todo: error is not displaying
        //todo: if dictionariesCollection is empty, display a message saying go to management  

        $scope.sentenceFormSubmit = function () {
            var sentence = $scope.sentence;
            var translation = $scope.translation;
            var pageId = $stateParams.pageId;

            //cleare form before sending the request
            $scope.sentence = '';
            $scope.translation = '';
            $scope.form.sentence.$dirty = false;
            $scope.form.translation.$dirty = false;

            apiService.createSentence(sentence, translation, pageId).then(function (response) {
                if (response.success) {
                    refreshSentences();
                }
                else {
                    $scope.error = "Could not create sentece item!!";
                }
            });
        }

        var refreshSentences = function () {
            apiService.getSentences($stateParams.pageId).then(function (response) {
                if (response.success) {
                    $scope.sentencesCollection = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        refreshSentences();
    }]);

    module.controller("editSentenceController", function ($scope, $stateParams, $location, apiService) {
        $scope.sentence = $stateParams.sentence;
        $scope.translation = $stateParams.translation;
        $scope.pageId = $stateParams.pageId;

        $scope.sentenceFormDelete = function () {
            apiService.deleteSenetence($stateParams.sentenceId).then(function (response) {
                if (response.success) {
                    $location.path('/management/sentences/' + $scope.pageId);
                }
                else {
                    $scope.error = "Could not delete sentence";//todo handle error
                }
            });
        };

        $scope.sentencesFormUpate = function () {
            apiService.updateSentence($stateParams.sentenceId, $scope.sentence, $scope.translation, $scope.pageId).then(function (response) {
                if (response.success) {
                    $location.path('/management/sentences/' + $scope.pageId);
                }
                else {
                    $scope.error = "Could not update country"; //todo handle error
                }
            });
        };
    });
})();