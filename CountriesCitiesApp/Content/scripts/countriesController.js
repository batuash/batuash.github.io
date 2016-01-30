(function () {
    var module = angular.module("app");

    module.controller("countriesController", function ($scope, webApiService) {
        $scope.countryFormTxtInpt = "";

        $scope.countryFormSubmit = function () {
            webApiService.createCountry($scope.countryFormTxtInpt).then(function (response) {
                if (response.success) {
                    refreshCountries();
                }
                else {
                    $scope.error = "Could not create country";
                }
            });
        }
        var refreshCountries = function () {
            webApiService.getCountries().then(function (response) {
                if (response.success) {
                    $scope.countries = response.data;
                }
                else {
                    $scope.error = "Could not fetch the data";
                }
            });
        };

        refreshCountries();
    });

    module.controller("editCountryController", function ($scope, $stateParams, $location, webApiService) {
        $scope.itemFormTxtInpt = $stateParams.countryName;
        $scope.cancelBtnRef = "#/countries";

        $scope.itemFormDelete = function () {
            webApiService.deleteCountry($stateParams.countryId).then(function (response) {
                if (response.success) {
                    $location.path('/countries');
                }
                else {
                    $scope.error = "Could not delete country";
                }
            });
        };

        $scope.itemFormUpdate = function () {
            webApiService.updateCountry($stateParams.countryId, $scope.itemFormTxtInpt).then(function (response) {
                if (response.success) {
                    $location.path('/countries');
                }
                else {
                    $scope.error = "Could not update country";
                }
            });
        };
    });
})();