/**
 * Created by T4317 on 11/7/2016.
 */
Ext.define('Atlas.claims.view.AdvancedSearch', {
    extend: 'Ext.Window',
    xtype: 'claims-claimssearchwindow',
    //Use object notation. This is needed because at the creation time we specify viewmodel config with parent
    //This way the content will be merged, rather than overwritten

    title: 'Advanced Search',
    iconCls: 'x-fa fa-search',
    controller:'advancedsearch',
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
                        width: 350
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
                            xtype: 'numberfield',
                            reference: 'rxNum',
                            itemId: 'rxNum',
                            fieldLabel:'Rx Number',
                            hideTrigger: true,
                            allowDecimals: false
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
                                    // listeners: {
                                    //     select: 'validateDateRange',
                                    //     focusleave: 'validateDateRange'
                                    // },
                                    //value: (Ext.Date.add(new Date(), Ext.Date.DAY, -3)),
                                    listeners : {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange',
                                        render: function(c) {
                                            c.setRawValue(Ext.Date.format(Ext.Date.add(Atlas.common.utility.Utilities.getLocalDateTime(), Ext.Date.DAY, -3), 'm/d/Y'));
                                        }
                                    },
                                    format: 'm/d/Y',
                                    width: 210
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'winDtTo',
                                    //value: new Date(),
                                    listeners : {
                                        select: 'validateDateRange',
                                        focusleave: 'validateDateRange',
                                        render: function(c) {
                                            c.setRawValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                        }
                                    },
                                    format: 'm/d/Y',
                                    // listeners: {
                                    //     select: 'validateDateRange',
                                    //     focusleave: 'validateDateRange'
                                    // },
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
                    dataIndex: 'claimID',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Member Name',
                    dataIndex: 'memberName',
                    width: 150,
                    widget: {
                        xtype: 'button',
                        flex : 1,
                        iconCls: 'x-fa fa-arrow-circle-right',
                        handler: 'onRedirectMember'
                    }
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
                    dataIndex: 'ndc'
                },
                {
                    text: 'Medication',
                    width: 85,
                    dataIndex: 'medication',
                    filter: {
                        type: 'string'
                    }
                },
                {
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    text: 'Service Date',
                    width: 85,
                    dataIndex: 'svcdate',
                    renderer: 'rendererServiceDate'
                },
                {
                    text: 'Status',
                    width: 85,
                    dataIndex: 'stat',
                    renderer: 'rendererClaimStatus'
                },
                {
                    text: 'Rx Num',
                    width: 85,
                    dataIndex: 'rxnum'
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Pharmacy Name',
                    dataIndex: 'rxname',
                    width: 150,
                    widget: {
                        xtype: 'button',
                        width: 140,
                        iconCls: 'x-fa fa-arrow-circle-right',
                        handler: 'onRedirectPharmacy'
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Prescriber Name',
                    dataIndex: 'drname',
                    width: 150,
                    widget: {
                        xtype: 'button',
                        width: 140,
                        iconCls: 'x-fa fa-arrow-circle-right',
                        handler: 'onRedirectPrescriber'
                    },
                    onWidgetAttach: function(col, widget, rec) {
                        widget.setVisible(rec.get('drname'));
                        col.mon(col.up('gridpanel').getView(), {
                            itemupdate: function() {
                                widget.setVisible(rec.get('drname'));
                            }
                        });
                    }
                }
            ],
            listeners: {
                itemdblclick: 'gpSearch_ItemDblClick'
            },
            bind: '{advancedsearchbybatch}',
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
                    itemId: 'searchGridPagingToolbar',
                    pageSize: 16,
                    bind: '{advancedsearchbybatch}',
                    listeners: {
                        afterrender: function() {
                            this.getComponent('refresh').hide();
                        }
                    },
                    displayInfo: true,
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'combobox',
                            itemId:'cbxFilterBy',
                            queryMode: 'local',
                            dock: 'bottom',
                            emptyText: 'Filter By Claim Status',
                            bind: {store: '{ClaimTransStatusStore}'},
                            displayField:'name',
                            valueField:'value',
                            listeners: {
                                select: 'winBtnSearchClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

