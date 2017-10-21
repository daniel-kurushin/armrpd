(function() {

  'use strict';

  angular
      .module('rpdApp')
      .config(appConfig)
      .run(stateStart);

  appConfig.$inject = ['$stateProvider', '$qProvider', '$urlRouterProvider'];
  stateStart.$inject = ['$rootScope', '$state'];

  function appConfig($stateProvider, $qProvider, $urlRouterProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
        .state('discipline', {
            parent: 'main',
            url: '/discipline',
            templateUrl: "views/discipline.html",
            controller: "DisciplineController"
        })
        .state('develop', {
            parent: 'main',
            url: '/develop',
            templateUrl: "views/develop.html",
            controller: "DevController"
        })
        .state('page1', {
            parent: 'develop',
            url: '/page1',
            templateUrl: "views/page1.html",
            controller: "DevController"
        })
        .state('page2', {
            parent: 'develop',
            url: '/page2',
            templateUrl: "views/page2.html",
            controller: "DevController"
        })
        .state('page3', {
            parent: 'develop',
            url: '/page3',
            templateUrl: "views/page3.html",
            controller: "DevController"
        })
        .state('page4', {
            parent: 'develop',
            url: '/page4',
            templateUrl: "views/page4.html",
            controller: "DevController"
        })
        .state('page5', {
            parent: 'develop',
            url: '/page5',
            templateUrl: "views/page5.html",
            controller: "DevController"
        })
        .state('page6', {
            parent: 'develop',
            url: '/page6',
            templateUrl: "views/page6.html",
            controller: "DevController"
        })
        .state('page7', {
            parent: 'develop',
            url: '/page7',
            templateUrl: "views/page7.html",
            controller: "DevController"
        })
        .state('page8', {
            parent: 'develop',
            url: '/page8',
            templateUrl: "views/page8.html",
            controller: "Page8Controller"
        })
        .state('page9', {
            parent: 'develop',
            url: '/page9',
            templateUrl: "views/page9.html",
            controller: "Page9Controller"
        });
  };

  function stateStart($rootScope, $state) {
  }
})();
