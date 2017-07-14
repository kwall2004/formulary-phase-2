// k3279 - Kevin Tabasan - 12/19/2016

Ext.define('Atlas.portals.view.hpmember.UserPreferencesViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userhpmember',

    init: function() {
        var vm = this.getViewModel(),
            userObj = {
                "firstName":Atlas.user.firstName,
                "lastName":Atlas.user.lastName,
                "address1":Atlas.user.homeAddress1,
                "city":Atlas.user.homeCity,
                "state":Atlas.user.homeState
            };

        vm.set('userPrefs',userObj);
    },

    onChangePasswordClick: function() {
        this.fireEvent('changePassword');
    },

    onCancelClick: function() {
        this.getView().up().destroy();
    }
});