(function () {
    var module = angular.module("app");

    module.controller("dictionariesController", ['$scope', 'apiService', function ($scope, apiService) {
        $scope.dictionariesCollection = [];//todo: see if pagination is requeired here
        $scope.error = ''; //todo: error is not displaying
        //todo: if dictionariesCollection is empty, display a message saying go to management  

        var init = function () {
            $scope.showLoadingIcon();
            apiService.getDictionaries().then(function (response) {
                $scope.hideLoadingIcon();
                if (response.success) {
                    $scope.dictionariesCollection = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        init();
    }]);
})();