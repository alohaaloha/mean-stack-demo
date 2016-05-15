'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('userlist', {
                url: '/userlist',
                views: {
                    'content': {
                        templateUrl: 'users/usersList.html',
                        controller: 'UsersListController'
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
