/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Immunization
 * Description: Controller for Member Immunization
 */
Ext.define('Atlas.portals.provider.MemberImmunizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberimmunizationcontroller',

    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadImmunizationData'
            }
        }
    },

    loadImmunizationData: function (memberdetails) {
        this.loadImmunization(memberdetails.recipientID);
    },

    loadImmunization: function (recipientId) {
        var me = this,
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            recordPresent = false,
            bloodLeadStore = this.getViewModel().getStore('memberBloodLeadStore'),
            immunizationStore = this.getViewModel().getStore('memberImmunizationStore');

        this.lookupReference('errorMessageRef').setHidden(true);
        this.lookupReference('errorMessageRef').setValue('<font color="red">No Record(s) Found for Immunizations / Blood Lead Tests</font>');
        immunizationStore.getProxy().setExtraParam('pRowId', '');
        immunizationStore.getProxy().setExtraParam('pRowNum', 0);
        immunizationStore.getProxy().setExtraParam('pRows', 200);
        immunizationStore.getProxy().setExtraParam('pWhere', 'recipientID = ' + recipientId);
        immunizationStore.getProxy().setExtraParam('pSort', 'serviceDate by cpt4Cd');
        immunizationStore.getProxy().setExtraParam('userState', user.homeState);
        immunizationStore.load({
            scope: this,
            failure: function (rec, operation) {

            },
            success: function (rec, operation) {

            },
            callback: function (records, operation, success) {
                if (records.length > 0){
                    recordPresent = true;
                }
                if (!recordPresent){
                    this.lookupReference('errorMessageRef').setHidden(false);
                }
            }
        });
        bloodLeadStore.getProxy().setExtraParam('pRowId', '');
        bloodLeadStore.getProxy().setExtraParam('pRowNum', 0);
        bloodLeadStore.getProxy().setExtraParam('pRows', 200);
        bloodLeadStore.getProxy().setExtraParam('pWhere', 'recipientID = ' + recipientId);
        bloodLeadStore.getProxy().setExtraParam('pSort', 'serviceDate by cpt4Cd');
        bloodLeadStore.getProxy().setExtraParam('userState', user.homeState);
        bloodLeadStore.load({
            scope: this,
            failure: function (rec, operation) {

            },
            success: function (rec, operation) {

            },
            callback: function (records, operation, success) {
                if (records.length > 0){
                    recordPresent = true;
                }
                if (!recordPresent){
                    this.lookupReference('errorMessageRef').setHidden(false);
                }
            }
        });

    }
});