(function () {
    //service constructor
    var cookiesService = function ($cookies) {

        var setExpireDate = function () {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            return expireDate;
        };

        var setCookie = function (key, value) {
            $cookies.put(key, value, { 'expires': setExpireDate() });
        }

        var getCookie = function (key) {
            return $cookies.get(key);
        }

        var hasCookie = function (key) {
            return typeof($cookies.get(key)) !== 'undefined';
        }

        return {
            setCookie: setCookie,
            getCookie: getCookie,
            hasCookie: hasCookie
        };
    };

    var module = angular.module("app");
    module.factory("cookiesService", cookiesService);
}());