Ext.define('Atlas.common.view.sharedviews.DeterminationHistory', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.DeterminationHistory',
    itemId: 'DeterminationHistoryGrid',
    xtype: 'common-DeterminationHistory',
    title: 'Determination History',
    controller: 'DeterminationHistoryController',
    viewModel: 'DeterminationHistoryModel',

    layout:{
        type:'fit',
        align:'stretch'
    },
    width : '100%',
    height : '100%',

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            bind: '{MemberDeteminationHistory}',
            pageSize: 25,
            displayInfo: true,
            dock: 'bottom'
        }
    ],

    listeners:{
        itemdblclick: 'onItemdblclick'
    },

    bind: {
        store: '{MemberDeteminationHistory}'
    },

    columns:{
        defaults:{
            width: 150,
            filter: { type: 'string'}
        },
        items:[
            { text: 'Auth ID', dataIndex: 'AuthID' },
            { text: 'Determination Type', dataIndex: 'DeterminationType', width: 230 },
            { text: 'GCN SEQ#', dataIndex: 'GCN_SEQNO' },
            { text: 'GPI Code', dataIndex: 'GPICode' },
            { text: 'NDC', dataIndex: 'NDC' },
            { text: 'Medication', dataIndex: 'medication' },
            { text: 'Status', dataIndex: 'authStatus' },
            { text: 'Carrier', dataIndex: 'carrierName' },
            { text: 'Account', dataIndex: 'AccountName' },
            { text: 'LOB', dataIndex: 'LOBName' },
            { text: 'Urgency Type', dataIndex: 'UrgencyTypeDesc' },
            { text: 'Effective Date', dataIndex: 'effDate', xtype: 'datecolumn', format:'m/d/Y'},
            { text: 'Term Date', dataIndex: 'termDate', xtype: 'datecolumn', format:'m/d/Y'},
            { text: 'Created Date', dataIndex: 'createDate', xtype: 'datecolumn', format:'m/d/Y'},
            { text: 'Modified Date', dataIndex: 'lastModified', xtype: 'datecolumn', format:'m/d/Y'},
            { text: 'Filled Date', dataIndex: 'filledDate' , xtype: 'datecolumn', format:'m/d/Y'}
        ]
    }

});
