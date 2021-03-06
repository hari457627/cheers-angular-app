(function () {
    'use strict';
    // this function is strict...
}());


angular.module('mod.m163', ['ngSanitize'])
    .controller('ReviewDisplayCtrl', ['$scope', '$stateParams' ,'UserService', '$mdDialog', 'TemplateService', '$timeout', 'AlertService','SurveyService', function($scope, $stateParams, UserService, $mdDialog, TemplateService, $timeout, AlertService,SurveyService ){

        /*$scope.schema = {

            type: "object",
            properties: {
                accountability: {
                    title: "Owns Accountability of tasks till Delivered",
                    type: "string",
                    enum: [
                        "Yes",
                        "PartiallyYes",
                        "No"
                    ]
                },
                level: {
                    type: "string",
                    title: 'What level is the resource performing at?',
                    enum: ['Jr Developer','Developer','Sr. Developer','Lead','Architect']
                },
                performance: {
                    type: "string",
                    title: 'What  is the performance at that level',
                    enum: ['Not meeting Expectations','Meeting Expectations','Exceeding Expectations','Consistently Expectations']
                },

                improvement: {
                    title: "Areas of improvement",

                    type: "string"
                }
            }
        };
        $scope.form = [
            {
                key:"level",
                type:"radios-inline"
            },
            {
                key:"performance",
                type:"radios"
            },
            {
                key: "accountability",
                type:"radios-inline"
            },
            {
                key:"improvement",
                type:"textarea"
            },
            {
                type: "button",
                title: "Save",
                onClick: "processSurvey()"
            }

        ];*/
        $scope.formSaved = false;
        $scope.form = [];
        $scope.model = {};

        $scope.schema = {
            type: "object",
            properties: {},
            required:[]
        };
        $scope.reviewId = $stateParams.id ;
        $scope.isSurveyed = false;
        $scope.reviewee_name = '';
        $scope.reviewer_name = '';
        $scope.message = 'Thank you for submitting review';
        var init = function(){

            TemplateService.getReview($scope.reviewId).then(function (data){
                $scope.review = data;
                $scope.reviewee_name = data.reviewee_name;
                $scope.reviewer_name =  data.reviewer_name;
                if(data.survey && data.survey.questions) {
                    var questions = data.survey.questions;
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

                    /* code for like and dislike

                   /* form.push({type: "button", "style": "btn-default glyphicon glyphicon-thumbs-up thumbs-up", onClick:"sayYes()", disabled: true},{type: "button", "style": "btn-default glyphicon glyphicon-thumbs-down thumbs-down", onClick: "sayNo()"});
                    /!*form.push({type: "button", "style": "btn-danger", title: "Dislike", onClick: "sayNo()"});*!/*/

                     /*form.push({type: "button", "style": "btn-danger", title: "Dislike", onClick: "sayNo()"});*/

                    form.push({type: "submit", "style": "btn-info", title: "Submit", onClick: "processSurvey()"});

                    $scope.schema.properties = properties;
                    $scope.schema.required = required;
                    $scope.form = form;
                    $scope.$broadcast('schemaFormValidate');
                    $scope.$broadcast('schemaFormRedraw');
                }
            },
            function(response) {
                $scope.formSaved = true;
                if(response.data.errors[0].messageCode === 'review.submitted'){
                    //AlertService.alert('Survey has already been submitted.');
                    $scope.message = 'Survey has already being submitted';
                    $scope.isSurveyed = true;
                }else{
                    AlertService.alert('Unable to load Survey');
                    $scope.message = 'Failed to load the survey';
                }
            });
        };




        /*
        Code for onclick of like and dislike



        $scope.sayYes = function() {
           // AlertService.alert('Unable to load Survey');
            $scope.like=true;
            angular.element(document.querySelector(".thumbs-up")).removeClass("btn-default").addClass("btn-success");
            angular.element(document.querySelector(".thumbs-down")).removeClass("btn-success").addClass("btn-default");
        };
        $scope.sayNo = function() {
            $scope.like=false;
            angular.element(document.querySelector(".thumbs-down")).removeClass("btn-default").addClass("btn-success");
            angular.element(document.querySelector(".thumbs-up")).removeClass("btn-success").addClass("btn-default");


        };





        /*};*/

        init();
        $scope.submitForm = function(myform){
            $scope.$broadcast('schemaFormValidate');
            if(myform.$valid) {
                var formData = {
                    answers: [],
                    id: $scope.reviewId
                };
                _.each($scope.model, function(value, key, object){

                    formData.answers.push({question_title: $scope.schema.properties[key].title,text:value, question_id:key});

                });

              /* formData.answers.push({question_title: 'like',text:$scope.like, question_key:'like'});*/

                TemplateService.postReview(formData).then(function (data) {
                    //AlertService.alert('Thank for filling survey');
                    $scope.formSaved = true;

                });
            }
        };
    }]);
