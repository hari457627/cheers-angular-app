'use strict';

angular.module('app.config', [
    'app.layout',
    'app.theme'
]);


angular.module('app.config')
    .value('APP_CONFIG', {})
    .value('APP_ENV', {})
    .constant('APP_CONSTANTS', {
        API_URL: 'http://api.qa1.nbos.io/',
        API_URL_DEV: 'http://api.qa1.nbos.io/',
        TENANT_ID: '',
        GRANT_TYPE: 'client_credentials',
        SCOPE: '',
        APP_SESSION_KEY: 'THIS_SHOULD_BE_RANDOM_GENERATED_',
        APP_LOGO : '',
        APP_BANNER:'',
        REVIEW_API_URL:'http://10.9.8.179:3000/',
        QUESTIONER_API_URL:'http://10.9.8.179:3011/',
        DRUPAL_API_URL:'http://10.9.8.186/'
    })
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "app_config/firstPage/firstPage.html",
                controller: 'FirstPageCtrl',
                data: {
                    type: 'login',
                    authenticate: false
                }
            })
            .state('review', {
                url: '/review/:id',
                templateUrl: "mod_EmployeeReview/views/review/survey.html",
                controller: 'ReviewDisplayCtrl'
            })
            .state('survey', {
                url: '/s/:id',
                templateUrl: "mod_EmployeeReview/views/surveys/survey_form.html",
                controller: 'SurveyFormCtrl'
            });
    }]);


angular.module('clientApp')
    .constant('CLIENT_CONFIG',{
        CLIENT_ID: 'c945b4e8-bafb-4b30-a707-612716337485',
        CLIENT_SECRET: 'simplycheer-secret',
        CLIENT_DOMAIN : 'http://localhost:9001'
    })
