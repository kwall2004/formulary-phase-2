Ext.define('Atlas.common.view.inbox.InboxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.inboxModel',
    stores: {
        inbox:{
            type:'common-inbox'  //package store
        }
    }
});
