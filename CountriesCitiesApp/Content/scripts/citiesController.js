(function () {
    var module = angular.module("app");

    module.controller("citiesController", function ($scope, $http, $stateParams, webApiService) {
        $scope.cityFormTxtInpt = "";

        $scope.cityFormSubmit = function () {
            webApiService.createCity($scope.cityFormTxtInpt, $stateParams.countryid).then(function (response) {
                if (response.success) {
                    refreshCities();
                }
                else {
                    $scope.error = "Could not create city";
                }
            });
        }

        var refreshCities = function () {
            webApiService.getCities($stateParams.countryid).then(function (response) {
                if (response.success) {
                    $scope.cities = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        refreshCities();
    });

    module.controller("editCityController", function ($scope, $stateParams, $location, webApiService) {
        $scope.itemFormTxtInpt = $stateParams.cityName;
        $scope.cancelBtnRef = "#/cities/" + $stateParams.countryId;

        $scope.itemFormDelete = function () {
            webApiService.deleteCity($stateParams.cityId).then(function (response) {
                if (response.success) {
                    $location.path('/cities/' + $stateParams.countryId);
                }
                else {
                    $scope.error = "Could not delete city";
                }
            });
        };

        $scope.itemFormUpdate = function () {
            webApiService.updateCity($stateParams.cityId, $scope.itemFormTxtInpt, $stateParams.countryId).then(function (response) {
                if (response.success) {
                    $location.path('/cities/' + $stateParams.countryId);
                }
                else {
                    $scope.error = "Could not update city";
                }
            });
        };
    });
})();