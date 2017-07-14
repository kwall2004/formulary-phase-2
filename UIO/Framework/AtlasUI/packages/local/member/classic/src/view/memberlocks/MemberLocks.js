/*
    Developer: Tremaine Grant
    Description: A view shows the member locks.
                  
*/
Ext.define('Atlas.member.view.memberlocks.MemberLocks', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'member-memberlocks-memberlocks',

    controller:'memberlocksgrid',
    viewModel:{
        stores: {
            memberlockstore: {
                model: 'Atlas.member.model.MemberLocksModel',
              //  remoteFilter: true,
                pageSize: 25,
                remoteSort:true
            },
            memlockstatusstore: {
                type: 'clonestore',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'MemberLockStatus'
                    },
                    url: 'shared/{0}/listitems'
                }
            },
            memberlocktypestore:
            {
                fields:['name','value'],
                data:[
                    {"name":"Pharmacy","value":"ncpdp"},
                    {"name":"Prescriber","value":"npi"}
                ]

            }
        }
    },
    bind:{
        store: '{memberlockstore}'
    },
    title:'Member Locks',
    reference: 'locksTable',
    itemId:'dataGrid',
    plugins: [{
        ptype: 'gridexporter'

    }],
    columns:[
        {text:'MeridianRX ID',hidden:true,dataIndex:'recipientID',flex:1},
        {text:'System ID',hidden:true,dataIndex:'systemID',flex:1},
        {text:'Member ID', dataIndex:'memberID',flex:1},
        {text:'Member Name', dataIndex:'memberName',flex:1},
        {text:'Carrier', dataIndex:'Carrier',flex:1},
        {text:'Account', dataIndex:'Account',flex:1},
        {text:'LOB', dataIndex:'LOB'},
        {text:'Lock Type', dataIndex:'lockType'},
        {text:'Pharmacy/Prescriber', dataIndex:'lockName',flex:1},
        {text:'Current Lock ID', dataIndex:'currentLockID',flex:1},
        {text:'Proposed Lock ID', dataIndex:'newLockID',flex:1},
        {text:'Current Status', dataIndex:'currentStatus',flex:1},
        {text:'Proposed Status', dataIndex:'toBeStatus',flex:1},
        {text:'Action',hidden:true,dataIndex:'action',flex:1},
        {text:'Created Date',hidden:true,dataIndex:'createdDate',flex:1,format:'m/d/Y',xtype: 'datecolumn'},
        {text:'Created By',hidden:true,dataIndex:'createdBy',flex:1},
        {text:'Last Modified',hidden:true,dataIndex:'lastModified',flex:1,xtype: 'datecolumn',format:'m/d/Y'},
        {text:'Approval Date',hidden:true,dataIndex:'approvalDate',flex:1,format:'m/d/Y',xtype: 'datecolumn'},
        {text:'Approved By',hidden:true,dataIndex:'approvedBy',flex:1}
    ],
    dockedItems:[
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'combobox',fieldLabel:'Lock Type',itemId:'cbxLockType',
                    queryMode:'local',displayField:'name',valueField:'value',emptyText:'[Lock Type]',labelWidth:85,
                    bind: {
                        store:'{memberlocktypestore}'
                    }
                }, '-',
                {
                    xtype:'combobox',
                    fieldLabel:'Lock Status',
                    bind:{
                        store:'{memlockstatusstore}'
                    },
                    displayField:'name',
                    valueField:'value',
                    itemId:'cbxLockStatus',
                    emptyText:'[Lock Status]',
                    labelWidth:85,
                    width : 260
                },'-',
                {
                    xtype:'button', text:'Search', iconCls :'fa fa-search',handler:'onSearchClick'
                },'->',
                {
                    xtype:'button',text:'Export to Excel',iconCls:'fa fa-file-excel-o',handler:'ExportToExcel'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            bind: {
                store: '{memberlockstore}'
            }
        }
    ],
    listeners: {
        itemdblclick: 'onItemDblClick'
    }
});