(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('FormController',
        ['$scope', '$state', 'UserService', '$mdDialog', 'SurveyService', 'TemplateService', 'AlertService','$rootScope', function($scope, $state, UserService, $mdDialog, SurveyService, TemplateService, AlertService,$rootScope){
            console.log("Hello");
            $scope.message = "Hello from your module Dashboard";
            $scope.survey = {};
            $scope.surveys = [];
            $scope.templates = [];
            $scope.labelDisabled = true;
            $scope.labelDisabled1 = true;
            $scope.labelDisabled2 = true;
            $scope.labelDisabled3 = false;

            $scope.myTabIndex = 1;


            var init = function(){
                TemplateService.getAllTemplates().then(function (data){
                    $scope.templates = data;







                    /* $scope.template_name= null;
                     for (var i=0; i <= $scope.templates.length;i++){
                         $scope.template_name = $scope.templates[i].name;
                         console.log($scope.name);
                     }
                     console.log($scope.templates_name);*/
                });
                SurveyService.getAllSurveys().then(function(data){

                    $scope.surveys = data;

                    console.log($scope.surveys);

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
            $scope.linkshow = false;
            $rootScope.url=null;



            // $scope.previewed = function(){
            //     if ($scope.myTabIndex > 3){
            //         return true;
            //     }
            // };
            $scope.mymessage = "please select your template";
            $scope.mymessage1 = "";
            $scope.mymessage2 = "";
            $scope.mymessage3 = "";


            $scope.init = function(){
                SurveyService.getAllSurveys().then(function(data) {

                    $scope.surveys = data;


                });
            }

            $scope.fillfields= function(name) {
                console.log(name);
                $scope.mymessage1 = "";
                $scope.mymessage3 = " ";

                for (var i = 0; i < $scope.surveys.length; i++) {
                    if (name == $scope.surveys[i].name) {

                        $scope.mymessage3 = "Survey name exists";

                    }
                };
            };




            $scope.fillfields1= function(){

                $scope.mymessage2 = "";

            }

            $scope.tabindex = function (survey) {



                if (survey.template_id !=null) {

                    $scope.labelDisabled = false;
                    $scope.myTabIndex = $scope.myTabIndex + 1;

                }

                if (survey.name == null && $scope.myTabIndex === 2 ) {
                    $scope.mymessage1 = "Please fill the fields";

                }
                if (survey.description == null && $scope.myTabIndex === 2) {

                    $scope.mymessage2 = "Please fill the fields";

                }

                if (survey.name == null ||  survey.description == null && $scope.myTabIndex === 2) {
                    $scope.labelDisabled1 = true;

                }

                // if ($scope.myTabIndex === 2 && $scope.mymessage3 === "Survey name exists") {
                //     console.log($scope.mymessage3);
                //     $scope.labelDisabled1 = true;
                //
                // }

                if (survey.name != null && survey.description != null &&  $scope.mymessage3 == " ") {
                    $scope.labelDisabled1 = false;

                }



                if(survey.template_id != null && survey.name != null && survey.description !==null && $scope.myTabIndex == 3){
                    console.log($scope.myTabIndex);
                    $scope.labelDisabled3 = true;
                    $scope.labelDisabled = true;
                    $scope.labelDisabled2 = false;
                    $scope.labelDisabled1 = true;
                    $scope.surveydata = survey;
                    SurveyService.addEditSurvey($scope.surveydata).then(function(data) {
                        /* console.log("im in", data);*/

                        /*  $rootScope.urls=data.url;

                          console.log($rootScope.urls);*/

                        $scope.checkUsername = function(){
                            $http({
                                method: 'post',

                                data: {name:$scope.name}
                            }).then(function successCallback(response) {
                                $scope.unamestatus = response.name;
                                $scope.linkshow = true;
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

                        AlertService.alert("Survey Created Successfully");



                        $scope.textToCopy= data.url ;
                        SurveyService.seturlRecored($scope.textToCopy);



                        /*$scope.seturlRecored = function(abc) {
                            // review.survey.id = $scope.surveyId;




                            $state.go('m161.sharelink', {
                                'url':abc
                            });
                        };*/







                        /*$state.go('m161.sharelink', {'url':$scope.url});*/
                    });


                }


            }


















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
                        $scope.mymessage = "";
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

