(function () {
    var module = angular.module("app");

    module.controller("loginController", ['$scope', 'webApiService', 'authenticationService', '$location', '$timeout', '$stateParams', '$cookies', function ($scope, webApiService, authenticationService, $location, $timeout, $stateParams, $cookies) {
        $scope.userName = "";
        $scope.userPassword = "";
        $scope.loginMessage = '';

        $scope.login = function () {
            webApiService.getUser($scope.userName).then(function (response) {
                if (response.success) {
                    var user = response.data;
                    if (user.Password === $scope.userPassword) {
                        $scope.loginMessage = 'Logged in, redirecting to countries page..';
                        authenticationService.setCredentials(user.Id, user.Name, user.Password);
                        $timeout(function () { $location.path('/countries'); }, 2000);                      
                    } else {
                        responseError();
                    }
                }
                else if (response.statusCode == 404) {
                    responseError();
                }
            });
        }

        var responseError = function () {
            $scope.loginMessage = 'Username or password is incorrect';
        };

        //if login page was requested with the optional parameter 'webApiAddress', 
        //the application will direct all CRUD operations to the given value(ip address) 
        var webApiAddressValue = $stateParams.webApiAddress;
        if (typeof (webApiAddressValue) != 'undefined' && webApiAddressValue != '') {
            //if webApiAddressValue is 0 clear the web api address and use the local storage
            if (webApiAddressValue == '0') {
                $cookies.remove('webApiAddress');
            }

            //if webApiAddressValue is 1 clear all local storage data
            else if (webApiAddressValue == '1') {
                localStorage.removeItem('users');
                localStorage.removeItem('countries');
                localStorage.removeItem('cities');
            }

            //otherwise direct all CRUD operations to the given address(web api, web service, wcf..)
            else {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 7);
                $cookies.put('webApiAddress', webApiAddressValue, { 'expires': expireDate });
            }
        }
    }]);
})();