(function () {
    var module = angular.module("app");

    module.controller("ticketsController", function ($scope, $location, apiService, $cookies, $routeParams) {
        $scope.itemsCollection = [];
        $scope.lastVisitedPageName = $cookies.get('lastVisitedTicket');

        var onFetchTicketsError = function (response) {
            $scope.error = "Could not fetch tickets";
        };

        var onFetchTicketsComplete = function (data) {
            $scope.itemsCollection = data;
        };

        //get the url param 'webApiAddress'(can be undefined)
        var webApiAddressValue = $routeParams.webApiAddress;

        if (typeof (webApiAddressValue) != 'undefined') {
            //clean cookies
            $cookies.remove('webApiAddress');
            $cookies.remove('lastVisitedTicket');
            $cookies.remove('lastNaviguationLabel');

            //if webApiAddressValue is different than 0 and undefined update the cookie value
            if (webApiAddressValue != '0') {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 7);
                $cookies.put('webApiAddress', webApiAddressValue, { 'expires': expireDate });
            }
        }
        apiService.getTickets().then(onFetchTicketsComplete, onFetchTicketsError);
    });
})();