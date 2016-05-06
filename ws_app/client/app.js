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
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
                    }
                }
            })
        .state('signup', {
                url: '/signup',
                views: {
                    'content': {
                        templateUrl: 'auth/signup/signup.html',
                        controller: 'SignupController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
                    }
                }
            })
        .state('signin', {
                url: '/signin',
                views: {
                    'content': {
                        templateUrl: 'auth/signin/signin.html',
                        controller: 'SigninController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
                    }
                }
            });

        
        //$locationProvider.html5Mode(true);
        
    });
