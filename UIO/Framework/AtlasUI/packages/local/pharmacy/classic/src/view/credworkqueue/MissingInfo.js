Ext.define('Atlas.pharmacy.view.credworkqueue.MissingInfo', {
    extend: 'Ext.grid.Panel',
    xtype: 'credworkqueue-missinginfo',
    reference: 'credworkqueue-missinginfo',

    title: {
        bind: '{missingInfoLbl}'
    },

    bind: '{missingInfo}',

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
            flex: 1,
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
            text: 'NCPDP Id',
            dataIndex: 'NCPDPId',
            filter: {
                type: 'string',
                dataIndex:'NCPDPId'
            }
        }, {
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
        }, {
            text: 'Staff Name',
            dataIndex: 'StaffName'
        }, {
            text: 'Credentialing Type',
            dataIndex: 'CredType',
            flex: 2
        }, {
            text: 'Days Left',
            dataIndex: 'DaysLeft',
            flex: 1.5
        }, {
            text: 'Credentialing Status',
            dataIndex: 'CredStatus'
        }, {
            text: 'Credentialing LogId',
            dataIndex: 'credLogId'
        },{
            xtype: 'actioncolumn',
            hideable : false,
            text: 'Acknowledge',
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
                    vc.onAcknowledgeClick(grid, rowIndex, vm.data.missingInfoPnl);
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
            handler: function(button, event) {
                var gridPanel = button.up('panel'),
                    accordionPanel = gridPanel.up('panel'),
                    topPanel = accordionPanel.up('panel'),
                    vc = topPanel.controller;
                 vc.onCredWorkQueueExportClick(gridPanel, 'MissingInfo');
            }
        }]
    },{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: 'true',
        pageSize: 10,
        hideRefresh: true,
        bind: {
            store: '{missingInfo}'
        }
    }]

});
