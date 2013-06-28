'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('AuthService', ['webStorageModule'])
    .factory('$authService', function($rootScope, webStorage) {

        var User = function() {
            this.name = "";
            this.id = 0;
            this.login = "";
            this.password = "";
        };

        var currentUser = new User();
        var storageUser = new User();
        storageUser.login = webStorage.local.get('user_login');
        storageUser.password = webStorage.local.get('user_password');
        storageUser.remember = webStorage.local.get('user_remember');

        currentUser.name = webStorage.session.get('user_name');
        currentUser.id = webStorage.session.get('user_id');
        currentUser.login = webStorage.session.get('user_login');
        currentUser.password = webStorage.session.get('user_password');
        var loggedIn = (currentUser.name != null && currentUser.id != null && currentUser.login != null);
        var password = webStorage.session.get('user_password');
        var remember =  webStorage.local.get('user_remember');

        return {

            login: function(user, pass, remember) {

                loggedIn = true;
                currentUser = user;
                password = pass;

                webStorage.local.add('user_remember', remember);

                if(remember){
                    webStorage.local.add('user_login', user.login);
                    webStorage.local.add('user_password', user.password);

                }else{
                    webStorage.local.remove('user_login');
                    webStorage.local.remove('user_password');
                }

                webStorage.session.add('user_name', user.name);
                webStorage.session.add('user_id', user.id);
                webStorage.session.add('user_login', user.login);
                webStorage.session.add('user_password', user.password);

            },
            isRemembered: function(){
              return remember;
            },
            logout: function() {
                webStorage.session.clear();
                remember =  webStorage.local.get('user_remember');

                if(!remember){
                    $rootScope.username = '';
                    $rootScope.password = '';
                    $rootScope.remember = false;
                }else{
                    $rootScope.username = storageUser.login;
                    $rootScope.password = storageUser.password;
                    $rootScope.remember = storageUser.remember;
                }

                loggedIn = false;
                password = null;
                currentUser = null;
            },
            isLoggedIn: function() {
                return loggedIn;
            },
            currentUser: function() {
                return currentUser;
            },
            localUser:function() {
                return storageUser;
            },
            password: function() {
                return password;
            }
        }

    });
