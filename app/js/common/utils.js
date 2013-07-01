'use strict';

var utils = {

    showSuccessAlert : function(pMessage) {
        var alertBox = $('div.alert');
        /*alertBox.removeClass('alert alert-success');*/
        alertBox.addClass('alert-success');
        alertBox.find('span').text(pMessage + ' succesfully updated!');
        alertBox.show('slow');
    },

    showAlert : function(pMessage) {
        var alertBox = $('div.alert');
        alertBox.removeClass('success');
        alertBox.addClass('alert');
        alertBox.find('span').text(pMessage);
        alertBox.show();
    }
};
