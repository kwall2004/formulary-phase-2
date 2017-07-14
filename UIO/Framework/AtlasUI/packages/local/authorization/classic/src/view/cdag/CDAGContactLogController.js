/**
 * Created by akumar on 12/09/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGContactLogController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.cdagcontactlogcontroller',
    listen: {
        controller: {
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            }
        }
    },

    init:function () {
        var vm = this.getViewModel(),
            authId = vm.get('cdmodel.authId');

        this.loadGridData(authId);
    },

    loadGridData: function (authId) {
        var vm = this.getViewModel(),
            contactlogstore = vm.getStore('contactloglist');

        if (authId != 0 && authId != null) {
            contactlogstore.getProxy().setExtraParam('pKeyType', 'authId');
            contactlogstore.getProxy().setExtraParam('pKeyValue', authId);
            contactlogstore.load();

            this.fireEvent('contactLogLoaded');
            vm.set('createDisabled', false);
        }
    },

    updateAuthID: function(authID) {

        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title;

        if (activeTabTitle != 'Contact Log') {
            return;
        }

        this.loadGridData(authID);
    }

});