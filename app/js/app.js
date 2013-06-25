'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','restangular']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'LoginController'});
    $routeProvider.when('/logout', {templateUrl: 'index.html', controller: 'LogoutController'});
    $routeProvider.when("/update", { templateUrl:'partials/update.html' });
    $routeProvider.when("/basic-info", { templateUrl:'partials/basic-info.html', controller: 'BasicInfoCtrl' });
    $routeProvider.otherwise({redirectTo: '/login'});
  }]) ;

myApp.config(
        ['RestangularProvider',
            function(RestangularProvider) {
                RestangularProvider.setBaseUrl('http://10.0.2.87:2403');
} ]);

var showSuccessAlert = function(pMessage) {
    var alertBox = $('div.alert');
    /*alertBox.removeClass('alert alert-success');*/
    alertBox.addClass('alert-success');
    alertBox.find('span').text(pMessage + ' succesfully updated!');
    alertBox.show('slow');
};
