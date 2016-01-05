(function () {
    var module = angular.module("app");

    module.controller("ticketsController", function ($scope, $location, apiService, cookiesService) {
        $scope.itemsCollection = "";
        $scope.lastVisitedPageName = cookiesService.getCookie('lastVisitedTicket');

        var onFetchTicketsError = function (response) {
            $scope.error = "Could not fetch tickets";
        };

        var onFetchTicketsComplete = function (data) {
            $scope.itemsCollection = data;
        };

        apiService.getTickets().then(onFetchTicketsComplete, onFetchTicketsError);
    });
})();