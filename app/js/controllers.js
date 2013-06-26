'use strict';

/* Controllers */

var SkillLevelEnum = {
                        NA :   {"skillLevel": 0, "skillLevelLabel": "N/A"},
                        BASIC : {"skillLevel": 1, "skillLevelLabel": "Basic"},
                        GOOD : {"skillLevel": 2, "skillLevelLabel": "Good"},
                        FLUENT : {"skillLevel": 3, "skillLevelLabel": "Fluent"},
                        MT : {"skillLevel": 4, "skillLevelLabel": "Mothertongue"}
};

var LanguageEnum = {
    NL : {"label" : "Dutch"},
    FR : {"label" : "French"},
    EN : {"label" : "English"},
    DE : {"label" : "German"}
};

if(Object.freeze){
    // enum since 1.8.5
    Object.freeze(SkillLevelEnum);
    Object.freeze(LanguageEnum);
}

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($scope, $window, $location, Restangular){

       var eightTeenYearsInMs = 568025136000;
       var todayEightTeenYearsAgo = new Date().getTime() - eightTeenYearsInMs;
       var adultAge = new Date(todayEightTeenYearsAgo);

      //$('#birthdayDatePicker').datepicker('setEndDate', adultAge);

       $scope.languages = LanguageEnum;
       $scope.skillLevels = SkillLevelEnum;

       //var user = Restangular.one("user", 'f2a2a0f66cb0488c');
       var user = Restangular.one("users", 'eb6a5e155bfe2825');

       user.get().then(function(user){
           // fix for that stupid datepicker...
           user.birthDay = moment(new Date(user.birthDay)).format('DD/MM/YYYY');
           user.hireDate = moment(new Date(user.hireDate)).format('DD/MM/YYYY');
           $scope.user = user;
       });

       $scope.handleSave = function(){
           user = $scope.user;
           user.put().then(showSuccessAlert('User') );
       }

    });

app.controller('LoginController', function($rootScope, $scope, Restangular){

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

app.controller('LogoutController', function($rootScope, $scope){
    $scope.handleLogout = function(){
        $rootScope.isAuthenticated = false;
    }
}) ;

var motherTongueConstraint = function(){


    for (var lang in LanguageEnum) {
        $('#bg-' + lang + " > button.active").each(function(index, value){
            console.log($(value).data('skillLevel'));
        });

    }
};
