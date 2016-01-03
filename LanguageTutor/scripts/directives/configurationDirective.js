(function () {
    var module = angular.module('app');
    module.directive('configurationDirective', ['appConfigurationService', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: ['$scope', 'appConfigurationService', 'cookiesService', function ($scope, appConfigurationService, cookiesService) {
                //init configuration values
                $scope.configService =  appConfigurationService;

                //set the configurtion property according to the user pick
                $scope.$watch(function () { return $scope.configService.audio; }, function (audio) {
                    cookiesService.setCookie('configService.audio', $scope.configService.getAudioKey(audio));
                });

                $scope.$watch(function () { return $scope.configService.play; }, function (play) {
                    cookiesService.setCookie('configService.play', $scope.configService.getPlayKey(play));
                });

                $scope.$watch(function () { return $scope.configService.repeat; }, function (repeat) {
                    cookiesService.setCookie('configService.repeat', $scope.configService.getRepeatKey(repeat));
                });

                $scope.$watch(function () { return $scope.configService.fadeInSpeed.value; }, function (fadeInSpeed) {
                    cookiesService.setCookie('configService.fadeInSpeed', fadeInSpeed);
                });

                $scope.$watch(function () { return $scope.configService.playSpeed.value; }, function (playSpeed) {
                    cookiesService.setCookie('configService.playSpeed', playSpeed);
                });

                //init configuration values
                if (cookiesService.hasCookie('configService.audio')) {
                    var key = cookiesService.getCookie('configService.audio');
                    $scope.configService.audio = $scope.configService.audioModes[key];
                }
                if (cookiesService.hasCookie('configService.play')) {
                    var key = cookiesService.getCookie('configService.play');
                    $scope.configService.play = $scope.configService.playModes[key];
                }
                if (cookiesService.hasCookie('configService.repeat')) {
                    var key = cookiesService.getCookie('configService.repeat');
                    $scope.configService.repeat = $scope.configService.repeatModes[key];
                }
                if (cookiesService.hasCookie('configService.fadeInSpeed')) {
                    $scope.configService.fadeInSpeed.value = parseInt(cookiesService.getCookie('configService.fadeInSpeed'));
                }
                if (cookiesService.hasCookie('configService.playSpeed')) {
                    $scope.configService.playSpeed.value = parseInt(cookiesService.getCookie('configService.playSpeed'));
                }
            }],
            templateUrl: '/LanguageTutor/scripts/templates/configurationTemplate.html',
            link: function (scope, element, attr) {
                scope.$on('$destroy', function () {
                    //defect when changing cards while popup open 
                    //$(document).find('button.close').trigger('click');
                });
            }

        };
    }]);
})();