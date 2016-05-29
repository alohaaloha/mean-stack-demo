'use strict';

angular.module('wsapp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('myprojects', {
                url: '/myprojects',
                views: {
                    'content': {
                        templateUrl: 'projects/myProjects.html',
                        controller: 'MyProjectsController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                },
                data: {
                    auth: ["ROLE_ADMIN"]
                }
            })
        .state('projectsimin', {
                url: '/projectsimin/{id}',
                views: {
                    'content': {
                        templateUrl: 'projects/projectsImIn.html',
                        controller: 'ProjectsImInController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
        .state('projectdetail', {
                url: '/project/{id}',
                views: {
                    'content': {
                        templateUrl: 'projects/projectDetail.html',
                        controller: 'ProjectDetailController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
        .state('projectnew', {
                url: '/projectnew',
                views: {
                    'content': {
                        templateUrl: 'projects/projectNew.html',
                        controller: 'ProjectNewController'
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
