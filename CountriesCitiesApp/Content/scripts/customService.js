(function () {
    var serviceApiUrl = "http://46.121.29.70:8082";
   
    var countriesService = function ($http) {
        var getCountries = function () {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Countries";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        };

        var createCountry = function (countryName) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Countries";

            return $http.post(url, { name: countryName, cities: [] })
                .then(function (response) {
                    return response.data;
                });
        };

        var updateCountry = function (countryId, countryName) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Countries/" + countryId;

            return $http.put(url, { id: countryId, name: countryName, cities: [] })
                .then(function (response) {
                    return response.data;
                });
        };

        var deleteCountry = function (countryId) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Countries/" + countryId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getCountries: getCountries,
            createCountry: createCountry,
            updateCountry: updateCountry,
            deleteCountry: deleteCountry
        };
    };

    var citiesService = function ($http) {
        var getCities = function (countryid) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/cities" + "?countryid=" + countryid;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        };

        var createCity = function (cityName, countryId) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Cities";
            var cityData = { Name: cityName, Country: countryId, Country1: { ID: 0, Name: null, Cities: [] } };

            return $http.post(url, cityData)
                .then(function (response) {
                    return response.data;
                });
        };

        var updateCity = function (cityId, cityName, countryId) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Cities/" + cityId;

            return $http.put(url, { id: cityId, name: cityName, Country: countryId, Country1: {} })
                .then(function (response) {
                    return response.data;
                });
        };

        var deleteCity = function (cityId) {
            //todo: get the url from the web.config or xml
            var url = serviceApiUrl + "/api/Cities/" + cityId;

            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getCities: getCities,
            createCity: createCity,
            updateCity: updateCity,
            deleteCity: deleteCity
        };
    }

    //get an existing module
    var module = angular.module("app");

    //create a new custom service, pass-in the name of the service and a function that init's the service
    module.factory("countriesService", countriesService);
    module.factory("citiesService", citiesService);
}());
