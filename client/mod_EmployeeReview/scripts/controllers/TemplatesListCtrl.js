'use strict';

angular.module('mod.m161')
    .controller('TemplatesListCtrl',  ['$scope', '$state', '$stateParams', 'TemplateService','AlertService', '$mdDialog','$q','$timeout', function($scope, $state, $stateParams, TemplateService, AlertService, $mdDialog,$q,$timeout) {


        $scope.scratch = function(){
            $state.go('m161.Scratch',{

            });
        };



        $scope.createTemplate = function(){
            $state.go('m161.createTemplate',{

            });
        };



        var init = function(){

            TemplateService.getTemplates($scope.finaldata).then(function(data) {



                $scope.allTemplates = data;



            });


        };
        init();










































    }]);
