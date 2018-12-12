(function () {
    'use strict';
    // this function is strict...
}());
angular.module('mod.m161')
    .controller('SurveyAssignmentsListCtrl', ['$scope', '$stateParams', '$state','UserService', '$mdDialog', 'CustomerService','$timeout', function($scope, $stateParams, $state, UserService, $mdDialog, CustomerService, $timeout){
        $scope.surveyId = $stateParams.id ;

      console.log($scope.surveyId);
        var init = function(){

            SurveyService.getSurveySchedules($scope.surveyId).then(function(data){
                $scope.reviews = data;
            });

        };
        init();

        $scope.showResponse = function (review) {
            review.survey.id = $scope.surveyId;
            SurveyService.setReviewRecord(review);
            $state.go('m161.showReviewResponse', {'id': review.id});
        };

       /* $scope.showEmployeeResponse = function (review) {
            review.survey.id = $scope.surveyId;
            SurveyService.setReviewRecord(review);
            $state.go('m161.showReviewResponse', {'id': review.id});
        };

*/


    }]);
