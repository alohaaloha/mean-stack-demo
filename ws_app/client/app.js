'use strict';

angular.module('wsapp', ['ngResource', 'ui.router', 'googlechart'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
         $stateProvider
           .state('home', {
                   url: '/home',
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
               });
        //$locationProvider.html5Mode(true);

    });
