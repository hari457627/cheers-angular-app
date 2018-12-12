/**
 * Created by sharief on 5/24/17.
 */

/*jslint devel: true */
(function () {
    'use strict';
    /*jslint devel: true */
    // this function is strict...
}());

angular.module('mod.m161')
    .factory('CustomerService', ['CustomerFactory', '$q', 'APP_CONSTANTS', function(CustomerFactory, $q, APP_CONSTANTS){

        var factory = {};
        factory.fullList = null;
        factory.customerContacts = null;
        factory.customerEmployees = null;

        factory.getAllCustomers = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllCustomers().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getAllEmployeesdata = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllEmployeesdata().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };




















        /*factory.getAllEmployeesdata = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllCustomers().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };*/
        factory.getAllContacts = function(id){
            var deferred = $q.defer();

            CustomerFactory.getAllContacts(id).get({}, function(success){
                factory.customerContacts = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };
        factory.getAllEmployees = function(id){
            var deferred = $q.defer();

            CustomerFactory.getAllEmployees(id).get({}, function(success){
                factory.customerEmployees = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getSubmittedReviews = function(id){
            var deferred = $q.defer();

            CustomerFactory.getSubmittedReviews(id).get({}, function(success,headers,config,x){
                //console.log(headers('Content-Pagination'));
                factory.SubmittedReviews = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getSubmittedReviewsofEmployee = function(id){
            var deferred = $q.defer();

            CustomerFactory.getSubmittedReviewsofEmployee(id).get({}, function(success,headers,config,x){
                //console.log(headers('Content-Pagination'));
                factory.SubmittedReviews = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.getpiechart = function(reviewId){
            var deferred = $q.defer();

            CustomerFactory.getpiechart(reviewId).get({}, function(success){
                factory.piechart = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.getEmployeepiechart = function(reviewId){
            var deferred = $q.defer();

            CustomerFactory.getEmployeepiechart(reviewId).get({}, function(success){
                factory.piechart = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.getSurveyPieChart = function(id){
            var deferred = $q.defer();

            CustomerFactory.getSurveyPieChart(id).get({}, function(success){
                factory.piechart = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };






        factory.getPendingReviews = function(id){
            var deferred = $q.defer();

            CustomerFactory.getPendingReviews(id).get({}, function(success){
                factory.customerEmployees = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };

        factory.getPendingReviewsofEmployee = function(id){
            var deferred = $q.defer();

            CustomerFactory.getPendingReviewsofEmployee(id).get({}, function(success){
                factory.customerEmployees = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };



        factory.getAllPendingReviews = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllPendingReviews().get({}, function(success){
                factory.allpendingreviews = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        factory.getAllSubmittedReviews = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllSubmittedReviews().get({}, function(success,status,headers,config, x){
                factory.allSubmittedReviews = success;


                /*  console.log(headers(), 'headers');*/
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };



        factory.getAllPieCharts = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllPieCharts().get({}, function(success){
                factory.allpiecharts = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };










        factory.getAllEmployeesData = function(){
            var deferred = $q.defer();

            CustomerFactory.getAllEmployeesData().get({}, function(success){
                factory.fullList = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };




        factory.getSurveyUsers = function(id){
            var deferred = $q.defer();

            CustomerFactory.getSurveyUsers(id).get({}, function(success){
                factory.surveyss = success;
                deferred.resolve(success);
            }, function(error){
                deferred.reject(error);
            } );

            return deferred.promise;
        };


        return factory;
    }])

    .factory('CustomerFactory', ['$resource', 'APP_CONSTANTS', 'SessionService', function($resource, APP_CONSTANTS, SessionService){
        var factory = {};
        factory.getAllCustomers = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getAllContacts = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers/'+id+'/contacts', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getAllEmployees = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers/'+id+'/employees', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };




        factory.getSubmittedReviews = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=submitted&customer_id='+id, {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        "Authorization": bearer
                    }
                }
            });
        };

        factory.getSubmittedReviewsofEmployee = function(id) {
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=submitted&employee_id='+id, {}, {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {
                        "Authorization": bearer
                    }
                }
            });
        };

        factory.getpiechart = function(params){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/report?customer_id='+params.id+'&type='+params.type,{}, {
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



        factory.getEmployeepiechart = function(params){
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




        factory.getSurveyPieChart = function(params){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+params.id+'/report?type=pie_chart',{}, {
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













        factory.getPendingReviews = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=pending&customer_id='+id, {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

        factory.getPendingReviewsofEmployee = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=pending&employee_id='+id, {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };

        factory.employeesToCustomer = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/customers/59266e43ce3ead000160a3ae/employees', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        factory.getAllEmployeesdata = function(id){

            
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/employees', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };


        factory.getAllPendingReviews = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=pending', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };



        factory.getAllSubmittedReviews = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/reviews?type=submitted', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };



        factory.getAllPieCharts = function(){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/report?type=pie_chart', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };




        factory.getAllEmployeesData = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/employees', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };






        factory.getSurveyUsers = function(id){
            var bearer = "Bearer " + SessionService.getStoredUserToken();

            return $resource(APP_CONSTANTS.REVIEW_API_URL + 'api/reviews/v0/surveys/'+id+'/response', {}, {
                'get':{
                    method : 'GET',
                    isArray : true,
                    headers: {
                        "Authorization" : bearer
                    }
                }
            });
        };
        return factory;
    }]);
