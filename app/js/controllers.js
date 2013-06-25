'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($scope, $window, $location, Restangular){

       var eightTeenYearsInMs = 568025136000;
       var todayEightTeenYearsAgo = new Date().getTime() - eightTeenYearsInMs;
       var adultAge = new Date(todayEightTeenYearsAgo);

      $('#birthdayDatePicker').datepicker('setEndDate', adultAge);



       var user = Restangular.one("user", 'f2a2a0f66cb0488c');

       user.get().then(function(user){
           $scope.user = user;
       });

       $scope.handleSave = function(){
           user = $scope.user;
           user.put().then(showSuccessAlert('User') );
       }
    });

app.controller('MyCtrl2', function($rootScope, $scope, Restangular){

    $scope.handleLogin = function(){

        var username = $scope.username;
        var password = $scope.password;

        if((username === 'frederik' && password === 'frederik')
            || (username === 'bert' && password === 'bert')
            || (username === 'kristof' && password === 'kristof')){

            $rootScope.isAuthenticated = true;
        }else{
            $rootScope.isAuthenticated = false;
        }
    }

}) ;