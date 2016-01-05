(function () {
    var module = angular.module('app');
    module.directive('paginationDirective', ['cookiesService', function (cookiesService) {
        return {
            restrict: 'E',
            templateUrl: '/LanguageTutor/scripts/templates/paginationTemplate.html',
            link: function (scope, element, attr) {
                //arbitrary setting, change later
                scope.itemsPerPage = 5;//number of items shown in each page
                scope.labelsInNaviguation = 3;//number of label(..1 2 3..) icons shown in the pager-naviguation

                //initial values
                scope.prevLabelDisabled = false;
                scope.nextLabelDisabled = false;

                //itemsCollection should be a property set on the controller to wrapp in a pagination
                scope.$watch(function () { return scope.itemsCollection; }, function (itemsCollection) {
                    if (scope.itemsCollection.length == 0)
                        return;
                    scope.labelsInNaviguationCount = parseInt((itemsCollection.length + (scope.itemsPerPage - 1)) / (scope.itemsPerPage));
                    var lastNaviguationLabel = cookiesService.getCookie('lastNaviguationLabel');
                    scope.selectedLabelInNaviguation = (typeof(lastNaviguationLabel) == 'undefined') ? 1 : parseInt(lastNaviguationLabel);
                });

                scope.$watch(function () { return scope.selectedLabelInNaviguation; }, function (selectedLabelInNaviguation) {
                    //save value in a cookie in the clients machine
                    cookiesService.setCookie('lastNaviguationLabel', selectedLabelInNaviguation);
                    scope.firstlabelsInNaviguation = scope.itemsPerPage * (selectedLabelInNaviguation - 1);
                    scope.prevLabelDisabled = (selectedLabelInNaviguation == 1) ? true : false;
                    scope.nextLabelDisabled = (selectedLabelInNaviguation == scope.labelsInNaviguationCount) ? true : false;

                    //pagination values
                    var labelsInNaviguationStart, labelsInNaviguationEnd;
                    if (scope.labelsInNaviguationCount <= scope.labelsInNaviguation) {
                        labelsInNaviguationStart = 1;
                    }
                    else if (selectedLabelInNaviguation + parseInt(scope.labelsInNaviguation / 2) > scope.labelsInNaviguationCount) {
                        labelsInNaviguationStart = scope.labelsInNaviguationCount - (scope.labelsInNaviguation - 1);
                    }
                    else {
                        labelsInNaviguationStart = (selectedLabelInNaviguation - parseInt(scope.labelsInNaviguation / 2) > 0) ? selectedLabelInNaviguation - parseInt(scope.labelsInNaviguation / 2) : 1;
                    }
                    //label numbers that are showing is maximium = the value of 'labelsInNaviguation'
                    labelsInNaviguationEnd = Math.min(labelsInNaviguationStart + scope.labelsInNaviguation, scope.labelsInNaviguationCount + 1);

                    scope.labelsNaviguationCollection = [];
                    for (var i = labelsInNaviguationStart; i < labelsInNaviguationEnd; i++) {
                        scope.labelsNaviguationCollection.push(i);
                    }
                });

                scope.naviguateToPage = function (newSelectedLabelInNaviguation) {
                    if (newSelectedLabelInNaviguation <= scope.labelsInNaviguationCount && newSelectedLabelInNaviguation >= 1 && newSelectedLabelInNaviguation != scope.selectedLabelInNaviguation) {
                        scope.selectedLabelInNaviguation = newSelectedLabelInNaviguation;
                    }
                }
            }
        };
    }]);
})();