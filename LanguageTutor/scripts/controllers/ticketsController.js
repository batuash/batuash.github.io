(function () {
    var module = angular.module("app");

    module.controller("ticketsController", function ($scope, $location, apiService, cookiesService) {
        $scope.message = "hello";
        $scope.ticketCollection = "";
        $scope.lastVisitedPageName = cookiesService.getCookie('lastVisitedTicket');

        var onFetchTicketsError = function (response) {
            $scope.error = "Could not fetch tickets";
        };

        var onFetchTicketsComplete = function (data) {
            $scope.ticketCollection = data;
        };

        apiService.getTickets().then(onFetchTicketsComplete, onFetchTicketsError);
    });
})();