'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($scope, $window, $location){
        $scope.datepicker = {date: new Date("2012-09-01T00:00:00.000Z")};

    });