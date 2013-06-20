'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','restangular']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'MyCtrl2'});
    $routeProvider.when("/update", { templateUrl:'partials/update.html' });
    $routeProvider.when("/basic-info", { templateUrl:'partials/basic-info.html', controller: 'BasicInfoCtrl' });
    $routeProvider.otherwise({redirectTo: '/login'});
  }]) ;

myApp.config(
        ['RestangularProvider', '$httpProvider',
            function(RestangularProvider, $httpProvider) {
                RestangularProvider.setBaseUrl('https://api.foursquare.com/v2');
                RestangularProvider.setListTypeIsArray(false);

                RestangularProvider.setResponseExtractor(function(response, operation, what) {
                    if (operation === 'get') {
                        return response.response[what.substring(0, what.length - 1)];
                    } else if (operation === 'getList') {
                        return response.response[what].groups[0].items;
                    }
                });
} ]);
