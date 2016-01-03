(function () {
    //service constructor
    var apiService = function ($http, $q) {
        var serviceUrl = "http://46.121.29.70:8083";
        var ticketsCollection = [];

        var getTickets = function () {
            var url = serviceUrl + "/api/Page";
            if (ticketsCollection.length == 0) {
                return $http.get(url)
                    .then(function (response) {
                        ticketsCollection = response.data
                        return ticketsCollection;
                    });
            }
            //return ticketsCollection as a promise
            var deferred = $q.defer();
            deferred.resolve(ticketsCollection);
            return deferred.promise;
        };

        var getDictionary = function (pageName) {
            var url = serviceUrl + "/api/Dictionary?pageName=" + pageName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getTickets: getTickets,
            getDictionary: getDictionary,
            audioUrl: serviceUrl + '/Content/mp3/'
        };
    };

    var module = angular.module("app");
    module.factory("apiService", apiService);
}());