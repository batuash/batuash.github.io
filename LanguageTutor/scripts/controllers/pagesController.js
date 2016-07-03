(function () {
    var module = angular.module("app");

    module.controller("pagesController", ['$scope', 'apiService', '$stateParams', function ($scope, apiService, $stateParams) {
        $scope.itemsCollection = [];
        $scope.error = '';//todo: error is not displaying
        $scope.dictionaryId = $stateParams.dictionaryId;
        $scope.intLastVisitedPageId = localStorage.intLastVisitedPageId ? localStorage.intLastVisitedPageId : 1;

        var init = function () {
            $scope.showLoadingIcon();
            apiService.getPages($scope.dictionaryId).then(function (response) {
                $scope.hideLoadingIcon();
                if (response.success) {
                    $scope.itemsCollection = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        init();
    }]);
})();