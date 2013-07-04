'use strict';

/* Controllers */


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

   app.controller('BasicInfoCtrl', function($rootScope, $scope, $window, $location, Restangular, $authService){

       if(!$authService.isLoggedIn()){
           $location.path("/login");
       }else{
           var eightTeenYearsInMs = 568025136000;
           var todayEightTeenYearsAgo = new Date().getTime() - eightTeenYearsInMs;
           var adultAge = new Date(todayEightTeenYearsAgo);


            //$('#birthdayDatePicker').datepicker('setEndDate', adultAge);

           $scope.languages = constants.LanguageEnum;
           $scope.skillLevels = constants.SkillLevelArray;


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
           user.put().then(utils.showSuccessAlert('User') );
       }
   });

app.controller('LoginController', function($rootScope, $scope, $location, Restangular, $authService){

    var user = new Object();

    $scope.isLoggedIn = function(){
        if($authService.isLoggedIn()){
            return true;
        }else{
            return false;
        }
    }

    $scope.handleLogin = function(){

        var remember = $('#remember').is(":checked");

        $scope.alerts = []

        var username = $scope.username;
        var password = $scope.password;

        if($authService.isLoggedIn()){
            $rootScope.isAuthenticated = true;
            $rootScope.loggedUser = username;

            $location.path("/basic-info");
        }else if((username === 'frederik' && password === 'frederik')
            || (username === 'bert' && password === 'bert')
            || (username === 'kristof' && password === 'kristof')){


            user.name = username;
            user.login = username;
            user.password = password;
            user.id = 'eb6a5e155bfe2825';

            $authService.login(user, password, remember);

            $rootScope.isAuthenticated = true;
            $rootScope.loggedUser = username;

            $location.path("/basic-info");
        }else{
            $scope.alerts.push({type:"error",title:"Error",content: "Wrong username/password combination"});
            $rootScope.isAuthenticated = false;
        }
    }

    $scope.handleLogout = function(){

        $authService.logout();

        $rootScope.isAuthenticated = false;

        $location.path("/login");
    }

});

app.controller('LogoutController', function($rootScope, $scope, $location){

});


app.controller('DiplomaController', function($rootScope, $scope, $location, Restangular, $authService){
    if(!$authService.isLoggedIn()){
        $location.path("/login");
    }
    $scope.selectedEducation = 'DIP';
    $scope.educations = constants.EducationsArray;
    $scope.diplomaTypes = constants.DiplomaTypes;

    var allDiplomas = Restangular.all('diploma');
    $scope.consultantDiplomas = allDiplomas.getList();

    $scope.add = function(){
        allDiplomas.post($scope.diploma).then(function() {
            console.log("Object saved OK");
            $scope.consultantDiplomas = allDiplomas.getList();
        }, function() {
            console.log("There was an error saving");
        });

    };

    $scope.delete = function(id){
        console.log(id);
        var item = Restangular.one('diploma', id);
        item.remove().then(function() {
            console.log("Object deleted OK");
            $scope.consultantDiplomas = allDiplomas.getList();
        }, function() {
            console.log("There was an error deleting");
        });
    }

});



