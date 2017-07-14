/**
 * Created by s6393 on 11/23/2016.
 */
Ext.define('Atlas.casemanagement.view.COCAttachmentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cocAttachmentsController',
    listen: {
        controller: {
            'cocdetailscontroller': {
                LoadAttachmentssetPermission: 'LoadAttachmentssetPermission'
            }
        }
    },
    LoadAttachmentssetPermission:function() {
        this.LoadAttachments();
        this.SetPermissions();
    },
    init: function () {
        this.LoadAttachments();
        this.SetPermissions();
    },

    LoadAttachments: function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var pWhere =  "SystemID = " + vm.get('casesystemId');
        var StoreAttachments = vm.getStore('StoreAttachments');
        StoreAttachments.getProxy().setExtraParam('pWhere', pWhere);
        StoreAttachments.getProxy().setExtraParam('pUserName', Atlas.user.un);
        StoreAttachments.getProxy().setExtraParam('userState', vm.get('state'));
        StoreAttachments.load();
    },

    SetPermissions : function() {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var managedByUserName = vm.get('managedByUserName'),
            caseStatus = vm.get('caseStatus');
        //Enabling and disabling the buttons
        if ((managedByUserName != '' || (managedByUserName != Atlas.user)
            || caseStatus == 'closed')) {
            view.down('#btnAttachment').setDisabled(true);
        }
        else {
            view.down('#btnAttachment').setDisabled(false);
        }

    }
});