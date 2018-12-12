(function () {
    'use strict';
    // this function is strict...
}());
angular.module('mod.m161')
    .controller('SurveyDashboardctrl', ['$scope', '$stateParams', '$state','UserService', '$mdDialog', 'CustomerService','$timeout','SurveyService','TemplateService' ,function($scope, $stateParams, $state, UserService, $mdDialog, CustomerService, $timeout,SurveyService,TemplateService) {


        $scope.isEmpty = false;
        $scope.abcd = SurveyService.getsurveyid();

        $scope.sur_name = $scope.abcd.name;
        $scope.sur_desc = $scope.abcd.desc;
        $scope.template_id = $scope.abcd.template_ids;
        $scope.myTabIndex = $scope.abcd.tabIndex;

        $scope.myTabIndex=$scope.abcd.tabindex;

        $scope.share_url = $scope.abcd.urldata;


        $scope.textToCopy = $scope.share_url;


        // CustomerService.getSurveyUsers( $scope.abcd.abc).then(function(data) {
        //
        //     console.log(data);
        //    $scope.surveyusers = data;
        //     $scope.surveyusers_length =  $scope.surveyusers.length;
        //
        // });

        $scope.is_disabled = false;
        if($scope.myTabIndex > 0){
            $scope.is_disabled = true;
        }





        CustomerService.getSurveyPieChart({
            "id": $scope.abcd.abc

        }).then(function (data) {

            var parsed_object = {};
            var a = [];
            _.each(data, function (value, indx) {
                var cData = [];
                _.each(value.answers, function (answer) {
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
                chart_obj.options = {

                    pieHole: 0.6,
                    colors: ['#0E86D4', '#B7CFDC', '#6AABD2', '#385E72', '#64B5F6', '42A5F5'],
                    fontSize: 11.5,
                    pieSliceTextStyle:
                        {
                            color: '#fff'
                        },
                    backgroundColor: 'transparent',

                    chartArea: {
                        left: "3%",
                        top: "10%",
                        height: "380px",
                        width: "94%",
                        pieSliceTextStyle: {
                            fontSize: 5
                        }
                    }

                    /*legend : {
                        position: 'labeled',
                        labeledValueText: 'both',
                        maxLines : '10',
                        textStyle: {
                            color: 'black',
                            fontSize: 15,
                        }
                    },*/


                };
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
            if ($scope.myChartObject.length === 0) {
                $scope.isEmpty = true;
            }

        });
        $scope.previewTemplate = function () {
            $scope.schema = {
                type: "object",
                properties: {},
                required: []
            };
            TemplateService.getQuestions($scope.template_id).then(function (data) {

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
            });
        };
        var init = function() {
            $scope.previewTemplate();
        };
        init();


    }]);
