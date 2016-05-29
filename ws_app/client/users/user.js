'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('userlist', {
                url: '/user/project/{id}',
                views: {
                    'content': {
                        templateUrl: 'users/usersList.html',
                        controller: 'UsersListController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
        })
        ;


        //$locationProvider.html5Mode(true);

    });
