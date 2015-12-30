$(document).ready(function () {
    $(".dictionaryWrapper div.hiddenWord").css("opacity", "0")
    $(".dictionaryWrapper a.translateBtn").on("click", handleTranslate);
    $(".btnDef").on("click", triggerAudio);
});

function handleTranslate(event) {
    if ($(".dictionaryWrapper div.hiddenWord").css("opacity") == "0") {
        $(".dictionaryWrapper div.hiddenWord").animate({ opacity: 1 }, 1000);
        return false;
    }
}

function triggerAudio(event) {
    $(".audioListen").trigger('play');
}
