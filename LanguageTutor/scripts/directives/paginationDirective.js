(function () {
    var module = angular.module('app');
    module.directive('paginationDirective', ['apiService', function (apiService) {
        return {
            restrict: 'E',
            templateUrl: '/LanguageTutor/scripts/templates/paginationTemplate.html',
            link: function (scope, element, attr) {
                scope.itemsPerPage = apiService.itemsPerPage;//number of items shown in each page
                scope.labelsInNaviguation = apiService.labelsInNaviguation;//number of label(..1 2 3..) icons shown in the pager-naviguation

                //initial values
                scope.prevLabelDisabled = false;
                scope.nextLabelDisabled = false;

                //itemsCollection should be a property set on the controller to wrapp in a pagination
                scope.$watch(function () { return scope.itemsCollection; }, function (itemsCollection) {
                    //todo: updated library here, save changes in the dev folder
                    //todo: verify that if the (labelsInNaviguationCount <=1) no pagination
                    scope.labelsInNaviguationCount = parseInt((itemsCollection.length + (scope.itemsPerPage - 1)) / (scope.itemsPerPage));
                    var lastNaviguationLabel = localStorage.lastNaviguationLabel;
                    scope.selectedLabelInNaviguation = (typeof(lastNaviguationLabel) == 'undefined') ? 1 : parseInt(lastNaviguationLabel);
                    updatePaginationValues();
                });

                scope.naviguateToPage = function (newSelectedLabelInNaviguation) {
                    if (newSelectedLabelInNaviguation <= scope.labelsInNaviguationCount && newSelectedLabelInNaviguation >= 1 && newSelectedLabelInNaviguation != scope.selectedLabelInNaviguation) {
                        scope.selectedLabelInNaviguation = newSelectedLabelInNaviguation;
                        updatePaginationValues();
                    }
                }

                var updatePaginationValues = function () {
                    //save value in a cookie in the clients machine
                    localStorage.lastNaviguationLabel = scope.selectedLabelInNaviguation;
                    scope.firstlabelsInNaviguation = scope.itemsPerPage * (scope.selectedLabelInNaviguation - 1);
                    scope.prevLabelDisabled = (scope.selectedLabelInNaviguation == 1) ? true : false;
                    scope.nextLabelDisabled = (scope.selectedLabelInNaviguation == scope.labelsInNaviguationCount) ? true : false;

                    //pagination values
                    var labelsInNaviguationStart, labelsInNaviguationEnd;
                    if (scope.labelsInNaviguationCount <= scope.labelsInNaviguation) {
                        labelsInNaviguationStart = 1;
                    }
                    else if (scope.selectedLabelInNaviguation + parseInt(scope.labelsInNaviguation / 2) > scope.labelsInNaviguationCount) {
                        labelsInNaviguationStart = scope.labelsInNaviguationCount - (scope.labelsInNaviguation - 1);
                    }
                    else {
                        labelsInNaviguationStart = (scope.selectedLabelInNaviguation - parseInt(scope.labelsInNaviguation / 2) > 0) ? scope.selectedLabelInNaviguation - parseInt(scope.labelsInNaviguation / 2) : 1;
                    }
                    //label numbers that are showing is maximium = the value of 'labelsInNaviguation'
                    labelsInNaviguationEnd = Math.min(labelsInNaviguationStart + scope.labelsInNaviguation, scope.labelsInNaviguationCount + 1);

                    //labelsNaviguationCollection holds the naviguation label icons shown in the bottom of the content
                    scope.labelsNaviguationCollection = [];
                    for (var i = labelsInNaviguationStart; i < labelsInNaviguationEnd; i++) {
                        scope.labelsNaviguationCollection.push(i);
                    }
                };
            }
        };
    }]);
})();