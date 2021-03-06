/**
 * Created by sharief on 5/24/17.
 */
(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('SurveyService', ['SurveyFactory', '$q', 'APP_CONSTANTS', function(SurveyFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.surveys = null;
        factory.survey = null;
        factory.ReviewRecord = null;

        factory.getAllSurveys = function(){
            var deferred = $q.defer();

            SurveyFactory.getAllSurveys().get({}, function(success){
                factory.surveys = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.getSurveySchedules = function(id){
            var deferred = $q.defer();

            SurveyFactory.getSurveySchedules(id).get({}, function(success){

                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.addEditSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.addEditSurvey().survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };





        factory.addformsurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.addformsurvey().survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };












        factory.updateSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.updateSurvey(paramObj.id).survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };
        factory.assignSurvey = function(paramObj){
            var deferred = $q.defer();

            SurveyFactory.assignSurvey(paramObj.id).survey(paramObj, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        factory.getReviewResponse = function(reviewId){
            var deferred = $q.defer();
            SurveyFactory.getReviewResponse(reviewId).survey(reviewId, function(success){
                factory.survey = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            });

            return deferred.promise;
        };

        factory.setReviewRecord = function(review){
            if(window.localStorage) {
                window.localStorage.setItem(review.id, angular.toJson(review));
            }
        };

        factory.getReviewRecord = function(review_id){
            return angular.fromJson(window.localStorage && window.localStorage.getItem(review_id));
        };


        factory.setsurveyid = function(data){

            if(window.localStorage) {
                window.localStorage.setItem("surveyInfo", angular.toJson(data));

            }
        };

        factory.getsurveyid = function(){
            return angular.fromJson(window.localStorage && window.localStorage.getItem("surveyInfo"));
        };














        factory.setsurveyRecord = function(data){

            if(window.localStorage) {
                window.localStorage.setItem("surveyRecord", angular.toJson(data));

            }
        };


        factory.getsurveyRecord = function(){
            return angular.fromJson(window.localStorage && window.localStorage.getItem("surveyRecord"));
        };























        factory.setEmpRecord = function(emp){
            if(window.localStorage) {
                window.localStorage.setItem(emp.id, angular.toJson(emp));
            }
        };

        factory.getEmpRecord = function(emp_id){
            return angular.fromJson(window.localStorage && window.localStorage.getItem(emp_id));
        };


        factory.seturlRecored = function(data){
            if(window.localStorage) {
                window.localStorage.setItem(data.url, angular.toJson(data));
            }
        };

        factory.geturlRecored = function(abc){
            return angular.fromJson(window.localStorage && window.localStorage.getItem(abc));
        };

        factory.addToSelectedEmployeesList = function(emp){
            var select_emps = this.getSelectedEmployeesList() || [];

            if(emp.checked === true) {

                select_emps.push(emp);
            }else{
                var odds = _.reject(select_emps, function(emps){ return emps.id === emp.id; });
                select_emps = odds;
            }
            if (window.localStorage) {
                window.localStorage.setItem('selectedEmployees', angular.toJson(select_emps));
            }
        };

        factory.getSelectedEmployeesList = function(){
            return angular.fromJson(window.localStorage && window.localStorage.getItem('selectedEmployees'));
        };


        /*factory.addToSelectedEmployeesList = function(emp)
         {
         var a;
         //is anything in localstorage?
         if (localStorage.getItem('selectedEmployees') === null) {
         a = [];
         } else {
         // Parse the serialized data back into an array of objects
         a = JSON.parse(localStorage.getItem('selectedEmployees'));
         }
         // Push the new data (whether it be an object or anything else) onto the array

         // Alert the array value
         alert(a);  // Should be something like [Object array]
         // Re-serialize the array back into a string and store it in localStorage
         localStorage.setItem('selectedEmployees', JSON.stringify(a));
         return a;
         }*/




        factory.getReviewChart = function(reviewId){
            var deferred = $q.defer();

            SurveyFactory.getReviewChart(reviewId).get({}, function(success){
                factory.barChart = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.getsurveyform = function(id){
            var deferred = $q.defer();

            SurveyFactory.getsurveyform(id).get({}, function(success){
                console.log(success);
                factory.surveys = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };






        return factory;
    }])

    .factory('SurveyFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllSurveys = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getSurveySchedules = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id+'/schedules', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

        factory.addformsurvey = function() {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys', {}, {
                'survey':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

















        factory.addEditSurvey = function() {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys', {}, {
                'survey':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    }
                },
                'put':{
                    method : 'PUT',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.updateSurvey = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id, {}, {
                'survey':{
                    method : 'PUT',
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.assignSurvey = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id+'/schedules', {}, {
                'survey':{
                    method : 'POST',
                    headers: {
                        "Authorization" : bearer
                    },
                    isArray : true
                }
            });
        };

        factory.getReviewResponse = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews/'+id+'/response', {}, {
                'survey':{
                    method : 'GET',
                    headers: {
                        "Authorization" : bearer
                    },
                    isArray : true
                }
            });
        };

        factory.getReviewChart = function(params){

            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/report?employee_id='+params.id+'&type='+params.type+'&customer_id='+params.customer_id,{}, {
                'get':{
                    method : 'GET',
                    headers: {
                        "Authorization" : bearer
                    },
                    // hasBody: true,
                    isArray : true

                }
            });
        };



        // factory.getsurveyform = function(id){
        //     // var bearer = "Bearer " + SessionService.getStoredUserToken();
        //
        //     return $resource(APP_CONSTANTS.API_URL + 'api/reviews/v0/surveys/'+ id, {}, {
        //         'get':{
        //             method : 'GET',
        //             isArray : true,
        //             headers: {
        //
        //             }
        //         }
        //     });
        // };
        factory.getsurveyform = function(id){
            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+ id, {}, {
                'get':{
                    method : 'GET'
                }
            });
        };







        return factory;
    }]);
