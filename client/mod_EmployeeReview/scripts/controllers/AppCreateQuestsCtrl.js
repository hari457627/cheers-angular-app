'use strict';

angular.module('mod.m161')
    .controller('AppCreateQuestsCtrl',  ['$scope', '$state', '$stateParams', 'TemplateService','AlertService', '$mdDialog','$q','$timeout', function($scope, $state, $stateParams, TemplateService, AlertService, $mdDialog,$q,$timeout) {

        var init = function(){
            TemplateService.getTags().then(function(data) {
                $scope.allTags = data.tags;
            });
        }
        init();

        $scope.minusdisabled = false;
        $scope.plusdisabled = false;
        if ($scope.weightage === 0){
            $scope.minusdisabled = true;
        }
        if ($scope.weightage === 4){
            $scope.plusdisabled = true;
        }


        $scope.weightage = 0;
        $scope.incrementweightage = function () {
            $scope.weightage = $scope.weightage + 1;
        }
        $scope.decrementweightage = function () {
            $scope.weightage = $scope.weightage - 1;
        }

        $scope.weightage1 = 0;
        $scope.incrementweightage1 = function () {
            $scope.weightage1 = $scope.weightage1 + 1;
        }
        $scope.decrementweightage1 = function () {
            $scope.weightage1 = $scope.weightage1 - 1;
        }

        $scope.weightage2 = 0;
        $scope.incrementweightage2 = function () {
            $scope.weightage2 = $scope.weightage2 + 1;
        }
        $scope.decrementweightage2 = function () {
            $scope.weightage2 = $scope.weightage2 - 1;
        }

        $scope.weightage3 = 0;
        $scope.incrementweightage3 = function () {
            $scope.weightage3 = $scope.weightage3 + 1;
        }
        $scope.decrementweightage3 = function () {
            $scope.weightage3 = $scope.weightage3 - 1;
        }

        $scope.weightage4 = 0;
        $scope.incrementweightage4 = function () {
            $scope.weightage4 = $scope.weightage4 + 1;
        }
        $scope.decrementweightage4 = function () {
            $scope.weightage4 = $scope.weightage4 - 1;
        }

        $scope.createquestionlist = function(createQuest,weightage,weightage1,weightage2,weightage3,weightage4){
            $scope.submitted = true;
            $scope.finaldata = {};
            $scope.finaldata.tags = [];
            if(createQuest.questiontype==='radios'){

                $scope.finaldata.options = [];

                if(weightage !==0){
                    createQuest.weightage = weightage;
                    $scope.finaldata.options.push({"text":createQuest.option1,"weightage":createQuest.weightage});
                }

                if(weightage1 !==0){
                    createQuest.weightage1 = weightage1;
                    $scope.finaldata.options.push({"text":createQuest.option2,"weightage":createQuest.weightage1});
                }

                if(weightage2 !==0){
                    createQuest.weightage2 = weightage2;
                    $scope.finaldata.options.push({"text":createQuest.option3,"weightage":createQuest.weightage2});
                }

                if(weightage3 !==0){
                    createQuest.weightage3 = weightage3;
                    $scope.finaldata.options.push({"text":createQuest.option4,"weightage":createQuest.weightage3});
                }

                if(weightage4 !==0){
                    createQuest.weightage4 = weightage4;
                    $scope.finaldata.options.push({"text":createQuest.option5,"weightage":createQuest.weightage4});
                }

            }

            $scope.finaldata.title = createQuest.question;
            $scope.finaldata.type =  createQuest.questiontype;
            $scope.finaldata.tags.push(createQuest.tags);
            console.log($scope.finaldata);

            TemplateService.createQuests($scope.finaldata).then(function(data) {
                
                if(data.hasOwnProperty('errors')){
                    AlertService.alert("oops!, there is an error on creating question");
                    
                }
                else{
                    AlertService.alert("Question Created Successfully");
                    $state.go('m161.questions');
                }
            });
        }













































    }]);
