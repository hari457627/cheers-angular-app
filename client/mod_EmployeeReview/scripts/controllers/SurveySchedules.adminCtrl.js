(function () {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('SurveySchedulesCtrl', ['$scope', '$stateParams' ,'UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', function($scope, $stateParams, UserService, $mdDialog, SurveyService, CustomerService, $timeout){
        $scope.surveyId = $stateParams.id ;
        var init = function(){
            SurveyService.getSurveySchedule($scope.surveyId).then(function (data){
                $scope.surveyList = data;
            });
        };
        init();




    }]);