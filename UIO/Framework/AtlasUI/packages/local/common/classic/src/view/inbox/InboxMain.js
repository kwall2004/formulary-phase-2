Ext.define('Atlas.common.view.inbox.InboxMain', {
    extend: 'Ext.grid.Panel',  //Not an app base so just use panel
    xtype: 'common-inbox-main',
    viewModel: 'inboxModel',
    controller: 'inboxController',

    plugins: 'gridfilters',
    bind: {
        store: '{inbox}'
    },
    listeners: {
        select: 'onInboxItemSelect'
    },
    columns: [
        {
            text: 'Client',
            dataIndex: 'client',
            width: 225,
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Title',
            dataIndex: 'title',
            minWidth: 90,
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Name',
            dataIndex: 'name',
            filter: {
                type: 'string'
            }
        },
        {
            text: 'Date',
            dataIndex: 'date',
            filter: {
                type: 'date'
            }
        },
        {
            text: 'Status',
            dataIndex: 'status',
            filter: {
                type: 'list',
                // options will be used as data to implicitly creates an ArrayStore
                options: ['open', 'closed', 'pending', 'recalled', 'new']
            }
        }
    ]
});