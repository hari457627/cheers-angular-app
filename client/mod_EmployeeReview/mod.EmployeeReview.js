angular.module('mod.m161', []);

angular.module('mod.m161')
  .constant('MOD_EmployeeReview', {
        API_URL: '',
        API_URL_DEV: ''
    })
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('m161', {
                url: '/EmployeeReview',
                parent: 'layout',
                template: "<div ui-view></div>",
                data: {
                    type: 'home'
                }
            })
            .state('m161.header', {
                url: '',
                template: "<div></div>",
                data: {
                    templateUrl: 'mod_EmployeeReview/views/menu/EmployeeReview.header.html',
                    position: 1,
                    type: 'header',
                    name: "Profile",
                    module: "EmployeeReview"
                }
            })


            .state('m161.admin', {
                url: '/admin',
                templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
                data: {
                    type: 'home',
                    menu: true,
                    admin: true,
                    disabled: false,
                    name: " Employee DashBoard",
                    module: "Reviews"
                }
            })

            
            .state('m161.Templates', {
                url: '/Templates',
                templateUrl: "mod_EmployeeReview/views/template_creation/Templates_List.html",
                data: {
                    type: 'home',
                    menu:true,
                    name: 'Templates',
                    module: "Settings"
                }
            })


            .state('m161.questions', {
                url: '/questions/createQuestions',
                templateUrl: "mod_EmployeeReview/views/template_creation/QuestionsList.html",
                data: {
                    type: 'home',
                    menu: true,
                    disabled : false,
                    module: "Settings",
                    name:"Questions"
                }
            })


            .state('m161.createTemplate', {
                url: '/createTemplate/',
                templateUrl: "mod_EmployeeReview/views/template_creation/CreateTemplate.html",
                controller:'TemplatesListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })

            .state('m161.Scratch', {
                url: '/Scratch/',
                templateUrl: "mod_EmployeeReview/views/template_creation/TemplateView.html",
                controller:'TemplatesListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })

            .state('m161.CreateQuestions', {
                url: '/CreateQuestions/',
                templateUrl: "mod_EmployeeReview/views/template_creation/app.questions.html",
                controller:'QuestionsListCtrl',
                data: {
                    type: 'home',
                    authenticate : true
                }
            })
            
            
            
            
            .state('m161.adminCustomer', {
                url: '/adminCustomer/:customerId',
                templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
                data: {
                    type: 'home',
                    menu: false,
                    admin: true,
                    disabled: false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                }
            })





            /*changed name to survey insted of dashboard*/
            .state('m161.dashboard', {
                url: '/surveys',
                templateUrl: "mod_EmployeeReview/views/dashboard/EmployeeReview.dashboard.html",
                data: {
                    type: 'home',
                    menu: true,
                    name: "My Surveys",
                    module: "Surveys"
                }

            })


        .state('m161.surveydashboards', {
            url: '/surveys/:id',
            templateUrl: "mod_EmployeeReview/views/dashboard/surveydashboard.html",
            data: {
                type: 'home',

            }
    })

            .state('m161.surveyAssign', {
            url: '/survey/:id/assign',
            templateUrl: "mod_EmployeeReview/views/surveys/assign.admin.html",
            data: {
                type: 'home',
                admin : true,
                disabled : false,
                name: "Admin Page",
                module: "EmployeeReview"
            }
            })
            .state('m161.surveySchedules', {
                url: '/survey/:id/schedules',
                templateUrl: "mod_EmployeeReview/views/surveys/schedules.admin.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                }
            })
            .state('m161.surveyAssignlist', {
                url: '/survey/:id/reviews',
                templateUrl: "mod_EmployeeReview/views/surveys/assignment.admin.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                }
            })
            .state('m161.showReviewResponse', {
                url: '/review/:id/response',
                templateUrl: "mod_EmployeeReview/views/review/response.admin.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                }
            })
            .state('m161.showEmpDetails', {
                url: '/employee/:id',
                templateUrl: "mod_EmployeeReview/views/employees/show.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                   // params:{'id':'1', 'cids':'1'},
                }
            })


            .state('m161.eventss', {
                url: '/surveysnew',
                templateUrl: "mod_EmployeeReview/views/surveys/eventSurvey.html",
                data: {
                    type: 'home',
                    menu: true,
                    name: "Create Survey",
                    module: "Surveys",

                    // params:{'id':'1', 'cids':'1'},
                }
            })

           /* .state('m161.dashboard', {
                url: '/surveys',
                templateUrl: "mod_EmployeeReview/views/dashboard/EmployeeReview.dashboard.html",
                data: {
                    type: 'home',
                    menu: true,
                    name: "My Surveys",
                    module: "Surveys"
                }

            })*/


           /* .state('m161.reviewcreation', {
                url: '/reviewcreation',
                templateUrl: "mod_EmployeeReview/views/surveys/reviewcreation.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                    // params:{'id':'1', 'cids':'1'},
                }
            })
*/




            .state('m161.sharelink', {
                url: '/sharelink',
                templateUrl: "mod_EmployeeReview/views/surveys/sharelink.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview",

                    // params:{'id':'1', 'cids':'1'},
                }
            })


            .state('m161.AssignSurvey', {
                url: '/survey/assign/:c_id',
                templateUrl: "mod_EmployeeReview/views/surveys/assignSurvey.html",
                data: {
                    type: 'home',
                    admin : true,
                    disabled : false,
                    name: "Admin Page",
                    module: "EmployeeReview"
                }
            });




            /*.state('m161.hacksurvey', {
                url: '/admin',
                templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
                data: {
                    type: 'home',
                    menu: true,
                    admin : true,
                    disabled : false,
                    name: "Dashboard",
                    module: "Public Service"
                }
            })

            .state('m161.hacksurveyone', {
                url: '/survey',
                templateUrl: "mod_EmployeeReview/views/bulk/bulksurvey.html",
                data: {
                    type: 'home',
                    menu: true,
                    admin : true,
                    disabled : false,
                    name: "Surveys",
                    module: "Public Service"
                }
            });*/

           /* //FOR APP ADMIN
           .state('m161.admin', {
               url: '/admin',
               templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
               data: {
                   type: 'home',
                   menu: true,
                   admin : true,
                   disabled : false,
                   name: "DashBoard",
                   module: "Wavelabs"
               }
           }).state('m161.adminCustomer', {
            url: '/adminCustomer/:customerId',
            templateUrl: "mod_EmployeeReview/views/admin/EmployeeReview.admin.html",
            data: {
                type: 'home',
                menu: false,
                admin : true,
                disabled : false,
                name: "Admin Page",
                module: "EmployeeReview"
            }
        });*/


    }]);
