(function () {
    var module = angular.module("app");

    module.controller("pagesManagement", ['$scope', 'apiService', '$stateParams', function ($scope, apiService, $stateParams) {
        $scope.pageName = '';
        $scope.pagesCollection = [];//todo: see if pagination is requeired here
        $scope.error = ''; //todo: error is not displaying
        $scope.dictionaryId = $stateParams.dictionaryId;
        //todo: if dictionariesCollection is empty, display a message saying go to management  

        $scope.pageFormSubmit = function () {
            var pageName = $scope.pageName;
            var dictionaryId = $scope.dictionaryId;

            //cleare form before sending the request
            $scope.pageName = '';
            $scope.form.pageName.$dirty = false;

            apiService.createPage(pageName, dictionaryId).then(function (response) {
                if (response.success) {
                    refreshPages();
                }
                else if (response.statusCode == 409) {
                    $scope.error = "Page name already exist, please choose a different page name";
                }
                else {
                    $scope.error = "Could not create page item!!";
                }
            });
        }

        var refreshPages = function () {
            apiService.getPages($scope.dictionaryId).then(function (response) {
                if (response.success) {
                    $scope.pagesCollection = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        refreshPages();
    }]);

    module.controller("editPageController", function ($scope, $stateParams, $location, apiService) {
        $scope.pageName = $stateParams.pageName;
        $scope.dictionaryId = $stateParams.dictionaryId;

        $scope.pageFormDelete = function () {
            apiService.deletePage($stateParams.pageId).then(function (response) {
                if (response.success) {
                    $location.path('/management/pages/' + $scope.dictionaryId);
                }
                else {
                    $scope.error = "Could not delete country";//todo handle error
                }
            });
        };

        $scope.pageFormUpate = function () {
            apiService.updatePage($stateParams.pageId, $scope.pageName, $scope.dictionaryId).then(function (response) {
                if (response.success) {
                    $location.path('/management/pages/' + $scope.dictionaryId);
                }
                else {
                    $scope.error = "Could not update country"; //todo handle error
                }
            });
        };
    });
})();