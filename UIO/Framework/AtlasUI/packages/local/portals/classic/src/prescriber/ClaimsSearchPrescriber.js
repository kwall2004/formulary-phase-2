/*
 * Last Developer: Srujith Cheruku
 * Date: 10-10-2016
 * Previous Developers: []
 * Origin: RxPrescriber- Claims Search Prescriber
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.view.prescriber.ClaimsSearchPrescriber', {
    extend: 'Ext.panel.Panel',
    region: 'center',
    title: 'Claims Details',
    viewModel: 'portalsClaimsSearchPrescriberModel',
    controller: 'portalsClaimsSearchPrescriberController',
    layout: 'border',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],
    items: [{

        xtype: 'panel',
        cls: 'card-panel',
        layout: 'hbox',
        region:'north',
        collapsible: true,
        title: 'Selection',
        iconCls: 'x-fa fa-search',

        items: [
            {
                xtype: 'container',
                layout: 'vbox',
                style: {padding: '10px'},
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Service Date From',
                    reference: 'dateFrom',
                    value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                    maxValue: new Date()

                },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Service Date To',
                        reference: 'dateTo',
                        value: new Date(),
                        labelWidth: 123
                    }]
            },

            {
                xtype: 'container',
                layout: 'vbox',
                style: {padding: '10px'},
                items: [{
                    xtype: 'portalmembertypeahead',
                    reference: 'claimsMemberCombo',
                    fieldLabel: 'Member ID',
                    hideLabel: false,
                    width: 350
                },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Status',
                        reference: 'claimsStatusCombo',
                        displayField: 'text',
                        valueField: 'value',
                        listeners: {
                            beforerender: 'loadStatuses'
                        }
                    }]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                style: {padding: '10px'},
                items: [{
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'fa fa-search',
                    handler: 'onSearchClick'
                },
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        text: 'Export To Excel',
                        iconCls: 'fa fa-file-excel-o',
                        handler: 'onExcelClick'
                    }]

            }]
    },
        {
            xtype: 'grid',
            cls: 'card-panel',
            region: 'center',
            reference: 'claimSearchPrescriberGrid',
            name: 'claimSearchPrescriberGrid',
            itemId: 'claimSearchPrescriberGrid',
            plugins: [{
                ptype: 'gridexporter'
            },
                'gridfilters'],
            columns: [{
                text: "Claim #",
                flex: 3,
                dataIndex: 'claimID',
                filter: {
                    type: 'string'
                }
            }, {
                text: "Medication",
                xtype: 'widgetcolumn',
                flex: 3,
                dataIndex: 'medication',
                widget: {
                    xtype: 'button',
                    iconCls: 'fa fa-medkit',
                    handler: 'onDrugSearchClick',
                    tooltip: 'Drug Information'
                },
                sortable: true
            }, {
                text: 'ETC',
                flex: 3,
                dataIndex: 'ETCName'
            }, {
                text: 'Service Date',
                flex: 2,
                dataIndex: 'svcdate',
                renderer: function(date) {
                    return Atlas.common.utility.Utilities.formatDate(date, 'm/d/Y');
                }
            }, {
                text: "Status",
                dataIndex: 'stat',
                flex: 2,
                renderer: function (value, meta, record) {
                    if (value == 'Rejected') {
                        meta.style = 'color:red;';
                    }
                    return value;
                }
            },

                {
                    text: "QTY",
                    dataIndex: 'qty'
                }, {
                    text: "Days Supply",
                    dataIndex: 'supply'
                }, {
                    text: "RX ID",
                    dataIndex: 'rxid'
                }, {

                    text: 'Pharmacy Name',
                    dataIndex: 'rxname'
                }, {
                    text: 'Member ID',
                    dataIndex: 'memberID'
                }, {
                    text: 'Member Name',
                    flex: 3,
                    dataIndex: 'memFullName'
                }, {
                    text: 'Prescriber',
                    dataIndex: 'drname'
                }, {
                    text: 'First Name',
                    dataIndex: 'memFirstName',
                    hidden: true
                }, {
                    text: 'Last Name',
                    dataIndex: 'memLastName',
                    hidden: true
                }, {
                    text: "Plan",
                    dataIndex: 'planGroupName',
                    flex: 2
                }, {
                    xtype: 'actioncolumn',
                    text: 'Create PA',
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    hideable: false,
                    items: [
                        {
                            xtype: 'button',
                            handler: 'onCreatePAClick',
                            iconCls: 'x-fa fa-archive',
                            text: 'Create PA',
                            tooltip: 'Create PA'
                        }
                    ],
                    renderer: function (value, meta, record) {
                        this.items[0].hidden = record.get('stat') === 'Paid';
                    }
                },
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    text: 'Hedis',
                    hideable: false,
                    items: [{
                        xtype: 'button',
                        handler: 'hedisAction',
                        iconCls: 'x-fa fa-bell'
                    }],
                    renderer: function (value, meta, record) {
                        this.items[0].hidden = record.get('HedisAlert') !== 'H';
                    }
                }],
            bind: {
                store: '{claimsHistory}'
            },
            // paging bar on the bottom
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                pageSize: 10,
                bind: {
                    store: '{claimsHistory}'
                },
                displayInfo: true
            }]
        }
    ]
});