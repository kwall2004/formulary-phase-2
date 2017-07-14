/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.ClaimsSearch', {
    extend: 'Ext.Window',
    xtype: 'casemanagementClaimsSearch',
    itemId: 'winClaimSearch',
    title: 'Search',
    width: 940,
    height: 500,
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'MeridainRx ID',
                    itemId: 'lblRecipientId'
                },
                {
                    xtype: 'combobox',
                    itemId: 'cbxPrescriberSearch',
                    fieldLabel: 'Prescriber',
                    emptyText: '[e.g. Dr. Smith]',
                    displayField: 'Prescribername',
                    valueField: 'NPI',
                    hidden: true,
                    bind: {
                        //value: '{cdmodel.InTake}',
                        //store: '{storereceivedvia}'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Date Range',
                    itemId: 'fromDate',
                    width : 90,
                    flex:0.8,
                    format: 'n/j/Y'
                },
                {
                    xtype: 'datefield',
                    format: 'n/j/Y',
                    width : 90,
                    flex:0.5,
                    itemId: 'toDate'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'drugtypeahead',
                    emptyText: '[e.g. Nexium]',
                    fieldLabel: 'NDC',
                    width:403,
                    displayField: 'LN',
                    valueField: 'NDC',
                    itemId: 'cbxMedication2'
                },

                {
                    xtype: 'drugtypeahead',
                    itemId: 'cbxGCN',
                    fieldLabel: 'GCN',
                    flex:1,
                    labelWidth : 100,
                    emptyText: '[e.g. Nexium]',
                    displayField: 'GCN_SEQNO',
                    valueField: 'GCN_SEQNO',
                    listConfig: {
                        // Custom rendering template for each item
                        userCls: 'common-key-value-boundlist',
                        getInnerTpl: function () {
                            return '<h5>NDC:<span>{NDC}</span></h5>' +
                                '<h5>Label:<span>{LN}</span></h5>' +
                                '<h5>Brand:<span>{BN}</span></h5>' +
                                '<h5>GCN:<span>{GCN_SEQNO}</span></h5>'
                        }
                    }
                }

            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [

                {
                    xtype: 'button',
                    text: 'Search',
                    handler: 'OnSearchClick'
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    handler: 'onReset'
                }
            ]

        },
        {
            xtype: 'grid',
            itemId: 'claimsSearchgrid',
            bind: '{StoreClaimsSearch}',

            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true
            },
            plugins: [
                {
                    ptype: 'gridexporter'
                }
            ], flex: 2,
            columns: {
                items: [
                    {

                        text: 'Claim #',
                        dataIndex: 'claimID'
                    },
                    {
                        text: 'Member Name',
                        dataIndex: 'memberName'

                    },
                    {
                        text: 'NDC',
                        dataIndex: 'ndc'

                    },
                    {
                        text: 'Medication',
                        dataIndex: 'medication'

                    },
                    {
                        text: 'ETC',
                        dataIndex: 'ETCName'

                    },
                    {
                        text: 'Service Date',
                        dataIndex: 'svcdate'

                    },
                    {
                        text: 'Status',
                        dataIndex: 'stat'

                    },
                    {
                        text: 'Rx Num',
                        dataIndex: 'rxnum'

                    },
                    {
                        text: 'Pharmacy Name',
                        dataIndex: 'rxname'

                    },
                    {
                        text: 'Prescriber NPI',
                        dataIndex: 'npi'

                    },
                    {
                        text: 'Prescriber Name',
                        dataIndex: 'drname'
                    }]
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom', items: [
                    {
                        xtype: 'pagingtoolbar',
                        bind: '{StoreClaimsSearch}',
                        displayInfo: true,
                        hideRefresh: true
                    }]
                }

            ]

        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom', items: [
            '->',
            {
                xtype: 'button',
                text: 'Add to Medication Profile',
                iconCls: 'fa fa-save',
                handler: 'setMedicationProfileFromClaims'
            }
            , {
                xtype: 'button', text: 'Close', iconCls: 'fa fa-remove',handler: 'CloseMedication' //handler: 'btn_Cancel'
            }
        ]
        }
    ]


})