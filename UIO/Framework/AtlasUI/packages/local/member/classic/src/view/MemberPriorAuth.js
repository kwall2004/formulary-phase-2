/**
 * Created by j2487 on 11/2/2016.
 */
Ext.define('Atlas.member.view.MemberPriorAuth', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    alias: 'widget.member-priorauth',
    title: 'Prior Auth',
    reference:'priorauthgrid',
    controller: 'memberpriorauthcontroller',
    xtype: 'member-memberpriorauth',
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
        rowdblclick: 'onRowDblClick',
        render: 'onRender'
    },

    plugins: 'gridfilters',

    bind: {
        store: '{memberpriorauths}'
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
            { text: 'Status', dataIndex: '' },
            { text: 'Carrier', dataIndex: 'carrierName' },
            { text: 'Account', dataIndex: 'AccountName' },
            { text: 'LOB', dataIndex: 'LOBName' },
            { text: 'Urgency Type', dataIndex: 'UrgencyType' },
            { text: 'Effective Date', dataIndex: 'effDate', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'Term Date', dataIndex: 'termDate', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'Created Date', dataIndex: 'createDate', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'Modified Date', dataIndex: 'lastModified', xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'}  },
            { text: 'Filled Date', dataIndex: 'filledDate' , xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'} }
        ]
    },
    bbar:{
        xtype:'pagingtoolbar',
        displayInfo: true,
        pageSize: 24
    }
});