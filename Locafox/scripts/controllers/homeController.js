(function () {
    var module = angular.module("app");

    module.controller("homeController", ['$scope', 'webApiService', function ($scope, webApiService) {
        var init = function () {
            webApiService.getMapLocations().then(function (response) {
                if (response.success) {
                    $scope.populateMap(response.data);
                }
                else {
                    console.log("Could not fetch data!!");
                }
            });
        }

        init();
    }]);
})();