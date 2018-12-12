(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('SurveyAssignCtrl', ['$scope', '$stateParams' ,'UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', 'AlertService','SessionService','TemplateService', '$q','$log','$state', function($scope, $stateParams, UserService, $mdDialog, SurveyService, CustomerService, $timeout, AlertService,SessionService,TemplateService, $q, $log,$state) {

        $scope.customers = [];
        $scope.customerContacts = [];
        $scope.customerEmployees = [];
        $scope.formObject = {reviewer: null};
        $scope.todaysDate = new Date();
        $scope.formSaved = false;
        $scope.surveyName = SurveyService.survey;
        $scope.selectedCustomerId = $stateParams.c_id;


        $scope.addLink = function(event){
            $scope.survey = {};


            $state.go('m161.sharelink', {

            });



        };





        var init = function () {
            CustomerService.getAllCustomers().then(function (data) {
                $scope.customers = data;
                $scope.customer =  _.find( $scope.customers, function(custmer){ return $scope.selectedCustomerId === custmer.id;    });
            });
            $scope.reviewees = SurveyService.getSelectedEmployeesList();


            if($stateParams.c_id) {
                getCustomerData($scope.selectedCustomerId );
            }else {
                CustomerService.getAllEmployeesData().then(function (data) {
                    $scope.customerContacts = data;
                });
            }

        };
        getCustomerData = function (selectedCustomer) {
            CustomerService.getAllContacts(selectedCustomer).then(function (data) {
                $scope.customerContacts = data;
            });
        };
        init();


        /*$scope.querySearch = function(query) {
         $scope.query = query;
         var results = query && $scope.customerContacts > 0 ? $scope.customerContacts.filter(  createFilterFor  ) : $scope.customerContacts;

         return results;

         };
         function createFilterFor(contact) {

         return (contact.name.indexOf($scope.query) === 0);

         }*/
        $scope.simulateQuery = false;
        $scope.isDisabled    = false;
        $scope.querySearch = function(query) {
            var results = query ? $scope.customerContacts.filter( createFilterFor(query) ) : $scope.customerContacts,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        };

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                var lowercase_name = angular.lowercase(item.name);
                var lowercase_email = angular.lowercase(item.email);
                return (lowercase_name.indexOf(lowercaseQuery) === 0) || (lowercase_email.indexOf(lowercaseQuery) === 0);
            };
        }

        SurveyService.getAllSurveys().then(function(data){
            $scope.surveys = data;
        });


        SurveyService.getsurveyform().then(function(data){
            $scope.formdata = data;
            console.log($scope.formdata);
        });







        $scope.previewTemplate = function(){
            var surveyObject = _.find($scope.surveys, function(survey){
                return survey.id === $scope.survey.id;
            });
            if(surveyObject) {
                console.log(surveyObject.template_name);
                $scope.templateName = surveyObject.template_id;
                $scope.schema = {
                    type: "object",
                    properties: {},
                    required: []
                };
                $scope.isSurveyed = false;
                $scope.message = 'Thank you for submitting review';
                TemplateService.getQuestions($scope.templateName).then(function (data) {
                        if (data) {
                            var questions = data;
                            var properties = {};
                            var form = [];
                            var required = [];
                            var supportedQuestions = {
                                radios: "radios",
                                select: 'radios-inline',
                                textarea: 'textarea'
                            };
                            _.each(questions, function (question) {

                                var prop = {type: 'string', title: question.title};
                                if (question.options) {
                                    prop.enum = question.options;
                                }
                                if (question.counter_maximum && !isNaN(question.counter_maximum)) {
                                    prop.maxLength = parseInt(question.counter_maximum);
                                }
                                properties[question.id] = prop;


                                var formObject = {key: question.id, type: supportedQuestions[question.type]};
                                if (question.placeholder) {
                                    formObject.placeholder = question.placeholder;
                                }
                                form.push(formObject);


                                if (question.required) {
                                    required.push(question.id);
                                }
                            });
                            $scope.schema.properties = properties;
                            $scope.schema.required = required;
                            $scope.form = form;
                            $scope.$broadcast('schemaFormValidate');
                            $scope.$broadcast('schemaFormRedraw');
                        }
                    },
                    function (response) {
                        console.log(response);
                        $scope.formSaved = true;
                        if (response.Error === 'review.submitted') {
                            console.log(response.Error);
                            //AlertService.alert('Survey has already been submitted.');F
                            $scope.message = 'Survey has already being submitted';
                            $scope.isSurveyed = true;
                        } else {
                            AlertService.alert('Unable to load Survey');
                            $scope.message = 'Failed to load the survey';
                        }
                    });
                $scope.form = [
                    "*",
                    {
                        type: "submit",
                        title: "Save"
                    }
                ];
            }
        };
        $scope.assignSurvey = function (status) {
            $state.go('m161.adminCustomer',{'customerId':$scope.selectedCustomerId});
            $scope.reviewee_ids = [];
            _.each($scope.reviewees,function(reviewee){
                $scope.reviewee_ids.push(reviewee.id);
            });
            $scope.Asurvey = {id: $scope.survey.id, name:'Care QA Team Survey', reviewee_ids:$scope.reviewee_ids};
            $scope.Asurvey.reviewer_id = $scope.formObject.reviewer.id || null;
            $scope.Asurvey.status = status;
            SurveyService.assignSurvey($scope.Asurvey).then(function (data){
                $scope.customers = data;
                var message = status ? 'Published' : 'Saved as Draft';
                AlertService.alert('Survey '+ message + ' Successfully');
                $scope.formSaved = true;
            });

        };
    }]).config(function($mdThemingProvider) {
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
});
