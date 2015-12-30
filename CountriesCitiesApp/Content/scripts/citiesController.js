(function () {
    var module = angular.module("app");

    module.controller("citiesController", function ($scope, $http, $routeParams, citiesService) {
        $scope.cityFormTxtInpt = "";

        $scope.cityFormSubmit = function () {
            citiesService.createCity($scope.cityFormTxtInpt, $routeParams.countryid).then(onCreateCityComplete, onCreateCityError);
        }

        var onUserComplete = function (data) {
            $scope.cities = data;
        };

        var onError = function (response) {
            $scope.error = "Could not fetch the data";
        };

        var onCreateCityComplete = function (data) {
            citiesService.getCities($routeParams.countryid).then(onUserComplete, onError);
        };

        var onCreateCityError = function (response) {
            $scope.error = "Could not create city";
        };

        citiesService.getCities($routeParams.countryid).then(onUserComplete, onError);
    });

    module.controller("editCityController", function ($scope, $routeParams, $location, citiesService) {
        $scope.itemFormTxtInpt = $routeParams.cityName;
        $scope.cancelBtnRef = "#/cities/" + $routeParams.countryId;

        var onUpdateCityComplete = function (data) {
            $location.path('/cities/' + $routeParams.countryId);
        };

        var onUpdateCityError = function (response) {
            $scope.error = "Could not update city";
        };

        var onDeleteCityComplete = function (data) {
            $location.path('/cities/' + $routeParams.countryId);
        };

        var onDeleteCityError = function (response) {
            $scope.error = "Could not delete city";
        };

        $scope.itemFormDelete = function () {
            citiesService.deleteCity($routeParams.cityId).then(onDeleteCityComplete, onDeleteCityError);
        };

        $scope.itemFormUpdate = function () {
            citiesService.updateCity($routeParams.cityId, $scope.itemFormTxtInpt, $routeParams.countryId).then(onUpdateCityComplete, onUpdateCityError);
        };
    });
})();