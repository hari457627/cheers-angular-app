'use strict';

angular.module('mod.m161')
    .controller('QuestionsListCtrl',  ['$scope', '$state', '$stateParams', 'TemplateService','AlertService', '$mdDialog','$q','$timeout', function($scope, $state, $stateParams, TemplateService, AlertService, $mdDialog,$q,$timeout) {


        $scope.CreateQuestions = function(){
            $state.go('m161.CreateQuestions',{

            });
        };


        var init = function(){

            TemplateService.getQuests($scope.finaldata).then(function(data) {
                $scope.allQuestions = data;
                console.log($scope.allQuestions);
            });
        }
        init();










































    }]);
