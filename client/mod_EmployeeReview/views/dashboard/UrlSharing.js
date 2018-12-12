(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('Urlsharing',
        ['$scope', '$state', 'UserService', '$mdDialog', 'SurveyService', 'TemplateService', 'AlertService','$rootScope','$stateParams', function($scope, $state, UserService, $mdDialog, SurveyService, TemplateService, AlertService,$rootScope,$stateParams){
            console.log("Hello");
            $scope.message = "Hello from your module Dashboard";
            $scope.survey = {};
            $scope.surveys = [];
            $scope.templates = [];

           /* $scope.abc=$rootScope.urls;*/



           $scope.a= SurveyService.geturlRecored($stateParams.abc );

           console.log($scope.a);


            $scope.success = function () {
                console.log('Copied!');
            };

            $scope.fail = function (err) {
                console.error('Error!', err);
            };





            console.log($scope.abcd);
            $scope.imagePath = 'mod_EmployeeReview/assets/icons/donut.png';
            $scope.imagePath1 = 'mod_EmployeeReview/assets/icons/two.jpg';
            $scope.imagePath2 = 'mod_EmployeeReview/assets/icons/three.jpeg';



            $scope.getTextToCopy = function() {
                return "ngClip is awesome!";
            }
            $scope.doSomething = function () {
                console.log("NgClip...");
            }


           /* $scope.textToCopy = $rootScope.urls;*/

            $scope.textToCopy = $scope.a;
            $scope.currentNavItem = 'page1';





            var init = function(){
                TemplateService.getAllTemplates().then(function (data){
                    $scope.templates = data;
                    console.log( $scope.templates );






                    /* $scope.template_name= null;
                     for (var i=0; i <= $scope.templates.length;i++){
                         $scope.template_name = $scope.templates[i].name;
                         console.log($scope.name);
                     }
                     console.log($scope.templates_name);*/
                });
                SurveyService.getAllSurveys().then(function(data){

                    $scope.surveys = data;

                    $scope.autocolumn = [
                        { //Define the Table content
                            name: "name", //The identifier name
                            display: "Name" //the name that will be displayed
                        }, {

                            display: "Description"
                        }, {
                            name: "template_id",
                            display: "Template"
                        },{

                            display: "Verified"
                        },
                        {

                            display: " "
                        }
                    ];
                    /*$scope.deleteCustomer = function (customer) {
                        var index = $scope.surveys.indexOf(customer);
                        $scope.surveys.splice(index, 1);
                        // $scope.customers.splice($index, 1);
                        $scope.$emit('customerDeleted', customer);
                    };*/


                    /* $scope.removeRow = function(name){
                         var index = -1;
                         var comArr = eval( $scope.surveys );
                         for( var i = 0; i < comArr.length; i++ ) {
                             if( comArr[i].name === name ) {
                                 index = i;
                                 break;
                             }
                         }
                         if( index === -1 ) {
                             console( "Something gone wrong" );
                         }
                         $scope.surveys.splice( index, 1 );
                     };*/








                    $scope.datatable = {
                        "count": $scope.surveys.length, //how many rows do we have
                        "data": $scope.surveys

                    };
                    $scope.limitOptions = [10, 15]; //How many entries per page options
                    $scope.options = {
                        pageSelect: true //Yes we want a page selection
                    };
                    $scope.query = { //Define the query
                        order: 'name', //What should be the initial sorting
                        limit: 100, //How many entries per page
                        page: 1 //What is the starting page
                    };
                });

            };
            init();
            $scope.addSurvey = function(){
                $scope.survey = {};

                SurveyService.addEditSurvey($scope.survey).then(function(data) {
                    console.log("im in", data);
                    $scope.checkUsername = function(){
                        $http({
                            method: 'post',
                            data: {name:$scope.name}
                        }).then(function successCallback(response) {
                            $scope.unamestatus = response.name;
                        });
                    };
                    // Set class
                    $scope.addClass = function(unamestatus){
                        if(unamestatus === 'Available'){
                            return 'response exists';
                        }else if(unamestatus === 'Not available'){
                            return 'response not-exists';
                        }else{
                            return 'hide';
                        }
                    };
                    var template = _.find($scope.templates,function(rw){ return rw.id === data.template_id; });
                    data.template_name = template.name;
                    $scope.surveys.push(data);
                });





            };

            $scope.url=null;
            $scope.saveform = function() {
                SurveyService.addEditSurvey($scope.survey).then(function(data) {
                    console.log("im in", data);

                    $scope.url=data.url;
                    console.log($scope.url);
                    $scope.checkUsername = function(){
                        $http({
                            method: 'post',

                            data: {name:$scope.name}
                        }).then(function successCallback(response) {
                            $scope.unamestatus = response.name;
                        });
                    },
                        $scope.alerts = function () {
                            AlertService.alert("Survey Created Successfully");
                            $scope.status = 'You saved the dialog.';
                            $scope.survey = {};
                        },
                        // Set class
                        $scope.addClass = function(unamestatus){
                            if(unamestatus === 'Available'){
                                return 'response exists';
                            }else if(unamestatus === 'Not available'){
                                return 'response not-exists';
                            }else{
                                return 'hide';
                            }
                        };
                    var template = _.find($scope.templates,function(rw){ return rw.id === data.template_id; });
                    data.template_name = template.name;
                    $scope.surveys.push(data);

                    $state.go('m161.sharelink', {'url':$scope.url});
                });

                if(!$scope.survey.status) {
                    $scope.survey.status = false;
                }

            };













            $scope.addform = function(event){
                $scope.survey = {};


                $mdDialog.show({
                    controller: function($scope, $mdDialog, SessionService, SurveyService, AlertService) {

                        $scope.saveDialog = function() {
                            SurveyService.addEditSurvey($scope.survey).then(function(data) {
                                console.log("im in", data);
                                $scope.checkUsername = function(){
                                    $http({
                                        method: 'post',
                                        templateUrl: 'mod_EmployeeReview/views/surveys/eventSurvey.html',
                                        data: {name:$scope.name}
                                    }).then(function successCallback(response) {
                                        $scope.unamestatus = response.name;
                                    });
                                };
                                // Set class
                                $scope.addClass = function(unamestatus){
                                    if(unamestatus === 'Available'){
                                        return 'response exists';
                                    }else if(unamestatus === 'Not available'){
                                        return 'response not-exists';
                                    }else{
                                        return 'hide';
                                    }
                                };
                                var template = _.find($scope.templates,function(rw){ return rw.id === data.template_id; });
                                data.template_name = template.name;
                                $scope.surveys.push(data);
                            });
                            if(!$scope.survey.status) {
                                $scope.survey.status = false;
                            }

                        };
                    },

                })
                    .then(function(survey) {
                        AlertService.alert("Survey Created Successfully");
                        $scope.status = 'You saved the dialog.';
                        $scope.survey = {};

                    });



            };



            $scope.editSurvey = function(id){
                $mdDialog.show({
                    controller: function($scope, $mdDialog, SessionService, AlertService, Survey) {
                        $scope.survey = Survey;
                        $scope.closeDialog = function() {
                            $mdDialog.cancel();

                        };
                        $scope.saveDialog = function() {
                            SurveyService.updateSurvey($scope.survey).then(function(data) {
                                console.log("edit survey in", data);
                                // $scope.surveys.push(data);
                                return data;
                            });

                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'mod_EmployeeReview/views/surveys/addSurvey.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    scope: $scope,
                    preserveScope: true,
                    locals:{
                        "Survey": _.find($scope.surveys, function (survey) { return survey.id === id;})
                    }
                })
                    .then(function(data) {
                        var index = _.find($scope.surveys, function (survey) { return survey.id === id;});
                        $scope.surveys[index] = $scope.survey;
                        AlertService.alert("Survey Updated Successfully");
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };
            $scope.showAssignPage = function (id) {
                SurveyService.survey = _.find($scope.surveys, function (survey) { return survey.id === id;});
                $state.go('m161.surveyAssign', {id: id});

            };

            $scope.assignListPage = function (id) {
                // SurveyService.survey = _.find($scope.surveys, function (survey) { return survey.id === id;});
                $state.go('m161.surveyAssignlist', {id: id});
            };

            $scope.showTemplate = function(templateSlug){
                $mdDialog.show({
                    controller: function($scope, $mdDialog, SessionService, AlertService, TemplateService) {
                        $scope.templateName = templateSlug;
                        $scope.survey = {};
                        $scope.schema = {
                            type: "object",
                            properties: {},
                            required:[]
                        };
                        $scope.isSurveyed = false;
                        $scope.message = 'Thank you for submitting review';
                        var init = function(){

                            TemplateService.getQuestions($scope.templateName).then(function (data){
                                    console.log("getQuestions success");
                                    console.log(TemplateService.templateForm);
                                    if(data) {
                                        var questions = data;
                                        var properties = {};
                                        var form = [];
                                        var required = [];
                                        var supportedQuestions = {radios:"radios", select:'radios-inline', textarea: 'textarea'};
                                        _.each(questions, function (question) {

                                            var prop = {type: 'string', title: question.title};
                                            if (question.options) {
                                                prop.enum = question.options;
                                            }
                                            if(question.counter_maximum && !isNaN(question.counter_maximum)) {
                                                prop.maxLength = parseInt(question.counter_maximum);
                                            }
                                            properties[question.id] = prop;


                                            var formObject = {key: question.id, type: supportedQuestions[question.type]};
                                            if(question.placeholder) {
                                                formObject.placeholder =  question.placeholder;
                                            }
                                            form.push(formObject);


                                            if(question.required) {
                                                required.push(question.id);
                                            }
                                        });
                                        form.push({type: "button", "style": "btn-info", title: "Close", onClick: "closeDialog()"});
                                        $scope.schema.properties = properties;
                                        $scope.schema.required = required;
                                        $scope.form = form;
                                        $scope.$broadcast('schemaFormValidate');
                                        $scope.$broadcast('schemaFormRedraw');

                                    }
                                },
                                function(response) {
                                    console.log(response);
                                    $scope.formSaved = true;
                                    if(response.Error === 'review.submitted'){
                                        console.log(response.Error);
                                        //AlertService.alert('Survey has already been submitted.');
                                        $scope.message = 'Survey has already being submitted';
                                        $scope.isSurveyed = true;
                                    }else{
                                        AlertService.alert('Unable to load Survey');
                                        $scope.message = 'Failed to load the survey';
                                    }
                                });
                        };
                        init();
                        $scope.form = [
                            "*",
                            {
                                type: "submit",
                                title: "Save"
                            }
                        ];

                        $scope.model = {};
                        $scope.closeDialog = function() {
                            $mdDialog.cancel();
                        };
                        $scope.saveDialog = function() {
                            $mdDialog.hide();
                        };


                        $scope.like = function() {
                            AlertService.alert('Unable to load Survey');
                            $scope.like=true;
                        };
                        $scope.dislike = function() {
                            $scope.like=false;
                            AlertService.alert('Unable to load Survey');
                        };



                    },
                    templateUrl: 'mod_EmployeeReview/views/template/previewForm.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    scope: $scope,
                    clickOutsideToClose:true,
                    preserveScope: true
                })
                    .then(function() {
                        $scope.status = 'You previewed the form in dialog.';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };











            $scope.showtemp = function(){



                $scope.survey = {};
                $scope.schema = {
                    type: "object",
                    properties: {},
                    required:[]
                };
                $scope.isSurveyed = false;
                $scope.message = 'Thank you for submitting review';
                var init = function(){

                    TemplateService.getQuestions($scope.template.name).then(function (data){
                            console.log("getQuestions success");
                            console.log(TemplateService.templateForm);
                            if(data) {
                                var questions = data;
                                var properties = {};
                                var form = [];
                                var required = [];
                                var supportedQuestions = {radios:"radios", select:'radios-inline', textarea: 'textarea'};
                                _.each(questions, function (question) {

                                    var prop = {type: 'string', title: question.title};
                                    if (question.options) {
                                        prop.enum = question.options;
                                    }
                                    if(question.counter_maximum && !isNaN(question.counter_maximum)) {
                                        prop.maxLength = parseInt(question.counter_maximum);
                                    }
                                    properties[question.id] = prop;


                                    var formObject = {key: question.id, type: supportedQuestions[question.type]};
                                    if(question.placeholder) {
                                        formObject.placeholder =  question.placeholder;
                                    }
                                    form.push(formObject);


                                    if(question.required) {
                                        required.push(question.id);
                                    }
                                });
                                form.push({type: "button", "style": "btn-info", title: "Close", onClick: "closeDialog()"});
                                $scope.schema.properties = properties;
                                $scope.schema.required = required;
                                $scope.form = form;
                                $scope.$broadcast('schemaFormValidate');
                                $scope.$broadcast('schemaFormRedraw');

                            }
                        },
                        function(response) {
                            console.log(response);
                            $scope.formSaved = true;
                            if(response.Error === 'review.submitted'){
                                console.log(response.Error);
                                //AlertService.alert('Survey has already been submitted.');
                                $scope.message = 'Survey has already being submitted';
                                $scope.isSurveyed = true;
                            }else{
                                AlertService.alert('Unable to load Survey');
                                $scope.message = 'Failed to load the survey';
                            }
                        });
                };
                init();
                $scope.form = [
                    "*",
                    {
                        type: "submit",
                        title: "Save"
                    }
                ];

                $scope.model = {};









            };
            $scope.tempname = null;

            $scope.test=function(template){
                $scope.tempname = template.id;

            }



            $scope.previewTemplate = function(){




                $scope.schema = {
                    type: "object",
                    properties: {},
                    required: []
                };
                $scope.isSurveyed = false;
                $scope.message = 'Thank you for submitting review';
                TemplateService.getQuestions($scope.tempname).then(function (data) {
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

            };












        }]);