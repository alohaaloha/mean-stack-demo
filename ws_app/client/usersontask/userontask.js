'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('userontask', {
                url: '/userontask/{id}',
                views: {
                    'content': {
                        templateUrl: 'usersontask/userontask.html',
                        controller: 'userontaskController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
        });



        //$locationProvider.html5Mode(true);

    });
