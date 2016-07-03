(function () {
    //service constructor
    var appConfigurationService = function () {

        var audioModes = {
            "of": { 'value': 'Of' },
            "on": { 'value': 'On' }
        };

        var audio = audioModes.of;

        var playModes = {
            "of": { 'value': 'Of' },
            "auto": { 'value': 'Auto' }
        };

        var play = playModes.of;

        var repeatModes = {
            "repeatPage": { 'value': 'Repeat Page' },
            "repeatAll": { 'value': 'Repeat All' }
        };

        var repeat = repeatModes.repeatAll;

        //card animation speed
        var fadeInSpeed = {'value': 500};
        //when in play mode, swich between cards speed
        var playSpeed = { 'value': 1000 };

        var getKeyFromObject = function (object, modes) {
            for (key in modes) {
                if (Object.is(modes[key], object)) {
                    return key;
                }
            }

            return undefined;
        };

        var getAudioKey = function (audio) {
            return getKeyFromObject(audio, audioModes);
        };

        var getPlayKey = function (play) {
            return getKeyFromObject(play, playModes);
        };

        var getRepeatKey = function (repeat) {
            return getKeyFromObject(repeat, repeatModes);
        };

        var requestConfig = { timeout: 30000 };


        return {
            audioModes: audioModes,
            audio: audio,
            playModes: playModes,
            play: play,
            repeatModes: repeatModes,
            repeat: repeat,
            fadeInSpeed: fadeInSpeed,
            playSpeed: playSpeed,
            getAudioKey: getAudioKey,
            getPlayKey: getPlayKey,
            getRepeatKey: getRepeatKey,
            requestConfig: requestConfig
        };
    };

    var module = angular.module("app");
    module.factory("appConfigurationService", appConfigurationService);
}());