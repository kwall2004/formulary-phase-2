/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGReviewHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdagreviewhistorycontroller',
    selectedAuthId: null,
    listen: {
        controller: {
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            },
            '*': {
                refreshCDAGReviewHistory: 'loadGridData'
            }
        }
    },

    init: function () {
        var vm = this.getViewModel(),
            authId = vm.get('cdmodel.authId');

        this.loadGridData(authId);
    },

    loadGridData: function (authId) {
        if (this.selectedAuthId != authId) {
            return;
        }

        var vm = this.getViewModel();

        var storeStatusHistory = vm.getStore('storestatushistory');
        storeStatusHistory.getProxy().setExtraParam('pAuthId', authId);
        storeStatusHistory.load();

        var storeAuditUniverse = vm.getStore('storecoverageaudituniverse');
        storeAuditUniverse.getProxy().setExtraParam('pAuthID', authId);
        storeAuditUniverse.load();
    },

    updateAuthID: function(authID, EventUUID) {

        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title,
            CDAGInstanceUUID = this.getViewModel().get('CDAGInstanceUUID');

        if (activeTabTitle != 'Review History' || EventUUID != CDAGInstanceUUID) {
            return;
        }

        var vm = this.getViewModel(),
            LastAuthID = vm.get('LastAuthID');

        if (LastAuthID != null && LastAuthID != undefined && LastAuthID == authID) {
            return;
        }

        vm.set('LastAuthID', authID);
        this.selectedAuthId = authID;

        this.loadGridData(authID);
    }

});