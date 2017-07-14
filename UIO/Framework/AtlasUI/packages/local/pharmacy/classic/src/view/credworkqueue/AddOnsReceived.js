Ext.define('Atlas.pharmacy.view.credworkqueue.AddOnsReceived', {
    extend: 'Ext.grid.Panel',
    xtype: 'credworkqueue-addonsrecieved',
    reference: 'credworkqueue-addonsrecieved',
    title: {
        bind: '{addOnsReceivedLbl}'
    },

    bind: '{addOnsReceived}',
    selModel: {
        type: 'rowmodel',
        singleSelect: false
    },

    columns: {
        defaults: {
            flex: 2,
            align: 'center'
        },
        items: [{
            xtype: 'actioncolumn',
            hideable : false,
            text: '',
            align: 'center',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-paper-plane',
                tooltip: 'Go To',
                handler: function(grid, rowIndex) {
                    var gridPanel = grid.up('panel'),
                        accordionPanel = gridPanel.up('panel'),
                        topPanel = accordionPanel.up('panel'),
                        vc = topPanel.controller;
                    vc.onRouteToPharmacyClick(grid, rowIndex);
                }
            }]
        },        {
            text: 'Cred Level',
            dataIndex: 'CredLevel',
            flex: 1.5,
            filter: {
                type: 'string',
                dataIndex:'CredLevel'
            }
        }, {
            text: 'NCPDP',
            dataIndex: 'NCPDPId',
            flex: 1,
            filter: {
                type: 'string',
                dataIndex:'NCPDPId'
            }
        },  {
            text: 'Pharmacy Name',
            dataIndex: 'PharmName',
            filter: {
                type: 'string',
                dataIndex:'PharmName'
            },
            align: 'left'
        },  {
            text: 'Relationship Id',
            dataIndex: 'RelationshipId',
            filter: {
                type: 'string',
                dataIndex:'RelationshipId'
            }

        }, {
            text: 'Relationship Name',
            dataIndex: 'RelName',
            filter: {
                type: 'string',
                dataIndex:'RelName'
            }

        }, {
            text: 'Credential Start Date',
            dataIndex: 'CredStDate',
            renderer: function(value, field){
                return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
            }
           /* renderer:function(value)
            {
                var strDate = '',
                    arrDate = value.split('-');
                if(arrDate.length == 3){
                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                }
                return strDate;
            }*/
        }, {
            text: 'Staff Name',
            dataIndex: 'StaffName',
            align: 'left'
        }, {
            text: 'Days in Queue',
            dataIndex: 'DaysinQ',
            flex: 1.5
        }, {
            text: 'Credentialing Status',
            dataIndex: 'CredStatus'
        }, {
            text: 'Credentialing LogId',
            dataIndex: 'credLogId'
        },{
            xtype: 'actioncolumn',
            text: 'Acknowledge',
            hideable : false,
            align: 'center',
            flex: 1,
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-check',
                tooltip: 'Acknowledge',
                handler: function(grid, rowIndex) {
                    var gridPanel = grid.up('panel'),
                        accordionPanel = gridPanel.up('panel'),
                        topPanel = accordionPanel.up('panel'),
                        vc = topPanel.controller,
                        vm = topPanel.viewModel;
                    vc.onAcknowledgeClick(grid, rowIndex, vm.data.addOnsReceivedPnl);
                }
            }]
        }]
    },
    plugins:[
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'gridfilters'
        }

    ],
    listeners: {
        rowdblclick: 'onGridDblClick',
        'afterrender': function (grid) {
            var view = grid.getView();
       }
    },
    dockedItems: [{
        xtype: 'toolbar',
        itemId: 'gridTbar',
        dock: 'top',
        flex: 1,
        items: ['->',{
            xtype: 'button',
            text: 'Export To Excel',
            handler: function(button) {
                var gridPanel = button.up('panel'),
                    accordionPanel = gridPanel.up('panel'),
                    topPanel = accordionPanel.up('panel'),
                    vc = topPanel.controller;
                vc.onCredWorkQueueExportClick(gridPanel, 'AddOnsReceived');
            }
        }]
    },
        {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: 'true',
        pageSize: 25,
        hideRefresh: true,
        bind: {
            store: '{addOnsReceived}'
        }
    }

    ]

});
