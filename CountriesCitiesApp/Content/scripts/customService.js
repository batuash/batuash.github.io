(function () {
    var webApiService = function ($http, authenticationService, $cookies, $q, localStorageService) {
        //webApiUrl is set on the 'login' web page as a parameter in the url, example: ../LanguageTutor/#/tickets/127.0.0.1:8080
        var webApiUrl = $cookies.get("webApiAddress");

        // webApiService has 2 possible mechanisms depending on the clients cookie: 
        // no cookie set: defualt behavior, the data is provided by localStorageService.
        // cookie set: cookie directs to the server address(webApi/webservice/wcf..), 
        // which handles the Business logic and provides the data as jason objects  
        if (typeof (webApiUrl) == 'undefined') {

            var getUser = function (username) {
                return localStorageService.getUser(username).then(onSuccess, onError);
            }

            var createUser = function (username, password) {
                return localStorageService.createUser(username, password).then(onSuccess, onError);
            }

            var getCountries = function () {
                var userId = authenticationService.getCredentials().userid;
                return localStorageService.getCountries(userId).then(onSuccess, onError);
            };

            var createCountry = function (countryName) {
                var userId = authenticationService.getCredentials().userid;
                return localStorageService.createCountry(countryName, userId).then(onSuccess, onError);
            };

            var updateCountry = function (countryId, countryName) {
                return localStorageService.updateCountry(countryId, countryName).then(onSuccess, onError);
            };

            var deleteCountry = function (countryId) {
                return localStorageService.deleteCountry(countryId).then(onSuccess, onError);
            };

            var getCities = function (countryid) {             
                return localStorageService.getCities(countryid).then(onSuccess, onError);
            };

            var createCity = function (cityName, countryId) {
                return localStorageService.createCity(cityName, countryId).then(onSuccess, onError);
            };

            var updateCity = function (cityId, cityName, countryId) {
                return localStorageService.updateCity(cityId, cityName).then(onSuccess, onError);
            };

            var deleteCity = function (cityId) {
                return localStorageService.deleteCity(cityId).then(onSuccess, onError);
            };

            return {
                getCountries: getCountries,
                createCountry: createCountry,
                updateCountry: updateCountry,
                deleteCountry: deleteCountry,
                getCities: getCities,
                createCity: createCity,
                updateCity: updateCity,
                deleteCity: deleteCity,
                getUser: getUser,
                createUser: createUser
            };
        }
        else {
            webApiUrl = "http://" + webApiUrl;

            var getUser = function (username) {
                var url = webApiUrl + "/api/Users/" + username;
                return $http.get(url).then(onSuccess, onError);
            }

            var createUser = function (username, password) {
                var url = webApiUrl + "/api/Users";
                var userData = { name: username, password: password };
                return $http.post(url, userData)
                    .then(onSuccess, onError);
            }

            var getCountries = function () {
                var userId = authenticationService.getCredentials().userid;
                var url = webApiUrl + "/api/Countries/" + userId;
                return $http.get(url).then(onSuccess, onError);
            };

            var createCountry = function (countryName) {
                var url = webApiUrl + "/api/Countries";
                var userId = authenticationService.getCredentials().userid;
                var countryData = { name: countryName, userid: userId, cities: [], user: {} };
                return $http.post(url, countryData)
                    .then(onSuccess, onError);
            };

            var updateCountry = function (countryId, countryName) {
                var url = webApiUrl + "/api/Countries/" + countryId;
                var userId = authenticationService.getCredentials().userid;
                var countryData = { id: countryId, name: countryName, userid: userId, cities: [], user: {} };
                return $http.put(url, countryData)
                    .then(onSuccess, onError);
            };

            var deleteCountry = function (countryId) {
                var url = webApiUrl + "/api/Countries/" + countryId;
                return $http.delete(url)
                    .then(onSuccess, onError);
            };

            var getCities = function (countryid) {
                var url = webApiUrl + "/api/cities/" + countryid;
                return $http.get(url)
                    .then(onSuccess, onError);
            };

            var createCity = function (cityName, countryId) {
                var url = webApiUrl + "/api/cities";
                var cityData = { Name: cityName, Country: countryId, Country1: { ID: 0, Name: null, Cities: [] } };
                return $http.post(url, cityData)
                    .then(onSuccess, onError);
            };

            var updateCity = function (cityId, cityName, countryId) {
                var url = webApiUrl + "/api/Cities/" + cityId;
                return $http.put(url, { id: cityId, name: cityName, Country: countryId, Country1: {} })
                    .then(onSuccess, onError);
            };

            var deleteCity = function (cityId) {
                var url = webApiUrl + "/api/cities/" + cityId;
                return $http.delete(url)
                    .then(onSuccess, onError);
            };

            //on success: return an Object {success, data}
            function onSuccess(response) {
                return { success: true, data: response.data };
            }

            //on error: return an Object {success, statuscode, message}
            function onError(response) {
                return { success: false, statusCode: response.status };
            }

            return {
                getCountries: getCountries,
                createCountry: createCountry,
                updateCountry: updateCountry,
                deleteCountry: deleteCountry,
                getCities: getCities,
                createCity: createCity,
                updateCity: updateCity,
                deleteCity: deleteCity,
                getUser: getUser,
                createUser: createUser
            };
        }
    };

    var authenticationService = function ($http, $rootScope, $cookieStore) {
        var setCredentials = function (userid, username, password) {
            $rootScope.globals = {
                currentUser: {
                    userid: userid,
                    username: username,
                    password: password
                }
            };

            $cookieStore.put('globals', $rootScope.globals);
        }

        var clearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        }

        var getCredentials = function () {
            if (!$rootScope.globals)
                $rootScope.globals = $cookieStore.get('globals') || {};

            return $rootScope.globals.currentUser;
        }

        return {
            setCredentials: setCredentials,
            clearCredentials: clearCredentials,
            getCredentials: getCredentials
        };
    }

    var module = angular.module("app");
    module.factory("webApiService", webApiService);
    module.factory("authenticationService", authenticationService);
}());
