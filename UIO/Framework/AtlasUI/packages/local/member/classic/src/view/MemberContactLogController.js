/**
 * Created by j2487 on 10/27/2016.
 */
Ext.define('Atlas.prescriber.view.MemberContactLogController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridController',
    alias: 'controller.membercontactlogcontroller',
    listen:{
        controller:{
            'member': {
                MemberChange: 'RefreshLog'
            }
        }

    },
    init:function () {
       /* var parentViewModel = this.getView().up('panel').getViewModel();
        var contactLogVM = this.getView().down().getViewModel();
        var contactlogstore = parentViewModel.getStore('contactloglist');
        var masterrecord = parentViewModel.get('masterrecord');
        if(masterrecord){
            contactlogstore.getProxy().setExtraParam('pKeyType', 'recipientID');
            contactlogstore.getProxy().setExtraParam('pKeyValue', masterrecord.get('recipientID'));
            contactlogstore.load();
            this.fireEvent('contactLogLoaded');
            contactLogVM.set('createDisabled', false);
        }*/
       this.RefreshLog();
    },
    RefreshLog:function(recipientID,parentPanelId){
        if(this.getView().up().id == parentPanelId) {
            var parentViewModel = this.getView().up('panel').getViewModel();
            var contactLogVM = this.getView().down().getViewModel();
            var contactlogstore = parentViewModel.getStore('contactloglist');
            var masterrecord = parentViewModel.get('masterrecord');
            if (masterrecord) {
                contactlogstore.getProxy().setExtraParam('pKeyType', 'recipientID');
                contactlogstore.getProxy().setExtraParam('pKeyValue', masterrecord.get('recipientID'));
                contactlogstore.load();
                this.fireEvent('contactLogLoaded');
                contactLogVM.set('createDisabled', false);
            }
        }
    }
});