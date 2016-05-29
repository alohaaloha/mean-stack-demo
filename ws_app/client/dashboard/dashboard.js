'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('dashboard', {
                url: '/dashboard/{id}',
                views: {
                    'content': {
                        templateUrl: 'dashboard/dashboard.html',
                        controller: 'DashboardController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })

        ;

    });
