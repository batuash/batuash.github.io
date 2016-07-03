(function () {
    var module = angular.module("app");

    module.controller("dictionariesManagement", ['$scope', 'apiService', function ($scope, apiService) {
        $scope.dictionaryName = '';
        $scope.dictionaryDesc = '';
        $scope.dictionariesCollection = [];//todo: see if pagination is requeired here
        $scope.error = ''; //todo: error is not displaying
        //todo: if dictionariesCollection is empty, display a message saying go to management  

        $scope.dictionaryFormSubmit = function () {
            var dictionaryName = $scope.dictionaryName;
            var dictionaryDesc = $scope.dictionaryDesc;

            //cleare form before sending the request
            $scope.dictionaryName = '';
            $scope.dictionaryDesc = '';
            $scope.form.dictionaryName.$dirty = false;
            $scope.form.dictionaryDesc.$dirty = false;

            apiService.createDictionary(dictionaryName, dictionaryDesc).then(function (response) {
                if (response.success) {
                    refreshDictionaries();
                }
                else if (response.statusCode == 409) {
                    $scope.error = "Dictionary name already exist, please choose a different user name";
                }
                else {
                    $scope.error = "Could not create dictionary item!!";
                }
            });
        }

        var refreshDictionaries = function () {
            apiService.getDictionaries().then(function (response) {
                if (response.success) {
                    $scope.dictionariesCollection = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        refreshDictionaries();
    }]);

    module.controller("editDictionaryController", function ($scope, $stateParams, $location, apiService) {
        $scope.dictionaryName = $stateParams.dictionaryName;
        $scope.dictionaryDesc = $stateParams.dictionaryDesc;

        $scope.dictionaryFormDelete = function () {
            apiService.deleteDictionary($stateParams.dictionaryId).then(function (response) {
                if (response.success) {
                    $location.path('/management/dictionaries');
                }
                else {
                    $scope.error = "Could not delete country";//todo handle error
                }
            });
        };

        $scope.dictionaryFormUpate = function () {
            apiService.updateDictionary($stateParams.dictionaryId, $scope.dictionaryName, $scope.dictionaryDesc).then(function (response) {
                if (response.success) {
                    $location.path('/management/dictionaries');
                }
                else {
                    $scope.error = "Could not update country"; //todo handle error
                }
            });
        };
    });
})();