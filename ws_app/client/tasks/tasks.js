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
                        controller: 'NavbarController'
                    }
                }
        })
        .state('taskdetail', {
                        url: '/taskdetail/{id}',
                        views: {
                            'content': {
                                templateUrl: 'tasks/taskDetail.html',
                                controller: 'TaskDetailController'
                            },
                            'navbar':{
                                templateUrl: 'navbar/navbar.html',
                                controller: 'NavbarController'
                            }
                        }
                })
        .state('edittask', {
                                url: '/edittask/{id}',
                                views: {
                                    'content': {
                                        templateUrl: 'tasks/editTask.html',
                                        controller: 'EditTaskController'
                                    },
                                    'navbar':{
                                        templateUrl: 'navbar/navbar.html',
                                        controller: 'NavbarController'
                                    }
                                }
                        })
        .state('taskhistory', {
                                url: '/taskhistory/{id}',
                                views: {
                                    'content': {
                                        templateUrl: 'tasks/taskHistory.html',
                                        controller: 'TaskHistoryController'
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
