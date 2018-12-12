/**
 * Created by sharief on 5/24/17.
 */
(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('TemplateService', ['TemplateFactory', '$q', 'APP_CONSTANTS', function(TemplateFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.templates = null;
        factory.template = null;
        factory.templateForm = null;

        factory.getAllTemplates = function(){
            var deferred = $q.defer();

            TemplateFactory.getAllTemplates().get({}, function(success){

                factory.templates = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.getReview = function(id){
            var deferred = $q.defer();

            TemplateFactory.getReview(id).get({}, function(success){
                factory.templateForm = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.postReview = function(data){
            var deferred = $q.defer();

            TemplateFactory.postReview(data.id).post(data, function(success){
                //factory.surveyResponse = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getQuestions = function(name){
            var deferred = $q.defer();

            TemplateFactory.getQuestions(name).get({}, function(success){

                factory.templateForm = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.postSurvey = function(data){
            var deferred = $q.defer();

            TemplateFactory.postSurvey(data.id).post(data, function(success){
                //factory.surveyResponse = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getQuests = function(){
            var deferred = $q.defer();

            TemplateFactory.getQuests().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        
        factory.createQuests = function(paramObj){
            var deferred = $q.defer();

            TemplateFactory.createQuests().quests(paramObj, function(success){
                factory.quests = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };
        
        factory.getTemplates = function(){
            var deferred = $q.defer();

            TemplateFactory.getTemplates().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        
        factory.postTemplate = function(paramObj){
            var deferred = $q.defer();

            TemplateFactory.postTemplate().template(paramObj, function(success){
                factory.template = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        factory.getTags = function(){
            var deferred = $q.defer();

            TemplateFactory.getTags().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        
        return factory;
    }])

    .factory('TemplateFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllTemplates = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + '/api/reviews/v0/templates', {}, {
                'get':{
                    method : 'GET',
                    headers: {
                        "Authorization" : bearer
                    },
                    isArray : true

                }
            });
        };
        factory.getReview = function(id){
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews/'+id, {}, {
                'get':{
                    method : 'GET'
                }
            });
        };
        factory.postReview = function(id){
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/schedules/'+id+'/response', {}, {
                'post':{
                    method : 'POST'
                }
            });
        };

        factory.getQuestions = function(name){
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/templates/'+name+'/questions', {}, {
                'get':{
                    method : 'GET',
                    headers: {
                        "Authorization" : bearer
                    },
                    isArray : true
                }
            });
        };
        
        factory.postSurvey = function(id){
            return $resource(APP_CONSTANTS.REVIEW_API_URL + '/api/reviews/v0/surveys/'+id+'/response', {}, {
                'post':{
                    method : 'POST'
                }
            });
        };

        factory.getQuests = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.QUESTIONER_API_URL + 'questions', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        
        factory.createQuests = function(paramObj) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.QUESTIONER_API_URL + 'questions', {}, {
                'quests':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        
        factory.getTemplates = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.QUESTIONER_API_URL + 'templates', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        
        factory.postTemplate = function(paramObj) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.QUESTIONER_API_URL + 'templates', {}, {
                'template':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

        factory.getTags = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource("mod_EmployeeReview/tags.json", {}, {
                'get':{
                    method : 'GET',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        
        return factory;
    }]);
