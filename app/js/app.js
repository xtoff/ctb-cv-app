'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers','restangular', 'AuthService',]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginController'});
    $routeProvider.when('/logout', { templateUrl: 'index.html', controller: 'LoginController'});
    $routeProvider.when("/update", { templateUrl:'partials/update.html' });
    $routeProvider.when("/basic-info", { templateUrl:'partials/basic-info.html', controller: 'BasicInfoCtrl' });
    $routeProvider.otherwise({redirectTo: '/login'});
  }]) ;


myApp.run(function($rootScope,$location, $authService) {

    if($authService.isRemembered()){
        $rootScope.username = $authService.localUser().login;
        $rootScope.password = $authService.localUser().password;
        $rootScope.remember = $authService.localUser().remember;
    }

    if($authService.isLoggedIn()) {
        console.log('checked in as : ' + $authService.currentUser().name + '[login: ' + $authService.currentUser().login + ']');
        $location.path('/basic-info');
    }
    else {
        console.log('not checked in');
        $location.path('/login');
    }
});

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

function showAlert(pMessage) {
    var alertBox = $('div.alert');
    alertBox.removeClass('success');
    alertBox.addClass('alert');
    alertBox.find('span').text(pMessage);
    alertBox.show();
};