'use strict';

/* Controllers */

var SkillLevelEnum = {
                        NA :   {"skillLevel": 0, "skillLevelLabel": "N/A"},
                        BASIC : {"skillLevel": 1, "skillLevelLabel": "Basic"},
                        GOOD : {"skillLevel": 2, "skillLevelLabel": "Good"},
                        FLUENT : {"skillLevel": 3, "skillLevelLabel": "Fluent"}
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

var TabsDemoCtrl = function ($scope) {
    $scope.tabs = [
        { title:"Dynamic Title 1", content:"Dynamic content 1" },
        { title:"Dynamic Title 2", content:"Dynamic content 2", disabled: true }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            alert("You've selected the alert tab!");
        });
    };

    $scope.navType = 'pills';
};

var app = angular.module('myApp.controllers', ['$strap.directives']).
  controller('MyCtrl1', [function() {

  }]);

   app.controller('BasicInfoCtrl', function($rootScope, $scope, $window, $location, Restangular){

       if($rootScope.isAuthenticated != true){
           $location.path("/login");
       }else{
           var eightTeenYearsInMs = 568025136000;
           var todayEightTeenYearsAgo = new Date().getTime() - eightTeenYearsInMs;
           var adultAge = new Date(todayEightTeenYearsAgo);


            //$('#birthdayDatePicker').datepicker('setEndDate', adultAge);

           $scope.languages = LanguageEnum;
           $scope.skillLevels = SkillLevelEnum;


           //var user = Restangular.one("user", 'f2a2a0f66cb0488c');
           var user = Restangular.one("users", 'eb6a5e155bfe2825');

           user.get().then(function(user){
               $scope.user = user;
            });
       }

       $scope.handleSave = function(){
           user = $scope.user;

           if(Object.prototype.toString.call(user.hireDate) === '[object Date]'){
               var hireDate = new Date(user.hireDate.getTime());
               user.hireDate = moment(hireDate).format("DD-MM-YYYY");
           }

           if(Object.prototype.toString.call(user.birthDay) === '[object Date]'){
               var birthDay = new Date(user.birthDay.getTime());
               user.birthDay = moment(birthDay).format("DD-MM-YYYY");
           }
           user.put().then(showSuccessAlert('User') );
       }
   });

app.controller('LoginController', function($rootScope, $scope, $location, Restangular){


    $scope.handleLogin = function(){

        $scope.alerts = []

        var username = $scope.username;
        var password = $scope.password;

        if((username === 'frederik' && password === 'frederik')
            || (username === 'bert' && password === 'bert')
            || (username === 'kristof' && password === 'kristof')){

            $rootScope.isAuthenticated = true;
            $rootScope.loggedUser = username;

            $location.path("/basic-info");
        }else{
            $scope.alerts.push({type:"error",title:"Error",content: "Wrong username/password combination"});
            $rootScope.isAuthenticated = false;
        }
    }

    $scope.handleLogout = function(){

        $rootScope.isAuthenticated = false;

        $location.path("/login");
    }

});

app.controller('LogoutController', function($rootScope, $scope, $location){

});

app.value('$strapConfig', {
    datepicker: {
        format: 'dd-mm-yyyy'
    }
});

var motherTongueConstraint = function(){
    var motherTongueSelected;
    for (var lang in LanguageEnum) {
       $('#bg-' + lang + " > button.active").each(function(index, value){
           var selectedSkillLevel = SkillLevelEnum[$(value).data('skillLevel')];
           if(SkillLevelEnum.MT === selectedSkillLevel){
               motherTongueSelected = true;
           }
       });
       if(motherTongueSelected){
           break;
       }
    }



};
