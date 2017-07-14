Ext.define('Atlas.prescriber.view.search.SearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescriber-search',

    onItemdblclick: function (grid, record, item) {
        var me = this,
            client = me.getViewModel().get('client'),
            appClass = 'Detail',
            atlasId = record.get('npi');

        // me.redirectTo(client + classPath + atlasId);

        //TODO Use openView here
        // this.fireEvent('routeTo', {
        //     client: client,
        //     package: 'prescriber',
        //     appClass: appClass,
        //     atlasId: atlasId,
        //     menuId: null
        // });

    },

    onGridExport: function () {
        var me = this,
            view = me.getView();
        Ext.Ajax.request({
            url: Atlas.apiURL + 'prescriber/search/export',
            extraParams: {
                clientId: '123',
                sessionId: '123'
            },
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                console.dir(obj);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    }
});