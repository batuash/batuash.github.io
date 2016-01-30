(function () {
    var localStorageService = function ($q, $filter, $timeout) {
        //User Controller
        var getUser = function (name) {
            var filtered = $filter('filter')(getUsersData(), { Name: name });
            var user = filtered[0];
            if (user) {
                var deferred = $q.defer();
                deferred.resolve({data: user});
                return deferred.promise;
            }
            else {
                return $q.reject({ status: 404 });
            }
        };

        var createUser = function (name, password) {
            var users = getUsersData();
            var filtered = $filter('filter')(users, { Name: name });
            var user = filtered[0];
            if (user) {
                return $q.reject({ status: 409 });
            }
            else {
                user = { Name: name, Password: password };
                var lastUser = users[users.length - 1] || { Id: 0 };
                user.Id = lastUser.Id + 1;
                users.push(user);
                setUsersData(users);
                var deferred = $q.defer();
                deferred.resolve({ data: user });
                return deferred.promise;
            }
        };

        function getUsersData() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsersData(users) {
            localStorage.users = JSON.stringify(users);
        }

        //Country Controller
        var getCountries = function (userId) {
            var filteredCountries = $filter('filter')(getCountriesData(), { UserId: userId });
            var deferred = $q.defer();
            deferred.resolve({ data: filteredCountries });
            return deferred.promise;
        };

        var createCountry = function (countryName, userId) {
            var countries = getCountriesData();
            var filtered = $filter('filter')(countries, { Name: countryName });
            var country = filtered[0];
            if (country) {
                return $q.reject({ status: 409 });
            }
            else {
                country = { Name: countryName, UserId: userId };
                var lastCountry = countries[countries.length - 1] || { ID: 0 };
                country.ID = lastCountry.ID + 1;
                countries.push(country);
                setCountriesData(countries);
                var deferred = $q.defer();
                deferred.resolve({ data: country });
                return deferred.promise;
            }
        };

        var updateCountry = function (countryId, countryName) {
            var countries = getCountriesData();
            var filtered = $filter('filter')(countries, { ID: countryId });
            var country = filtered[0];
            if (country) {
                country.Name = countryName;
                setCountriesData(countries);
                var deferred = $q.defer();
                deferred.resolve({ data: country });
                return deferred.promise;
            }
            else {
                return $q.reject({ status: 404 });
            }
        };

        var deleteCountry = function (countryId) {
            var countries = getCountriesData();
            var filtered = $filter('filter')(countries, { ID: countryId });
            var country = filtered[0];
            if (country) {
                var index = countries.indexOf(country);
                countries.splice(index, 1);
                //Cascase on delete, remove also cities refferencing the deleted country
                var filteredCities = $filter('filter')(getCitiesData(), { Country: countryId });
                filteredCities.forEach(function (city) {
                    deleteCity(city.ID);
                });

                setCountriesData(countries);
                var deferred = $q.defer();
                deferred.resolve({ data: country });
                return deferred.promise;
            }
            else {
                return $q.reject({ status: 404 });
            }
        }

        function getCountriesData() {
            if (!localStorage.countries) {
                localStorage.countries = JSON.stringify([]);
            }

            return JSON.parse(localStorage.countries);
        }

        function setCountriesData(countries) {
            localStorage.countries = JSON.stringify(countries);
        }

        //City Controller
        var getCities = function (countryId) {
            var filteredCities = $filter('filter')(getCitiesData(), { Country: countryId });
            var deferred = $q.defer();
            deferred.resolve({ data: filteredCities });
            return deferred.promise;
        };

        var createCity = function (cityName, countryId) {
            var cities = getCitiesData();
            var filteredCities = $filter('filter')(cities, { Name: cityName });
            var city = filteredCities[0];
            if (city) {
                return $q.reject({ status: 409 });
            }
            else {
                city = { Name: cityName, Country: countryId };
                var lastCity = cities[cities.length - 1] || { ID: 0 };
                city.ID = lastCity.ID + 1;
                cities.push(city);
                setCitiesData(cities);
                var deferred = $q.defer();
                deferred.resolve({ data: city });
                return deferred.promise;
            }
        };

        var updateCity = function (cityId, cityName) {
            var cities = getCitiesData();
            var filteredCities = $filter('filter')(cities, { ID: cityId });
            var city = filteredCities[0];
            if (city) {
                city.Name = cityName;
                setCitiesData(cities);
                var deferred = $q.defer();
                deferred.resolve({ data: city });
                return deferred.promise;
            }
            else {
                return $q.reject({ status: 404 });
            }
        };

        var deleteCity = function (cityId) {
            var cities = getCitiesData();
            var filteredCities = $filter('filter')(cities, { ID: cityId });
            var city = filteredCities[0];
            if (city) {
                var index = cities.indexOf(city);
                cities.splice(index, 1);
                setCitiesData(cities);
                var deferred = $q.defer();
                deferred.resolve({ data: city });
                return deferred.promise;
            }
            else {
                return $q.reject({ status: 404 });
            }
        }

        function getCitiesData() {
            if (!localStorage.cities) {
                localStorage.cities = JSON.stringify([]);
            }

            return JSON.parse(localStorage.cities);
        }

        function setCitiesData(cities) {
            localStorage.cities = JSON.stringify(cities);
        }

        return {
            getUser: getUser,
            createUser: createUser,
            getCountries: getCountries,
            createCountry: createCountry,
            updateCountry: updateCountry,
            deleteCountry: deleteCountry,
            getCities: getCities,
            createCity: createCity,
            updateCity: updateCity,
            deleteCity: deleteCity,
        };
    };

    var module = angular.module("app");
    module.factory("localStorageService", localStorageService);
}());