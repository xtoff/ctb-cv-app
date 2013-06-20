'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($scope, $window, $location, Restangular){
       var user = Restangular.one("user", 'f2a2a0f66cb0488c');

       user.get().then(function(user){
           $scope.user = user;
       });

       $scope.handleSave = function(){
           user = $scope.user;
           user.put();
           showSuccessAlert("User succesfully updated");
       }
    });