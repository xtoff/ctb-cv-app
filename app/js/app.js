'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'MyCtrl2'});
    $routeProvider.when("/update", { templateUrl:'partials/update.html' });
    $routeProvider.when("/basic-info", { templateUrl:'partials/basic-info.html', controller: 'BasicInfoCtrl' });
    $routeProvider.otherwise({redirectTo: '/login'});
  }]);
