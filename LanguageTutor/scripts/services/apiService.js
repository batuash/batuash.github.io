(function () {
    var apiService = function ($http, $q, localHttpService, authenticationService, appConfigurationService) {
        //webApiAddress is set on the 'tickets' web page as a parameter in the url, example: ../LanguageTutor/#/tickets/127.0.0.1:8080
        //var webApiAddress = localStorage.webApiAddress;
        var webApiAddress = 'www.languagestutor.net';//todo: fix later, leave the parameter mechanisam. the developer should set address to go to, or use the local storage
		var requestConfig = appConfigurationService.requestConfig;
		var requestConfigManagement = appConfigurationService.requestConfig;
		requestConfigManagement.cache = false;

        // apiService has 2 possible mechanisms depending on the clients cookie: 
        // no cookie set: defualt behavior, the data is provided as javascript objects by localHttpService.
        // cookie set: cookie directs to the server address(webApi/webservice/wcf..), 
        // which handles the Business logic and provides the data as jason objects  
        if (typeof (webApiAddress) == 'undefined') {
            var getTickets = function () {
                //return tickets data as a promise
                var deferred = $q.defer();
                deferred.resolve(localHttpService.getPage());
                return deferred.promise;
            };

            var getDictionary = function (pageName) {
                //return dictionary data as a promise
                var deferred = $q.defer();
                deferred.resolve(localHttpService.getDictionary(pageName));
                return deferred.promise;
            };

            return {
                getTickets: getTickets,
                getDictionary: getDictionary,
                audioUrl: '/LanguageTutor/audio/',
                itemsPerPage: 3, //number of items shown in each page
                labelsInNaviguation: 3 //number of label(..1 2 3..) icons shown in the pager-naviguation
            };
        }
        else {

            var serviceUrl = "http://" + webApiAddress;
            var ticketsCollection = [];

            var getUser = function (username) {
                var url = serviceUrl + "/api/Users/" + username;
                return $http.get(url, requestConfig).then(onSuccess, onError);
            }

            var createUser = function (userName, userPassword) {
                var url = serviceUrl + "/api/Users";
                var userData = { name: userName, password: userPassword };
                return $http.post(url, userData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var getDictionaries = function () {
                var userId = authenticationService.getCredentials().userid;
                var url = serviceUrl + "/api/dictionaries/" + userId;
                return $http.get(url).then(onSuccess, onError, requestConfig);
            }

            var createDictionary = function (dictionaryName, dictionaryDisc) {
                var userId = authenticationService.getCredentials().userid;
                var url = serviceUrl + "/api/Dictionaries";
                var userData = { name: dictionaryName, description: dictionaryDisc, user: userId};
                return $http.post(url, userData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var updateDictionary = function (dictionaryId, dictionaryName, dictionaryDisc) {
                var userId = authenticationService.getCredentials().userid;
                var url = serviceUrl + "/api/Dictionaries/" + dictionaryId;
                var userData = { id: dictionaryId, name: dictionaryName, description: dictionaryDisc, user: userId, pages: [], user1: {} };
                return $http.put(url, userData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var deleteDictionary = function (dictionaryId) {
                var url = serviceUrl + "/api/Dictionaries/" + dictionaryId;
                return $http.delete(url, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var getPages = function (dictionaryId) {
                var url = serviceUrl + "/api/pages/" + dictionaryId;
                return $http.get(url, requestConfig).then(onSuccess, onError);
            }

            var createPage = function (pageName, dictionaryId) {
                var url = serviceUrl + "/api/Pages";
                var pageData = { name: pageName, dictionary: dictionaryId };
                return $http.post(url, pageData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var updatePage = function (pageId, pageName, dictionaryId) {
                var url = serviceUrl + "/api/Pages/" + pageId;
                var pageData = { id: pageId, name: pageName, dictionary: dictionaryId };
                return $http.put(url, pageData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var deletePage = function (pageId) {
                var url = serviceUrl + "/api/Pages/" + pageId;
                return $http.delete(url, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var getSentences = function (pageId) {
                var url = serviceUrl + "/api/sentences/" + pageId;
                return $http.get(url, requestConfig, requestConfig).then(onSuccess, onError);
            }

            var createSentence = function (sentence, translation, pageId) {
                var url = serviceUrl + "/api/sentences";
                var pageData = { sentence1: sentence, translation: translation, page: pageId };
                return $http.post(url, pageData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var updateSentence = function (sentenceId, sentence, translation, pageId) {
                var url = serviceUrl + "/api/sentences/" + sentenceId;
                var sentenceData = { id: sentenceId, sentence1: sentence, translation: translation, page: pageId };
                return $http.put(url, sentenceData, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            var deleteSenetence = function (sentenceId) {
                var url = serviceUrl + "/api/sentences/" + sentenceId;
                return $http.delete(url, requestConfigManagement)
                    .then(onSuccess, onError);
            }

            //----------------------------------------

            var getTickets = function () {
                var url = serviceUrl + "/api/Page";
                if (ticketsCollection.length == 0) {
                    return $http.get(url, requestConfig)
                        .then(function (response) {
                            ticketsCollection = response.data
                            return ticketsCollection;
                        });
                }
                //return ticketsCollection as a promise
                var deferred = $q.defer();
                deferred.resolve(ticketsCollection);
                return deferred.promise;
            };

            var getDictionary = function (pageName) {
                var url = serviceUrl + "/api/Dictionary?pageName=" + pageName;
                return $http.get(url, requestConfig)
                    .then(function (response) {
                        return response.data;
                    });
            };

            //on success: return an Object {success, data}
            function onSuccess(response) {
                return { success: true, data: response.data };
            }

            //on error: return an Object {success, statuscode, message}
            function onError(response) {
                return { success: false, statusCode: response.status };
            }

            return {
                getUser: getUser,
                createUser: createUser,
                getDictionaries: getDictionaries,
                createDictionary: createDictionary,
                updateDictionary: updateDictionary,
                deleteDictionary: deleteDictionary,
                getPages: getPages,
                createPage: createPage,
                updatePage: updatePage,
                deletePage: deletePage,
                getSentences: getSentences,
                createSentence: createSentence,
                updateSentence: updateSentence,
                deleteSenetence: deleteSenetence,

                getTickets: getTickets,
                getDictionary: getDictionary,
                audioUrl: serviceUrl + '/Content/mp3/',
                itemsPerPage: 5, //number of items shown in each page
                labelsInNaviguation: 3 //number of label(..1 2 3..) icons shown in the pager-naviguation
            };
        }
    };

    var module = angular.module("app");
    module.factory("apiService", apiService);
}());