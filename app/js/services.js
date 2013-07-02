'use strict';

/* Services */
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

        //create two users for session and local storage
        var sessionUser = new User();
        var storageUser = new User();

        //if the user checked 'Remember me', the storageUser is populated
        storageUser.login = webStorage.local.get('user_login');
        storageUser.password = webStorage.local.get('user_password');
        storageUser.remember = webStorage.local.get('user_remember');

        //every time a user logs in, a sessionUser is populated
        sessionUser.name = webStorage.session.get('user_name');
        sessionUser.id = webStorage.session.get('user_id');
        sessionUser.login = webStorage.session.get('user_login');
        sessionUser.password = webStorage.session.get('user_password');

        return {

            login: function(user) {

                sessionUser = user;

                webStorage.local.add('user_remember', user.remember);

                //only populate local storage when user checked 'Remember'
                if(user.remember){
                    webStorage.local.add('user_login', user.login);
                    webStorage.local.add('user_password', user.password);

                }else{
                    webStorage.local.remove('user_login');
                    webStorage.local.remove('user_password');
                }

                //session has to be populated every time a user logs in
                webStorage.session.add('user_name', user.name);
                webStorage.session.add('user_id', user.id);
                webStorage.session.add('user_login', user.login);
                webStorage.session.add('user_password', user.password);

            },
            isRemembered: function(){
              return storageUser.remember;
            },
            logout: function() {
                webStorage.session.clear();

                storageUser.remember =  webStorage.local.get('user_remember');

                //$rootScope is used for populating the login and password field
                //is there a better solution for this?
                if(!storageUser.remember){
                    $rootScope.username = '';
                    $rootScope.password = '';
                    $rootScope.remember = false;
                }else{
                    $rootScope.username = storageUser.login;
                    $rootScope.password = storageUser.password;
                    $rootScope.remember = storageUser.remember;
                }
            },
            isLoggedIn: function() {
                return (sessionUser.login != null);
            },
            sessionUser: function() {
                return sessionUser;
            },
            storageUser:function() {
                return storageUser;
            },
            password: function() {
                return sessionUser.password;
            }
        }

    });
