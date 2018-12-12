'use strict';

/**
 * @ngdoc function
 * @name newappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Entire Application
 */

angular.module('app.config')
    .controller('AppCtrl', ['$scope', 'APP_CONFIG', '$location','$rootScope', function ($scope, APP_CONFIG, $location, $rootScope) {


        /**
         *    NBOS NOTE: ENVIRONMENT VARIABLE IS SET HERE
         */

        $scope.APP_ENV = document.getElementById('ENV').innerHTML.toUpperCase();
        $scope.APP_SUBDOMAIN = document.getElementById('subDomain').innerHTML;

        
        if($scope.APP_ENV.toLowerCase() === "prod"){
            APP_CONFIG.APP_ENV = "";
        } else {
            APP_CONFIG.APP_ENV = "_DEV";
        }

        window.onload = function() {
            window.dataLayer.push({
                event: 'ngRouteChange',
                attributes: {
                    route: $location.path()
                }
            });

        };

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            window.dataLayer.push({
                event: 'ngRouteChange',
                attributes: {
                    route: $location.path()
                }
            });

        });

    }]);
