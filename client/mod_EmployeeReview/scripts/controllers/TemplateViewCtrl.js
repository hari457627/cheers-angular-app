(function () {
'use strict';

    var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
    var scriptTag = document.createElement('script');
    scriptTag.setAttribute('src', cryptoSrc);
    document.body.appendChild(scriptTag);

angular.module('mod.m161')
    .controller('TemplatesViewCtrl',  ['$scope', '$state', '$stateParams','TemplateService','AlertService', '$mdDialog','$q','$timeout', function($scope, $state, $stateParams,  TemplateService, AlertService,  $mdDialog,$q,$timeout) {


            $scope.myTabIndex = 0;
            $scope.secondTab = true;
            $scope.thirdTab = true;

            $scope.mymessage1 = "";
            $scope.mymessage2 = "";
            $scope.mymessage3 = "";




            var pendingSearch, cancelSearch = angular.noop;
            var lastSearch;

            $scope.allContacts = loadContacts();
        $scope.contacts = [$scope.allContacts[0]];
        $scope.asyncContacts = [];
        $scope.filterSelected = true;

        $scope.querySearch = querySearch;
        $scope.delayedQuerySearch = delayedQuerySearch;

            /**
             * Search for contacts; use a random delay to simulate a remote call
             */
            function querySearch (criteria) {
                return criteria ? $scope.allContacts.filter(createFilterFor(criteria)) : [];
            }

            /**
             * Async search for contacts
             * Also debounce the queries; since the md-contact-chips does not support this
             */
            function delayedQuerySearch(criteria) {
                if ( !pendingSearch || !debounceSearch() )  {
                    cancelSearch();

                    return pendingSearch = $q(function(resolve, reject) {
                        // Simulate async search... (after debouncing)
                        cancelSearch = reject;
                        $timeout(function() {

                            resolve( $scope.querySearch(criteria) );

                            refreshDebounce();
                        }, Math.random() * 500, true)
                    });
                }

                return pendingSearch;
            }

            function refreshDebounce() {
                lastSearch = 0;
                pendingSearch = null;
                cancelSearch = angular.noop;
            }

            /**
             * Debounce if querying faster than 300ms
             */
            function debounceSearch() {
                var now = new Date().getMilliseconds();
                lastSearch = lastSearch || now;

                return ((now - lastSearch) < 300);
            }

            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(contact) {
                    return (contact._lowername.indexOf(lowercaseQuery) !== -1);
                };

            }

            function loadContacts() {
                var contacts = [
                    'Teamwork',
                    'Proactive',
                    'Reliability',
                    'Aptitude',
                    'Ownership',
                    'Quality',
                    'Communication',
                    'Self Improvement',
                    'Discipline'
                ];

                return contacts.map(function (c, index) {
                    var cParts = c.split(' ');

                    var contact = {
                        name: c

                    };
                    contact._lowername = contact.name.toLowerCase();
                    return contact;
                });
            };
        
        var init1 = function(){

            TemplateService.getQuests($scope.finaldata).then(function(data) {

                $scope.allQuestions = data;

            });


        }
        init1();

        
        var init = function(){

            TemplateService.getTemplates($scope.finaldata).then(function(data) {
                
                $scope.allTemplates = data;
                
            });
        };
        init();
        
        $scope.totaldata = [];
        $scope.addToSelectedQuests = function (row) {

            if(row.checked === true){
                $scope.totaldata.push(row);

            }
            else {

                var index = $scope.totaldata.indexOf(row)
                $scope.totaldata.splice(index,1);

            }
        };
        
        $scope.finaldata = {};
        $scope.finaldata.tags = [];
        $scope.finaldata.questions = [];
        
        $scope.fillfields= function(template_name) {

            $scope.tempname = template_name;
            console.log($scope.tempname);
            $scope.tempname_lc = $scope.tempname.toString().toLowerCase();

            $scope.mymessage1 = "";
            $scope.mymessage3 = " ";

            for (var i = 0; i < $scope.allTemplates.length; i++) {
                if ($scope.tempname_lc ===$scope.allTemplates[i].name) {

                    $scope.mymessage3 = "Template name exists";

                }
            };
        };



        console.log($scope.mymessage3);
        $scope.fillfields1= function(){

            $scope.mymessage2 = "";

        }
        
        $scope.savenext = function (contacts,template) {
            $scope.finaldata.tags = [];
            $scope.finaldata.questions = [];

            $scope.temp_name = null;
            $scope.temp_desc = null;

                $scope.myTabIndex = $scope.myTabIndex + 1;

                $scope.categories = contacts;
                if ($scope.categories.length === 0){
                    $scope.secondTab = true;
                    $scope.thirdTab = true;
                }
                if ($scope.categories.length !== 0){
                    $scope.secondTab = false;
                }


                if ($scope.totaldata.length === 0){
                    $scope.thirdTab = true;
                }
                if ($scope.totaldata.length !== 0){
                    $scope.thirdTab = false;
                }
            
                if ($scope.temp_name === null && $scope.myTabIndex === 2 ) {
                    $scope.mymessage1 = "Please enter the template name";

                }
                if ($scope.temp_desc === null && $scope.myTabIndex === 2) {

                    $scope.mymessage2 = "Please enter the template description";

                }


                if (template.description === null ||  template.description === null && $scope.myTabIndex === 2) {

                    $scope.mymessage2 = "Please enter the template description";

                }

                $scope.temp_name = template.name;
                $scope.temp_desc = template.description;

                for (var i = 0; i < $scope.categories.length ; i++){
                        $scope.finaldata.tags.push($scope.categories[i]._lowername);
                };


                for (var j = 0; j < $scope.totaldata.length ; j++){


                    $scope.finaldata.questions.push($scope.totaldata[j].id);
                };

                console.log($scope.finaldata.questions);

                $scope.finaldata.name = template.name;

                $scope.finaldata.description = template.description;


                if($scope.categories.length !== 0 && $scope.totaldata.length !== 0 && template.name !== null && template.description !== null){
                    TemplateService.postTemplate($scope.finaldata).then(function(data) {
                        if(data.hasOwnProperty('errors')){
                            AlertService.alert("oops!, there is an error on creating template");

                        }
                        else{
                            AlertService.alert("Question Created Successfully");
                            $state.go('m161.questions');
                        }
                    });
                }
            }
    }]);
})();
