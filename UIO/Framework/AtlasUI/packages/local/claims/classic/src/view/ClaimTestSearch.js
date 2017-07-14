/**
 * Created by akumar on 1/18/2017.
 */

Ext.define('Atlas.claims.view.ClaimTestSearch', {
    extend: 'Ext.Window',
    xtype: 'claims-claimtestsearchwindow',
    //Use object notation. This is needed because at the creation time we specify viewmodel config with parent
    //This way the content will be merged, rather than overwritten

    title: 'Claims Advanced Search',
    iconCls: 'x-fa fa-search',
    controller:'claimtestsearchcontroller',
    width: 900,
    height: 550,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            id: 'fpSearch',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 100,
                        width: 420
                    },
                    items: [
                        {
                            xtype: 'membertypeahead',
                            itemId: 'winCbxMember',
                            fieldLabel: 'Member',
                            matchFieldWidth: false,
                            emptyText: '[e.g. John]',
                            displayField:'MemberName',
                            valueField:'memberID',
                            forceSelection: true,
                            listeners: {
                                select: 'member_select'
                            }
                        },
                        {
                            xtype: 'prescribertypeahead',
                            itemId: 'winCbxPrescriber',
                            fieldLabel: 'Prescriber',
                            displayField: 'fullname',
                            forceSelection: true,
                            valueField: 'npi',
                            matchFieldWidth: false,
                            emptyText: '[e.g. Dr. Smith]',
                            listeners: {
                                select: 'prescriber_select'
                            }
                        },
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'winCbxNDC',
                            fieldLabel: 'NDC/Medication',
                            matchFieldWidth: false,
                            displayField: 'LN',
                            valueField: 'NDC',
                            forceSelection: true,
                            emptyText: '[e.g. Nexium]',
                            listeners: {
                                select: 'NDC_select'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    reference: 'authId',
                                    itemId: 'authId',
                                    labelWidth: 100,
                                    width: 220,
                                    fieldLabel:'Auth ID',
                                    hideTrigger: true,
                                    allowDecimals: false
                                },
                                {
                                    xtype: 'numberfield',
                                    reference: 'rxNum',
                                    itemId: 'rxNum',
                                    labelWidth: 70,
                                    width: 190,
                                    fieldLabel:'Rx Number',
                                    hideTrigger: true,
                                    allowDecimals: false
                                }
                            ]
                        }

                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 80,
                        width: 450
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 80
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    itemId: 'winDtFrom',
                                    fieldLabel: 'Date Range',
                                    value: (Ext.Date.add(Atlas.common.utility.Utilities.getLocalDateTime(), Ext.Date.DAY, -3)),
                                    listeners : {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange'
                                    },
                                    format: 'm/d/Y',
                                    width: 210
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'winDtTo',
                                    value: Atlas.common.utility.Utilities.getLocalDateTime(),
                                    format: 'm/d/Y',
                                    listeners : {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange'
                                    },
                                    width: 135
                                }
                            ]
                        },
                        {
                            xtype:'providertypeahead',
                            reference: 'providertypeahead',
                            itemId: 'winCbxProvider',
                            fieldLabel:'Provider',
                            forceSelection: true,
                            emptyText: '[e.g. Target Pharmacy MI 48188]',
                            listeners: {
                                select: 'provider_select'
                            }
                        },
                        {
                            xtype:'drugtypeahead',
                            fieldLabel:'GCN',
                            itemId: 'winCbxGCN',
                            displayField: 'GCN_SEQNO',
                            valueField: 'GCN_SEQNO',
                            emptyText: '[e.g. Nexium]',
                            listeners: {
                                select: 'GCN_select'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                labelWidth: 80
                            },
                            items: [
                                {
                                    xtype:'combobox',
                                    itemId: 'sortBy1',
                                    fieldLabel:'Sort By',
                                    queryMode: 'local',
                                    bind: {
                                        store: '{advancedsearchsort}'
                                    },
                                    displayField: 'text',
                                    valueField: 'value',
                                    value: 'ServiceDate DESC',
                                    width: 250
                                },
                                {
                                    xtype:'displayfield',
                                    value:'And'
                                },
                                {
                                    xtype:'combobox',
                                    itemId: 'sortBy2',
                                    queryMode: 'local',
                                    bind: {
                                        store: '{advancedsearchsort}'
                                    },
                                    displayField: 'text',
                                    valueField: 'value',
                                    value: 'TransactionID DESC',
                                    width: 170
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId : 'gpSearch',
            flex: 1,
            plugins: 'gridfilters',
            columns: [
                {
                    text: 'Claim #',
                    width: 100,
                    dataIndex: 'transactionID',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'Member Name',
                    width: 150,
                    dataIndex: 'memberFullName'
                },
                {
                    xtype: 'actioncolumn',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    width: 50,
                    align: 'center',
                    hideable: false,
                    handler: 'onRedirectMember'
                },
                {
                    text: 'Carrier',
                    width: 85,
                    dataIndex: 'Carrier'
                },
                {
                    text: 'Account',
                    width: 85,
                    dataIndex: 'Account'
                },
                {
                    text: 'LOB',
                    width: 85,
                    dataIndex: 'LOB'
                },
                {
                    text: 'NDC',
                    width: 85,
                    dataIndex: 'NDC'
                },
                {
                    text: 'Medication',
                    width: 85,
                    dataIndex: 'LN',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    text: 'Service Date',
                    width: 85,
                    dataIndex: 'serviceDate'
                },
                {
                    text: 'Status',
                    width: 85,
                    dataIndex: 'RespStat',
                    renderer: 'rendererClaimStatus'
                },
                {
                    text: 'Rx Num',
                    width: 85,
                    dataIndex: 'rxNum'
                },
                {
                    text: 'Pharmacy Name',
                    width: 150,
                    dataIndex: 'PharmacyName'
                },
                {
                    xtype: 'actioncolumn',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    width: 50,
                    align: 'center',
                    hideable: false,
                    handler: 'onRedirectPharmacy'
                },
                {
                    text: 'Prescriber Name',
                    width: 150,
                    dataIndex: 'prescriberName'
                },
                {
                    xtype: 'actioncolumn',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    width: 50,
                    align: 'center',
                    hideable: false,
                    handler: 'onRedirectPrescriber'
                }
            ],
            listeners: {
                itemdblclick: 'gpSearch_ItemDblClick'
            },
            bind: '{ClaimTestSearchData}',
            tbar: [
                {
                    xtype: 'combobox',
                    itemId:'cbxBatch',
                    queryMode: 'local',
                    fieldLabel: 'Display Batch',
                    name:'wrange',
                    bind: {store: '{claimmasterdatacount}'},
                    displayField:'wrange',
                    valueField:'wrange',
                    value: '1-2000',
                    hidden: true,
                    listeners: {
                        select: 'winBtnSearchClick'
                    }
                },
                {
                    xtype: 'displayfield',
                    hidden: true,
                    itemId: 'lbBatchDetail'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Search',
                    reference: 'search',
                    iconCls: 'fa fa-search',
                    handler: 'winBtnSearchClick'
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'fa fa-undo',
                    handler: 'winBtnResetClick'
                }
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId: 'gridPagingToolbar',
                    displayInfo: 'true',
                    pageSize: 10,
                    doRefresh: function() {
                        this.store.loadPage(1);
                    },
                    listeners: {
                        beforechange: 'getSelectedPageData'
                    }
                }
            ]
        }
    ]
});
