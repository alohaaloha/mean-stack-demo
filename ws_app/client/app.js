'use strict';

angular.module('wsapp', ['ngResource', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/welcome');
        $stateProvider
        .state('welcome', {
                url: '/welcome',
                views: {
                    'content': {
                        templateUrl: 'welcome/welcome.html',
                        controller: 'WelcomeController'
                    }
                }
            });

        
        //$locationProvider.html5Mode(true);
        
    });
