(function () {
    var module = angular.module("app");

    module.directive('sentenceAnimationDirective', function ($interval, appConfigurationService) {
        return {
            restrict: 'E',
            scope: { myNextSentence: '&', myTriggerAudio: '&' },
            link: function (scope, element, attr) {

                var sliderRef;
                var clickAction = function () {
                    if (element.find('div.hiddenWord').css("opacity") == "0") {
                        if (Object.is(appConfigurationService.audio, appConfigurationService.audioModes.on)) {
                            scope.myTriggerAudio();
                        }
                        element.find('div.hiddenWord').animate({ opacity: 1 }, appConfigurationService.fadeInSpeed.value);
                        return false;
                    }
                    else if (element.find('div.hiddenWord').css("opacity") == "1") {
                        element.find('div.hiddenWord').css("opacity", "0");
                        scope.myNextSentence();
                    }
                }
                var stopSilde = function () {
                    if (angular.isDefined(sliderRef)) {
                        $interval.cancel(sliderRef);
                        sliderRef = undefined;
                    }
                };

                element.find('div.hiddenWord').css("opacity", "0");
                element.on("click", clickAction);
                scope.$watch(function () { return appConfigurationService.play; }, function () {
                    if (Object.is(appConfigurationService.play, appConfigurationService.playModes.auto)) {
                        stopSilde();
                        sliderRef = $interval(clickAction, appConfigurationService.playSpeed.value);
                    }
                    else {
                        stopSilde();
                    }
                });

                scope.$on('$destroy', function () {
                    // Make sure that the interval is destroyed too
                    stopSilde();
                });
            }
        };
    });
})();
