(function () {
    //service constructor
    var appConfigurationService = function () {

        var audioModes = {
            "mute": { 'value': 'Mute' },
            "play": { 'value': 'Play' }
        };

        var audioMode = audioModes.mute;

        var playModes = {
            "noPlay": {'value':'No Play'},
            "repeatCard": { 'value': 'Repeat Card' },
            "repeatAll": { 'value': 'Repeat All' }
        };

        var playMode = playModes.noPlay;

        //card animation speed
        var fadeInSpeed = 500;
        //when in slide mode swich between cards speed
        var slideShowSpeed = 1000;

        return {
            audioModes: audioModes,
            audioMode: audioMode,
            playModes: playModes,
            playMode: playMode,
            fadeInSpeed: fadeInSpeed,
            slideShowSpeed: slideShowSpeed
        };
    };

    var module = angular.module("app");
    module.factory("appConfigurationService", appConfigurationService);
}());