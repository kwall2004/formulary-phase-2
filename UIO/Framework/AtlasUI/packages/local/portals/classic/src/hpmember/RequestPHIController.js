Ext.define('Atlas.portals.hpmember.RequestPHIController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalshpmemberrequestphi',

    init: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            state = user.portalStateSelected,
            address = {},
            vm = this.getViewModel(),
            title = 'Meridian Health Plan';

        this.lookupReference('memberId').setValue(user.memberId);
        this.lookupReference('recipientId').setValue(user.recipientId);
        this.lookupReference('lastname').setValue(user.lastName);
        this.lookupReference('firstname').setValue(user.firstName);

        title = user.portalPlanId === 'MChoice' ? 'Meridian Choice' : title;
        vm.set('userTitle', title);

        if (state === 'IL') {
            address.line1 = '222 N. LaSalle Street';
            address.line2 = 'Suite 930';
            address.details = 'Chicago, IL 60601';
        } else {
            address.line1 = '1 Campus Martius';
            address.line2 = 'Suite 700';
            address.details = 'Detroit, MI 48226';
        }
        vm.set('address', address);
        vm.set('baseUrl', Atlas.apiURL);
        vm.set('userState', state);
    }
});