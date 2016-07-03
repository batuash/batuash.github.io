(function () {
    var module = angular.module('app');
    module.directive('configurationDirective', ['appConfigurationService', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: ['$scope', 'appConfigurationService', function ($scope, appConfigurationService) {
                //init configuration values
                $scope.configService =  appConfigurationService;

                //set the configurtion property according to the user pick
                $scope.$watch(function () { return $scope.configService.audio; }, function (audio) {
                    var configuration = getConfigData();
                    configuration.audio = $scope.configService.getAudioKey(audio);
                    setConfigData(configuration);
                });

                $scope.$watch(function () { return $scope.configService.play; }, function (play) {
                    var configuration = getConfigData();
                    configuration.play = $scope.configService.getPlayKey(play);
                    setConfigData(configuration);
                });

                $scope.$watch(function () { return $scope.configService.repeat; }, function (repeat) {
                    var configuration = getConfigData();
                    configuration.repeat = $scope.configService.getRepeatKey(repeat);
                    setConfigData(configuration);
                });

                $scope.$watch(function () { return $scope.configService.fadeInSpeed.value; }, function (fadeInSpeed) {
                    var configuration = getConfigData();
                    configuration.fadeInSpeed = fadeInSpeed;
                    setConfigData(configuration);
                });

                $scope.$watch(function () { return $scope.configService.playSpeed.value; }, function (playSpeed) {
                    var configuration = getConfigData();
                    configuration.playSpeed = playSpeed;
                    setConfigData(configuration);
                });

                //init configuration values
                if (getConfigData().audio) {
                    var key = getConfigData().audio;
                    $scope.configService.audio = $scope.configService.audioModes[key];
                }
                if (getConfigData().play) {
                    var key = getConfigData().play;
                    $scope.configService.play = $scope.configService.playModes[key];
                }
                if (getConfigData().repeat) {
                    var key = getConfigData().repeat;
                    $scope.configService.repeat = $scope.configService.repeatModes[key];
                }
                if (getConfigData().fadeInSpeed) {
                    $scope.configService.fadeInSpeed.value = getConfigData().fadeInSpeed;
                }
                if (getConfigData().playSpeed) {
                    $scope.configService.playSpeed.value = getConfigData().playSpeed;
                }

                function getConfigData() {
                    if (!localStorage.configuration) {
                        localStorage.configuration = JSON.stringify({});
                    }

                    return JSON.parse(localStorage.configuration);
                }

                function setConfigData(configuration) {
                    localStorage.configuration = JSON.stringify(configuration);
                }
            }],
            templateUrl: '/LanguageTutor/scripts/templates/configurationTemplate.html'
        };
    }]);
})();