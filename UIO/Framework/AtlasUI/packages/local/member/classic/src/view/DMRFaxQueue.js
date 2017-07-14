/**
 * Created by d3973 on 10/27/2016.
 */
Ext.define('Atlas.member.view.DMRFaxQueue', {
    extend: 'Ext.window.Window',
    controller: 'memberdmrfaxqueuecontroller',
    viewModel: 'dmrfaxqueueviewmodel',
    title: 'DMR Fax Queue',
    modal: true,
    id: 'showDMRFaxQueue',
    width: 745,
    autoShow: true,
    /*listeners:{
        afterrender: 'searchFaxes'
    },*/
    hiddenValues: {
        faxDocID: null,
        faxSystemID: null,
        confirmFaxSystemId: '',
        viewAttachmentDisabled: true
    },
    items: [{
        xtype: 'panel',
        title: 'Filter Fax Q',
        iconCls: 'x-fa fa-search',
        layout: 'hbox',
        width: '100%',
        id: 'topPanelFilterFax',
        items: [{
            xtype: 'combobox',
            id: 'faxType',
            bind: {
                store: {
                    fields: [
                        'faxQType',
                        'val'
                    ],
                    data: [{
                        'faxQType': 'New Fax',
                        'val': ''
                    }, {
                        'faxQType': 'Acknowledged Faxes',
                        'val': 'Y'
                    }]
                }
            },
            editable: false,
            valueField: 'val',
            displayField: 'faxQType',
            value: ''
        }, {
            xtype: 'datefield',
            fieldLabel: 'Rcvd between',
            id: 'fromDateFaxType'
        }, {
            xtype: 'datefield',
            id: 'toDateFaxType',
            altFormats: 'm/d/Y'
        }, {
            xtype: 'button',
            text: 'Search',
            id: 'searchFaxQueue',
            listeners: {
                click: 'searchFaxes'
            }
        }, {
            xtype: 'button',
            text: 'Reset'
        }]
    }, {
        xtype: 'gridpanel',
        height: 300,
        plugins: [
            'gridfilters'
        ],
        scrollable: true,
        bind: {
            store: '{faxQDocuments}'
        },
        columns: [{
            text: 'View',
            xtype: 'actioncolumn',
            items: [{
                iconCls: 'x-fa fa-file-pdf-o',
                xtype: 'button',
                tooltip: 'View fax'
            }]
        }, {
            text: 'ID(*Filter)',
            dataIndex: 'DocumentID',
            filter: {
                type: 'number'
            }
        }, {
            text: 'Date Rcvd.',
            dataIndex: 'RecieptDate',
            filter: {
                type: 'date'
            }
        }, {
            text: 'Time Rcvd.',
            dataIndex: 'RecieptTime',
            filter: {
                type: 'string'
            }
        }, {
            text: 'SystemID',
            hidden: true,
            dataIndex: 'SystemID',
            filter: {
                type: 'number'
            }
        }, {
            text: 'Assign To',
            hidden: true,
            dataIndex: 'AssignTo',
            filter: {
                type: 'string'
            }
        }, {
            text: 'AckDate',
            hidden: true,
            dataIndex: 'AcknowledgeDate',
            filter: {
                type: 'date'
            }
        }, {
            text: 'Initiate DMR',
            xtype: 'actioncolumn',
            items: [{
                iconCls: 'x-fa fa-plus-square-o',
                xtype: 'button',
                tooltip: 'Initiate DMR from this fax',
                text: 'Initiate DMR'
            }]
        }, {
            text: 'Acknowledge',
            xtype: 'actioncolumn',
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-check',
                text: 'Acknowledge',
                listeners: {
                    render: 'checkAcknowledged'
                }
            }]
        }],
        dockedItems: [{
            dock: 'bottom',
            xtype: 'pagingtoolbar'
        }]
    }]
});