'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');


$rootScope.$on("$routeChangeSuccess", function(current) {
    var authRequired = $route.current &&
        $route.current.$route &&
        $route.current.$route.auth;
    if (authRequired && !signedIn.isSignedIn()) {
        growl.info("Authentication error",
            "You need to be signed in to view that page.<br/><br/>" +
                "Please sign in and we'll have you viewing that page in a jiffy");
        var currentUrl = $location.url();
        $location.url("/signin?redirect_url=" + encodeURIComponent(currentUrl));
    }
});
