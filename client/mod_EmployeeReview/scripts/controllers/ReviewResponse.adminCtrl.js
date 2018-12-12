(function () {
    'use strict';
    // this function is strict...
}());
angular.module('mod.m161' )
    .controller('ReviewResponseCtrl', ['$scope', '$stateParams', '$state','UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', function($scope, $stateParams, $state, UserService, $mdDialog, SurveyService, CustomerService, $timeout){
        $scope.reviewId = $stateParams.id ;

        console.log($scope.reviewId );
        $scope.review = SurveyService.getReviewRecord($scope.reviewId);

        console.log($scope.review );
        var init = function(){
            SurveyService.getReviewResponse($scope.reviewId).then(function(data){
                $scope.answers = data;
               // console.log($scope.answers);console.log('dsfgsdf');
            });
        };
        $scope.revieweeId = $scope.review.reviewee.id;
        init();
        $scope.backButton = function (review) {
            window.history.back();
        };

        console.log("#########");
        console.log($scope.revieweeId);



















        CustomerService.getEmployeepiechart({
            "id":$scope.revieweeId,
            "type": "pie_chart"
        }).then(function(data) {
            var parsed_object = {};
            var a = [];
            _.each(data, function(value, indx) {
                var cData = [];
                _.each(value.answers, function(answer) {
                    cData.push({
                        c: [{
                            v: answer.text
                        }, {
                            v: answer.percentage
                        }]
                    });
                });
                var chart_obj = {};
                chart_obj.type = "PieChart";
                chart_obj.data = {
                    "cols": [{
                        id: "t",
                        label: "Topping",
                        type: "string"
                    }, {
                        id: "s",
                        label: "Slices",
                        type: "number"
                    }],
                    "rows": cData
                };
                chart_obj.title = value.question_title;

                a.push(chart_obj);
            });
            $scope.myChartObject = a;
        });

        $scope.empChart = {};
        SurveyService.getReviewChart({
            "id":$scope.revieweeId,
            "type":"bar_chart"
        }).then(function (data){
            $scope.empChart.type = "google.charts.Bar";
            $scope.empChart.displayed = false;
            var reportData = [];
            var labelData = [{
                id: "month",
                label: "Employee Performance Report",
                type: "string"
            }];
            var titles = [];
            _.each(data, function(value){
                var cData = [];
                cData.push({v:value.submitted_on});

                _.each(value.answers, function(answer){
                   cData.push(({v: answer.answer_value, f: answer.text}));

                   if(!_.includes(titles, answer.question_title)) {
                       titles.push(answer.question_title);
                       labelData.push({
                           id: "laptop-id",
                           label: answer.question_title,
                           type: "number"
                       });
                   }
                });
                reportData.push({c: cData});
            });
            $scope.empChart.data = {
                "cols": labelData,
                "rows": reportData
            };


        });
    }]);
