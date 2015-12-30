(function () {
    var module = angular.module("app");

    module.controller("countriesController", function ($scope, countriesService) {
        $scope.countryFormTxtInpt = "";

        $scope.countryFormSubmit = function () {
            countriesService.createCountry($scope.countryFormTxtInpt).then(onCreateCountryComplete, onCreateCountryError);
        }

        var onGetCountriesComplete = function (data) {
            $scope.countries = data;
        };

        var onGetCountriesError = function (response) {
            $scope.error = "Could not fetch the data";
        };

        var onCreateCountryComplete = function (data) {
            countriesService.getCountries().then(onGetCountriesComplete, onGetCountriesError);
        };

        var onCreateCountryError = function (response) {
            $scope.error = "Could not create country";
        };

        countriesService.getCountries().then(onGetCountriesComplete, onGetCountriesError);
    });

    module.controller("editCountryController", function ($scope, $routeParams, $location, countriesService) {
        $scope.itemFormTxtInpt = $routeParams.countryName;
        $scope.cancelBtnRef = "#/countries";

        var onUpdateCountryComplete = function (data) {
            $location.path('/countries');
        };

        var onUpdateCountryError = function (response) {
            $scope.error = "Could not update country";
        };

        var onDeleteCountryComplete = function (data) {
            $location.path('/countries');
        };

        var onDeleteCountryError = function (response) {
            $scope.error = "Could not delete country";
        };

        $scope.itemFormDelete = function () {
            countriesService.deleteCountry($routeParams.countryId).then(onDeleteCountryComplete, onDeleteCountryError);
        };

        $scope.itemFormUpdate = function () {
            countriesService.updateCountry($routeParams.countryId, $scope.itemFormTxtInpt).then(onUpdateCountryComplete, onUpdateCountryError);
        };
    });
})();