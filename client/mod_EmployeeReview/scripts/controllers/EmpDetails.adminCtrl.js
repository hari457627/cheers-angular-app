(function () {
    'use strict';
    // this function is strict...
}());
angular.module('mod.m161' )
    .controller('EmpDetailsCtrl', ['$scope', '$rootScope','$stateParams', '$state','UserService', '$mdDialog', 'SurveyService', 'CustomerService','$timeout', function($scope, $rootScope,$stateParams, $state, UserService, $mdDialog, SurveyService, CustomerService, $timeout){
        $scope.empId = $stateParams.id ;
        $scope.customers = [];
        $scope.employee = SurveyService.getEmpRecord($scope.empId);
        $scope.customer = {};
        $scope.isDatapresent =  false;
       /* $scope.customerId = $stateParams.customerId;

        $scope.customerDetails = function(id) {
            $scope.selectedCustomer = id;

            console.log($scope.selectedCustomer);





        };*/

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

        CustomerService.getAllCustomers().then(function(data) {
            $scope.customers = data;
            $scope.customer =  _.find($scope.customers, function(customer) {return $rootScope.selectedCustomer === customer.id;});

           console.log($scope.customer );

        });

        CustomerService.getSubmittedReviewsofEmployee($scope.empId).then(function(data) {
            $scope.submittedReviews = data;
            console.log(data);
        });

        CustomerService.getPendingReviewsofEmployee($scope.empId).then(function(data) {
            $scope.pendingReviews = data;
            console.log(data);
        });




        // $scope.customerDetails = function(id) {
        //     $scope.selectedCustomer = id;
        // };

        /*var init = function(){

            CustomerService.getAllCustomers().then(function(data) {
                $scope.customers = data;


                console.log($scope.customers);
                $scope.customers = data;
                $scope.customer =  _.find($scope.customers, function(customer) {return $scope.cId === customer.id;});

                console.log($scope.customer);

                /!* $scope.customer =  _.find($scope.customers, function(customer) {return $scope.selectedCustomer === customer.id;});
 *!/
                /!*

                 for (var k = 0, len = data.length; len > k; k++) {
                 var details = {};
                 details.name = data[k].name;
                 console.log(details.name);
                 }
                 *!/

                /!*$scope.customer.push(details);
                 console.log($scope.customer.name);*!/


            });


            // SurveyService.getReviewResponse($scope.reviewId).then(function(data){
            //     $scope.answers = data;
            //    // console.log($scope.answers);console.log('dsfgsdf');
            // });
        };

        init();*/
        $scope.backButton = function (review) {
            window.history.back();
        };

       /* $scope.a=[];
        CustomerService.getEmployeepiechart({
            "id": $scope.empId,
            "type": "pie_chart",
            "customer_id": $rootScope.selectedCustomer
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
















        CustomerService.getEmployeepiechart({
            "id":$scope.empId,
            "type": "pie_chart",
            "customer_id": $rootScope.selectedCustomer
        }).then(function(data) {
            console.log(data);
            // data[0].then(function (isData) {
            //     console.log(isData);
            // })
            // console.log(Array.isArray(data));
            $scope.tableData = data;
            console.log(data.length);

            if(data.length !== 0){
                $scope.isDatapresent =  true;
            }
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
            "id":$scope.empId,
            "type":"bar_chart",
            "customer_id": $rootScope.selectedCustomer
        }).then(function (data){
            $scope.empChart.type = "LineChart";
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
            $scope.empChart.options = {
                "isStacked": "true",
                "fill": 20,
                'height': 380,
                'interpolateNulls':true,
                "displayExactValues": true,
                'legend': {position: 'top'},
                "vAxis": {
                    "gridlines": {
                        "count": 10
                    }
                }
            };

        });
    }]);
