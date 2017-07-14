/**
 * Created by s6627 on 11/23/2016.
 */
/**
 * Created by s6627 on 11/23/2016.
 */
Ext.define('Atlas.casemanagement.view.ContactLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.contactlogcontroller',
    listen: {
        controller: {
            'casedetailscontroller': {
                getContactLog: 'getContactLog'
            }
        }
    },
    init:function () {
       this.getContactLog();
    },
    getContactLog: function() {
        var me = this;
        var view = this.getView();
        var contactLogVM = this.getView().down().getViewModel();
        var contactlogstore=this.getViewModel().getStore('contactloglist');
        if (view.up('CaseInfo').down('#hiddenMTMID').getValue() != null && view.up('CaseInfo').down('#hiddenMTMID').getValue() != "") {
                contactlogstore.getProxy().setExtraParam('pKeyValue', view.up('CaseInfo').down('#hiddenMTMID').getValue());
                contactlogstore.getProxy().setExtraParam('pKeyType', 'MTMID');
                contactlogstore.load({
                    callback: function (record) {
                        contactLogVM.set('createDisabled', false);
                    }
                });
            contactLogVM.set('createDisabled', false);
        }

    }
});