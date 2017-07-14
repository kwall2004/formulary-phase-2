/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.careteam.CareGiverHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caregiverheadercontroller',

    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadCareGiverHeader'
            }
        }
    },

    loadCareGiverHeader: function(memberdetails) {
        var me = this,
            vm = me.getViewModel(),
    
            user = Ext.first('viewport').getViewModel().get('user'),
            caregiverheaderstore = vm.getStore('caregiverheaderstore'),
            recipientId = vm.get('recipientId');

        caregiverheaderstore.getProxy().setExtraParam('pSessionID', user.sessionId);
        caregiverheaderstore.getProxy().setExtraParam('pRecipientID', recipientId);
        caregiverheaderstore.load();
    },

    onCareGiverGridClick: function(view, record) {
        var caregiverdetailform = this.getView().getViewModel().get('caregiverdetailform');
        this.fireEvent('loadCareGiverDetail', record);
    }
});