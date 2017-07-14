Ext.define('Atlas.prescriber.view.detail.PriorAuth', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.prescriber-priorauth',
    title: 'Prior Auth',
    reference:'priorauthgrid',
    controller: 'prescriberpriorauthcontroller',

    viewModel: {
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: false,
                update: false,
                destroy: false
            }
        }
    },


    listeners:{
        itemdblclick: 'onItemdblclick',
        render: 'onRender'
    },

    plugins: 'gridfilters',

    bind: {
        store: '{priorauths}'
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
            { text: 'Urgency Type', dataIndex: 'UrgencyType' },
            { text: 'Effective Date', dataIndex: 'effDate', xtype: 'datecolumn',   format:'m/d/Y', filter: { type: 'date'}  },
            { text: 'Term Date', dataIndex: 'termDate', xtype: 'datecolumn',   format:'m/d/Y', filter: { type: 'date'}  },
            { text: 'Created Date', dataIndex: 'createDate', xtype: 'datecolumn',   format:'m/d/Y', filter: { type: 'date'}  },
            { text: 'Modified Date', dataIndex: 'lastModified', xtype: 'datecolumn',   format:'m/d/Y', filter: { type: 'date'}  },
            { text: 'Filled Date', dataIndex: 'filledDate' , xtype: 'datecolumn',   format:'m/d/Y', filter: { type: 'date'} }
        ]
    },
    bbar:{
        xtype:'pagingtoolbar',
        displayInfo: true,
        pageSize: 24
    }
});