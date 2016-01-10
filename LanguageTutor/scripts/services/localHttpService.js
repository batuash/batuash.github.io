(function () {
    var localHttpService = function () {
        var pageData = [
{
    ID: 1,
    PAGENAME: "Card1",
    ISCURRENT: null
},
{
    ID: 2,
    PAGENAME: "Card2",
    ISCURRENT: null
},
{
    ID: 3,
    PAGENAME: "Card3",
    ISCURRENT: null
},
{
    ID: 4,
    PAGENAME: "Card4",
    ISCURRENT: null
},
{
    ID: 5,
    PAGENAME: "Card5",
    ISCURRENT: null
},
{
    ID: 6,
    PAGENAME: "Card6",
    ISCURRENT: null
},
{
    ID: 7,
    PAGENAME: "Card7",
    ISCURRENT: null
},
{
    ID: 8,
    PAGENAME: "Card8",
    ISCURRENT: null
},
{
    ID: 9,
    PAGENAME: "Card9",
    ISCURRENT: null
},
{
    ID: 10,
    PAGENAME: "Card10",
    ISCURRENT: null
},
{
    ID: 11,
    PAGENAME: "Card11",
    ISCURRENT: null
},
{
    ID: 12,
    PAGENAME: "Card12",
    ISCURRENT: null
}
        ];

        var dictionaryData = [
//Card1
{
    ID: 9265,
    GERWORD: "dünn",
    ENWORD: "thin",
    PAGENAME: "Card1"
},
{
    ID: 9266,
    GERWORD: "schlank",
    ENWORD: "slender",
    PAGENAME: "Card1"
},
{
    ID: 9267,
    GERWORD: "kleid",
    ENWORD: "dress",
    PAGENAME: "Card1"
},
//Card2
{
    ID: 9255,
    GERWORD: "ich finde das bild wirkt",
    ENWORD: "I think the picture has something",
    PAGENAME: "Card2"
},
{
    ID: 9256,
    GERWORD: "süß",
    ENWORD: "cute, sweet, adorable",
    PAGENAME: "Card2"
},
{
    ID: 9257,
    GERWORD: "trinken",
    ENWORD: "to drink",
    PAGENAME: "Card2"
},
//Card3
{
    ID: 9245,
    GERWORD: "hübsch",
    ENWORD: "pretty",
    PAGENAME: "Card3"
},
{
    ID: 9246,
    GERWORD: "hässlich",
    ENWORD: "ugly",
    PAGENAME: "Card3"
},
{
    ID: 9247,
    GERWORD: "andere",
    ENWORD: "different, other",
    PAGENAME: "Card3"
},
//Card4
{
    ID: 8263,
    GERWORD: "sinken",
    ENWORD: "to sink",
    PAGENAME: "Card4"
},
{
    ID: 8265,
    GERWORD: "grund",
    ENWORD: "ground, land, soil",
    PAGENAME: "Card4"
},
{
    ID: 8266,
    GERWORD: "auf den grund sinken",
    ENWORD: "to sink to the bottom",
    PAGENAME: "Card4"
},
//Card5
{
    ID: 8253,
    GERWORD: "hüfte(die), hüften(die)",
    ENWORD: "hip",
    PAGENAME: "Card5"
},
{
    ID: 8254,
    GERWORD: "aufwärts",
    ENWORD: "up, upward",
    PAGENAME: "Card5"
},
{
    ID: 8255,
    GERWORD: "von der hüfte aufwärts",
    ENWORD: "from the waist upwards",
    PAGENAME: "Card5"
},
//Card6
{
    ID: 7265,
    GERWORD: "kuchen",
    ENWORD: "cake",
    PAGENAME: "Card6"
},
{
    ID: 7266,
    GERWORD: "kuchen frisch aus dem backofen ",
    ENWORD: "cakes fresh from the oven",
    PAGENAME: "Card6"
},
{
    ID: 8245,
    GERWORD: "leben",
    ENWORD: "live(v)",
    PAGENAME: "Card6"
},
//Card7
{
    ID: 7255,
    GERWORD: "den feind im rücken haben",
    ENWORD: "to have the enemy to one's rear",
    PAGENAME: "Card7"
},
{
    ID: 7256,
    GERWORD: "wirbelsäule(die), wirbelsäulen(die)",
    ENWORD: "spinal column",
    PAGENAME: "Card7"
},
{
    ID: 7257,
    GERWORD: "schulter(die), schulteren(die)",
    ENWORD: "shoulder",
    PAGENAME: "Card7"
},
//Card8
{
    ID: 7245,
    GERWORD: "nass",
    ENWORD: "wet",
    PAGENAME: "Card8"
},
{
    ID: 7246,
    GERWORD: "mine haare sind nass",
    ENWORD: "my hair is wet",
    PAGENAME: "Card8"
},
{
    ID: 7247,
    GERWORD: "körper",
    ENWORD: "body",
    PAGENAME: "Card8"
},
//Card9
{
    ID: 7235,
    GERWORD: "klein",
    ENWORD: "little, small",
    PAGENAME: "Card9"
},
{
    ID: 7236,
    GERWORD: "groß",
    ENWORD: "big, large, tall",
    PAGENAME: "Card9"
},
{
    ID: 7237,
    GERWORD: "als",
    ENWORD: "than",
    PAGENAME: "Card9"
},
//Card10
{
    ID: 7222,
    GERWORD: "hals(der), hälse(die)",
    ENWORD: "neck",
    PAGENAME: "Card10"
},
{
    ID: 7223,
    GERWORD: "kopf(der), köpfe(die)",
    ENWORD: "head",
    PAGENAME: "Card10"
},
{
    ID: 7224,
    GERWORD: "lied(das), lieder(die)",
    ENWORD: "song",
    PAGENAME: "Card10"
},
//Card11
{
    ID: 7212,
    GERWORD: "ohr(das), ohren(die)",
    ENWORD: "ear",
    PAGENAME: "Card11"
},
{
    ID: 7213,
    GERWORD: "denken",
    ENWORD: "to think",
    PAGENAME: "Card11"
},
{
    ID: 7214,
    GERWORD: "jetzt",
    ENWORD: "now",
    PAGENAME: "Card11"
},
//Card12
{
    ID: 7202,
    GERWORD: "gesicht(das), gesichter(die)",
    ENWORD: "face",
    PAGENAME: "Card12"
},
{
    ID: 7203,
    GERWORD: "mund(der), münder(die)",
    ENWORD: "mouth",
    PAGENAME: "Card12"
},
{
    ID: 7204,
    GERWORD: "lippe(die), lippen(die)",
    ENWORD: "lip",
    PAGENAME: "Card12"
}
        ];

        return {
            getPage: function () { return pageData; },
            getDictionary: function (pageName) { return dictionaryData.filter(function (value) { return value.PAGENAME == pageName }); }
        };
    };

    var module = angular.module("app");
    module.factory("localHttpService", localHttpService);
}());