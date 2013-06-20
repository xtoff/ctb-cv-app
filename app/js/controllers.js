'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($scope, $window, $location, Restangular){
        $scope.datepicker = {date: new Date("2012-09-01T00:00:00.000Z")};

       $scope.birthdaydatepicker = {date: new Date("1990-09-01T00:00:00.000Z")};
       //var user = Restangular.one("user", 'f2a2a0f66cb0488c');

       var users = Restangular.all("user");

       $scope.user = users.getList()[0];

    });