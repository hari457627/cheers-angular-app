(function() {
    'use strict';
    // this function is strict...
}());

angular.module('mod.m161')
    .controller('EmployeeReviewAdminCtrl', ['$scope', '$state', '$stateParams', '$rootScope','CustomerService', 'SurveyService', function($scope, $state, $stateParams, $rootScope,CustomerService, SurveyService) {
        $scope.customers = [];
        $scope.employees = [];
        $scope.customerId = $stateParams.customerId;
        $scope.customer = {};
        $scope.isDatapresent =  false;
        var dates;


        $scope.tableHeadings = ["Excellent","Good","Satisfactory","Unsatisfactory","Can't rate"]
        $scope.sampleData = [
            {
                "_id":"5ac47cc83b517000013deeac",
                "total_count":17,
                "question_title":"Quality of the work delivered.",
                "created_at":"2018-04-04T07:20:40.695Z",
                "answers":[
                    {
                        "text":"Excellent",
                        "count":9,
                        "percentage":"52.94%"
                    },
                    {
                        "text":"Satisfactory",
                        "count":1,
                        "percentage":"5.882%"
                    },
                    {
                        "text":"Good",
                        "count":7,
                        "percentage":"41.17%"
                    }
                ]
            },
            {
                "_id":"5ac47db23b517000013deeb1",
                "total_count":17,
                "question_title":"Consistency in Delivery.",
                "created_at":"2018-04-04T07:24:34.526Z",
                "answers":[
                    {
                        "text":"Good",
                        "count":7,
                        "percentage":"41.17%"
                    },
                    {
                        "text":"Excellent",
                        "count":10,
                        "percentage":"58.82%"
                    }
                ]
            },
            {
                "_id":"5ac47e243b517000013deeb7",
                "total_count":17,
                "question_title":"Status Reporting / Ontime communication.",
                "created_at":"2018-04-04T07:26:28.582Z",
                "answers":[
                    {
                        "text":"Satisfactory",
                        "count":1,
                        "percentage":"5.882%"
                    },
                    {
                        "text":"Good",
                        "count":6,
                        "percentage":"35.29%"
                    },
                    {
                        "text":"Excellent",
                        "count":10,
                        "percentage":"58.82%"
                    }
                ]
            },
            {
                "_id":"5ac47e5d3b517000013deebd",
                "total_count":17,
                "question_title":"Takes initiative and bring's in new ideas.",
                "created_at":"2018-04-04T07:27:25.287Z",
                "answers":[
                    {
                        "text":"Excellent",
                        "count":7,
                        "percentage":"41.17%"
                    },
                    {
                        "text":"Good",
                        "count":6,
                        "percentage":"35.29%"
                    },
                    {
                        "text":"Satifactory",
                        "count":4,
                        "percentage":"23.52%"
                    }
                ]
            },
            {
                "_id":"5ac47ef03b517000013deec3",
                "total_count":17,
                "question_title":"Adaptability to learn new technologies.",
                "created_at":"2018-04-04T07:29:52.454Z",
                "answers":[
                    {
                        "text":"Excellent",
                        "count":9,
                        "percentage":"52.94%"
                    },
                    {
                        "text":"Satisfactory",
                        "count":1,
                        "percentage":"5.882%"
                    },
                    {
                        "text":"Good",
                        "count":7,
                        "percentage":"41.17%"
                    }
                ]
            },
            {
                "_id":"5ac47f6e3b517000013deec9",
                "total_count":17,
                "question_title":"Takes the ownership of the delivery.",
                "created_at":"2018-04-04T07:31:58.445Z",
                "answers":[
                    {
                        "text":"Good",
                        "count":8,
                        "percentage":"47.05%"
                    },
                    {
                        "text":"Excellent",
                        "count":8,
                        "percentage":"47.05%"
                    },
                    {
                        "text":"Satisfactory",
                        "count":1,
                        "percentage":"5.882%"
                    }
                ]
            },
            {
                "_id":"5ac47fbb3b517000013deecf",
                "total_count":17,
                "question_title":"Availability / Approachability.",
                "created_at":"2018-04-04T07:33:15.812Z",
                "answers":[
                    {
                        "text":"Excellent",
                        "count":12,
                        "percentage":"70.58%"
                    },
                    {
                        "text":"Good",
                        "count":5,
                        "percentage":"29.41%"
                    }
                ]
            },
            {
                "_id":"5ac7859b06a4db00016b9f55",
                "total_count":17,
                "question_title":"Assists / Guides the team for effective delivery.",
                "created_at":"2018-04-06T14:35:07.731Z",
                "answers":[
                    {
                        "text":"Satisfactory",
                        "count":1,
                        "percentage":"5.882%"
                    },
                    {
                        "text":"Can't rate",
                        "count":1,
                        "percentage":"5.882%"
                    },
                    {
                        "text":"Excellent",
                        "count":4,
                        "percentage":"23.52%"
                    },
                    {
                        "text":"Good",
                        "count":11,
                        "percentage":"64.70%"
                    }
                ]
            }
        ];

        console.log($scope.sampleData);

        $scope.customerDetails = function(id) {
            $rootScope.selectedCustomer = id;
            CustomerService.getSubmittedReviews($rootScope.selectedCustomer).then(function(data) {
                $scope.submittedReviews = data;
               /* console.log("%%%%%%%%%%%%%%%%");
               console.log($scope.submittedReviews);

                console.log(Object.keys($scope.submittedReviews).length);*/
/*console.log($scope.submittedReviews.length);*/

               /* var results = [];
                results.headers = headers();*/
               /* var selectedCount = ($scope.submittedReviews, { name: true }).length;

                console.log(selectedCount);*/

            });





            CustomerService.getPendingReviews($rootScope.selectedCustomer).then(function(data) {
                $scope.pendingReviews = data;
                console.log(Object.keys($scope.pendingReviews).length);
                console.log($scope.pendingReviews.length);
          /*     console.log(data.headers('Content-Pagination'));*/

                // console.log($scope.pendingReviews);
            });
            CustomerService.getAllEmployees($rootScope.selectedCustomer).then(function(data) {
                $scope.customerEmployees = data;
               // console.log("%%%%%%%%%%%%%%%%");
                console.log($scope.customerEmployees);
            });
            CustomerService.getpiechart({
                "id": $scope.selectedCustomer,
                "type": "pie_chart"
            }).then(function(data) {
                var parsed_object = {};
                $scope.total = 0;
                var a = [];
                console.log(data);
                _.each(data, function(value, indx) {
                    var cData = [];


                    _.each(value.answers, function(answer) {


                        $scope.total = $scope.total + 1;

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
                    chart_obj.options ={

                        pieHole:0.6,
                        colors: ['#0E86D4', '#B7CFDC', '#6AABD2', '#385E72','#64B5F6','#42A5F5'],
                        fontSize:11.5,
                        pieSliceTextStyle:
                            {color:'#fff'
                            },
                        backgroundColor:'transparent',

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

            });
           /* $scope.a=[];
            CustomerService.getpiechart({
                "id": $rootScope.selectedCustomer,
                "type": "pie_chart"
            }).then(function(data) {
                $scope.pData = [];
                $scope.n=0;
                _.each(data, function(value, indx) {
                    $scope.pFirst=[];
                    _.each(value.answers, function(answer) {
                        $scope.pCol = [];
                        $scope.pCol.push(answer.text, answer.percentage);
                        $scope.pFirst.push($scope.pCol);
                    });
                    $scope.a.push(value.question_title);
                    $scope.pData.push($scope.pFirst);
                });
                $scope.data=$scope.pData;
                console.log($scope.data);
            });*/

        };


        /*$scope.showResponse = function(review) {
            // review.survey.id = $scope.surveyId;
            SurveyService.setReviewRecord(review);
            console.log("*************");
            console.log(review);
            $state.go('m161.showReviewResponse', {
                'id': review.id

            });

        };
*/

        $scope.showEmpDetails = function(emp) {
            // review.survey.id = $scope.surveyId;
            console.log(emp);
            SurveyService.setEmpRecord(emp);

            $state.go('m161.showEmpDetails', {
                'id': emp.id
            });
        };




        $scope.assignSurveyToEmployees = function() {
            $state.go('m161.AssignSurvey',{'c_id':$scope.customerId});
        };




                $scope.addToSelectedEmployees = function (emp) {
                SurveyService.addToSelectedEmployeesList(emp);
                    $scope.reviewees = SurveyService.getSelectedEmployeesList();
                };

        CustomerService.getAllEmployeesData().then(function(data) {
            $scope.employeesData = data;
        });
        var init = function() {
            CustomerService.getAllCustomers().then(function(data) {
                $scope.customers = data;
                $scope.customer =  _.find($scope.customers, function(customer) {return $rootScope.selectedCustomer === customer.id;});

/*
                for (var k = 0, len = data.length; len > k; k++) {
                    var details = {};
                    details.name = data[k].name;
                    console.log(details.name);
                }
*/
                /*$scope.customer.push(details);
                console.log($scope.customer.name);*/


            });
            if (window.localStorage) {
                window.localStorage.setItem('selectedEmployees', angular.toJson([]));
            }
            if ($scope.customerId) {
                $scope.customerDetails($scope.customerId);
            } else {
                $rootScope.selectedCustomer= null;
                CustomerService.getAllEmployeesdata().then(function(data) {
                    $scope.customerEmployees = data;
                });
                CustomerService.getAllSubmittedReviews().then(function(data) {
                    $scope.submittedReviews = data;


                });
                CustomerService.getAllPendingReviews().then(function(data) {
                    $scope.pendingReviews = data;

                });



                CustomerService.getAllPieCharts({
                    "type": "pie_chart",

                }).then(function(data) {
                    var parsed_object = {};
                    var a = [];
                    console.log(data);

                    $scope.tableData = data;
                    if(data.length !==0 ){
                        $scope.isDatapresent =  true;
                    }

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
                        chart_obj.options ={

                            pieHole:0.6,
                            colors: ['#0E86D4', '#B7CFDC', '#6AABD2', '#385E72','#64B5F6','42A5F5'],
                            fontSize:11.5,
                            pieSliceTextStyle:
                                {color:'#fff'
                                },
                            backgroundColor:'transparent',

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
                                type: "string",

                            }, {
                                id: "s",
                                label: "Slices",
                                type: "number",

                            }],
                            "rows": cData
                        };
                        chart_obj.title = value.question_title;

                        a.push(chart_obj);
                    });
                    $scope.myChartObject = a;
                    console.log($scope.myChartObject);
                });
                   /* $scope.a=[];

                CustomerService.getAllPieCharts({
                    "type": "pie_chart"
                }).then(function(data) {
                    $scope.pData = [];
                    $scope.n=0;
                    _.each(data, function(value, indx) {

                        $scope.pFirst=[];
                        _.each(value.answers, function(answer) {
                            $scope.pCol = [];
                            $scope.pCol.push(answer.text, answer.percentage);
                            $scope.pFirst.push($scope.pCol);

                        });
                        $scope.a.push(value.question_title);

                         $scope.pData.push($scope.pFirst);
                    });
                    $scope.data=$scope.pData;
                    console.log($scope.data);
                });
*/
            }
        };
        init();
    }]);




angular.module('mod.m161').directive('qnPiechart', [
    function() {
        return {
            require: '?ngModel',
            link: function(scope, element, attr, controller) {
                var settings = {
                    is3D: true
                };
                var getOptions = function() {
                    return angular.extend({ }, settings, scope.$eval(attr.qnPiechart));
                };
                // creates instance of datatable and adds columns from settings
                var getDataTable = function() {
                    var columns = scope.$eval(attr.qnColumns);
                    var data = new google.visualization.DataTable();
                    angular.forEach(columns, function(column) {
                        data.addColumn(column.type, column.name);
                    });
                    return data;
                };
                var init = function() {
                    var options = getOptions();
                    if (controller) {
                        var drawChart = function() {
                            var data = getDataTable();
                            // set model
                            data.addRows(controller.$viewValue);
                            // Instantiate and draw our chart, passing in some options.
                            var pie = new google.visualization.PieChart(element[0]);
                            pie.draw(data, options);
                        };
                        controller.$render = function() {
                            drawChart();
                        };
                    }
                    if (controller) {
                        // Force a render to override
                        controller.$render();
                    }
                };
                // Watch for changes to the directives options
                scope.$watch(getOptions, init, true);
                scope.$watch(getDataTable, init, true);
            }
        };
    }
]);

