Ext.define('Atlas.pharmacy.view.main.Letter', {
    extend: 'Ext.grid.Panel',

    viewModel: {
        stores: {
            letters: {
                model: 'Atlas.common.model.AttachmentList'
            }
        }
    },
    controller: 'pharmacy-letter',

    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No Letter data available'
    },

    bind: '{letters}',

    columns: [
        /*{
         text: 'View',
         xtype: 'actioncolumn',
         //Preview
         width: 50,
         tooltip: 'View Letter',
         iconCls: 'x-fa fa-search',
         handler: 'onPreview'
         },*/
        {
            text: 'View',
            xtype: 'actioncolumn',
            width: 60,
            hideable: false,
            items: [{
                iconCls: 'x-fa fa-search',
                tooltip: 'View Letter',
                handler: 'onViewLetter'
            }]
        },
        {
            text: 'Document ID',
            hidden: true,
            width: '100',
            dataIndex: 'DocumentID'
        }, {
            text: 'Letter Description',
            dataIndex: 'Subject',
            flex: 1
        }, {
            xtype: 'datecolumn',
            text: 'Issue Date',
            dataIndex: 'RecieptDate',
            width: 200
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        bind: '{letters}',
        keepParams: true,
        displayInfo: true,
        hideRefresh: true
    }
});
