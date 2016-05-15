'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
    $stateProvider
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
               })
            .state('signout', {
                   url: '/signout',
                   views: {
                       'content': {
                           templateUrl: 'auth/signout/signout.html',
                           controller: 'SignoutController'
                       },
                       'navbar':{
                           templateUrl: 'navbar/navbar.html',
                           //controller: 'WelcomeController'
                       }
                   }
               })
        ;


        //$locationProvider.html5Mode(true);

    });
