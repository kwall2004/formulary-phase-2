Ext.define('Atlas.common.view.inbox.InboxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inboxController',

    onInboxItemSelect: function (grid, record) {
        if(record){
            this.redirectTo(record.data.routeId);
        }
    }

});