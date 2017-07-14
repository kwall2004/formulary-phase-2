/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.careteam.CareGiverDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.caregiverdetailcontroller',

    listen: {
        controller: {
            '*': {
                loadCareGiverDetail: 'loadCareGiverDetail'
            }
        }
    },

    loadCareGiverDetail: function(record) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            caregiverdetail = vm.getStore('caregiverdetail');

        caregiverdetail.getProxy().setExtraParam('pSessionID', user.sessionId);
        caregiverdetail.getProxy().setExtraParam('pRecipientID',record.data.ttrecipientID);
        caregiverdetail.getProxy().setExtraParam('pCareGiverID', record.data.ttCareGiverID);
        caregiverdetail.getProxy().setExtraParam('pCareGiverIND', record.data.ttCareGiverIND);
        caregiverdetail.load({
            callback: function(record) {
                var caregiverdetailform = me.lookupReference('caregiverdetailform');
                caregiverdetailform.loadRecord(record[0]);
            }
        });
    }
    // ,

    // onSaveCareGiverDetail: function () {
    //     var me = this,
    //         vm = me.getViewModel(),
    //         user = Ext.first('viewport').getViewModel().get('user'),
    //         caregiverdetail = vm.getStore('caregiverdetail');
    //
    //     caregiverdetail.phantom = false;
    //     caregiverdetail.save();
    // }
});