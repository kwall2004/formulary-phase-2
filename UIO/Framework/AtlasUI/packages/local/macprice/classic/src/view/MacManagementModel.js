
Ext.define('Atlas.macprice.view.MacManagementModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.MacManagementModel',

    stores: {
        MacList: {
            model: 'Atlas.macprice.model.MacManagement',
            pageSize: 28,
            remoteSort: true
        },
        MACExecutiveAccess: {
            type: 'clonestore',
            storeId: 'MACExecutiveAccess',
            model: 'Atlas.common.model.QueueListItem',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pQueueListID: 9
                },
                url: 'system/{0}/queuelist'
            }
        },
        MacListNotes: {
            model: 'Atlas.common.model.Notes'
        }
    }

});