'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('cv tool', function() {

    beforeEach(function() {
        browser().navigateTo('../../app/index.html');
    });


    it('should automatically redirect to /login when location hash/fragment is empty', function() {
        expect(browser().location().url()).toBe("/login");
    });
});

describe('cv tool login', function(){

        beforeEach(function() {
            browser().navigateTo('../../app/index.html');
        });

        it('should show my resume after succesfull login', function(){
            expect(browser().location().url()).toBe("/login");
            input('username').enter('bert');
            input('password').enter('bert');
            element('#loginBtn').click();
            pause();
            expect(browser().location().url()).toBe("/basic-info");
        });

    }
);

