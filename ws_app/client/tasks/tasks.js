'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('newtask', {
                url: '/newtask/{id}',
                views: {
                    'content': {
                        templateUrl: 'tasks/newTask.html',
                        controller: 'NewTaskController'
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
