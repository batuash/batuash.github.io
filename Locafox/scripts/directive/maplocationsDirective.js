(function () {
    var module = angular.module("app");

    module.directive('maplocationsDirective', function () {
        return {
            restrict: 'E',
            template: '<div class="mapLocations"></div>',
            link: function (scope, element, attr) {
                scope.populateMap = function (mapLocations) {
                    if (!mapLocations[0])
                        return;
                    var myCenter = new google.maps.LatLng(mapLocations[0].lat, mapLocations[0].long);
                    var mapProp = {
                        center: myCenter,
                        zoom: 11,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(element.find(".mapLocations")[0], mapProp);

                    var location, marker;
                    for (var i = 0; i < mapLocations.length; i++) {
                        var location = new google.maps.LatLng(mapLocations[i].lat, mapLocations[i].long);
                        var marker = new google.maps.Marker({
                            position: location,
                        });

                        marker.setMap(map);
                    }
                }
            }
        };
    });
})();
