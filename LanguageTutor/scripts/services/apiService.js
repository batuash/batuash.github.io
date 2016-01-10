(function () {
    var apiService = function ($http, $q, $cookies, localHttpService) {
        //webApiAddress is set on the 'tickets' web page as a parameter in the url, example: ../LanguageTutor/#/tickets/127.0.0.1:8080
        var webApiAddress = $cookies.get("webApiAddress");

        // apiService has 2 possible mechanisms depending on the clients cookie: 
        // no cookie set: defualt behavior, the data is provided as javascript objects by localHttpService.
        // cookie set: cookie directs to the server address(webApi/webservice/wcf..), 
        // which handles the Business logic and provides the data as jason objects  
        if (typeof (webApiAddress) == 'undefined') {
            var getTickets = function () {
                //return tickets data as a promise
                var deferred = $q.defer();
                deferred.resolve(localHttpService.getPage());
                return deferred.promise;
            };

            var getDictionary = function (pageName) {
                //return dictionary data as a promise
                var deferred = $q.defer();
                deferred.resolve(localHttpService.getDictionary(pageName));
                return deferred.promise;
            };

            return {
                getTickets: getTickets,
                getDictionary: getDictionary,
                audioUrl: '/LanguageTutor/audio/',
                itemsPerPage: 3, //number of items shown in each page
                labelsInNaviguation: 3 //number of label(..1 2 3..) icons shown in the pager-naviguation
            };
        }
        else {

            var serviceUrl = "http://" + webApiAddress;
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
                audioUrl: serviceUrl + '/Content/mp3/',
                itemsPerPage: 5, //number of items shown in each page
                labelsInNaviguation: 3 //number of label(..1 2 3..) icons shown in the pager-naviguation
            };
        }
    };

    var module = angular.module("app");
    module.factory("apiService", apiService);
}());