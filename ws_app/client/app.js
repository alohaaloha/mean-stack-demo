'use strict';

angular.module('wsapp', ['ngResource', 'ui.router'])
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
            })
        .state('myprojects', {
                url: '/myprojects',
                views: {
                    'content': {
                        templateUrl: 'projects/myProjects.html',
                        controller: 'MyProjectsController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
                    }
                }
            })
        .state('projectsimin', {
                url: '/projectsimin',
                views: {
                    'content': {
                        templateUrl: 'projects/projectsImIn.html',
                        controller: 'ProjectsImInController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
                    }
                }
            })
        .state('projectdetail', {
                url: '/project/{id}',
                views: {
                    'content': {
                        templateUrl: 'projects/projectsImIn.html',
                        controller: 'ProjectsImInController'
                    },
                    'navbar':{
                        templateUrl: 'navbar/navbar.html',
                        //controller: 'WelcomeController'
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
                        //controller: 'WelcomeController'
                    }
                }
            })
        ;

        
        //$locationProvider.html5Mode(true);
        
    });
