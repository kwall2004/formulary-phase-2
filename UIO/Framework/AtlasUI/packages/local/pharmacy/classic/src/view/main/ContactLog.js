Ext.define('Atlas.pharmacy.view.main.ContactLog', {
    extend: 'Ext.Panel',

    controller: 'pharmacy-main-contactlog',
    viewModel: {
        stores: {
            contactloglist: {
                model: 'Atlas.common.model.ContactLog',
                //autoLoad: false,
                session: true,
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    layout: 'fit',

    items: [
        {
            xtype:'common-contactlog'
        }
    ]
});
