/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.CustomNDCSetup', {
    extend: 'Ext.panel.Panel',
    xtype: 'customndcetup',
    /*viewModel: {
     type: 'cdagviewmodel'
     },*/
    viewModel: 'customndcetupviewmodel',

    //itemId: 'cdagmain',
    title: 'Custom NDC Setup',
    controller: 'customndcetupcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    tbar: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [

                {
                    xtype: 'combobox',
                    emptyText: '[e.g. Nexium]',
                    itemId: 'cbxNDC',
                    fieldLabel: 'NDC',
                    labelWidth:30,
                    width: 350,
                    displayField: 'LN',
                    minChars: 3,
                    valueField: 'NDC',
                    hideLabel: false,
                    typeAhead: false,
                    hideTrigger:true,
                    bind: {
                        store:'{storeMedication}'
                    },
                    listConfig: {
                        // Custom rendering template for each item
                        userCls: 'common-key-value-boundlist',
                        getInnerTpl: function() {
                            return '<h4>{LN}</h4> - {LBLRID}' +
                                '<h5>NDC:<span>{NDC}</span> GCN:<span>{GCN_SEQNO}</span> HICL SEQ NO:<span>{HICL_SEQNO}</span></h5>'
                        }
                    },
                    listeners: {
                        select: 'cbxNDC_Select',
                        beforequery: function (queryPlan) {
                            var filter = queryPlan.query;

                            filter = filter.trim();
                            filter = filter.replace("'", "");

                            var pFilter = filter.split(/,| /);

                            var strWrd = "wrdidx contains '";
                            for (var j = 0; j < pFilter.length; j++)
                            {
                                if (pFilter[j] != "")
                                {
                                    strWrd = strWrd + pFilter[j] + "* ";
                                }
                            }
                            queryPlan.query = strWrd + "'";
                        }
                    },
                    /*displayField: 'BN',
                    valueField: 'BN',*/
                    queryParam: 'pWhere',
                    pageSize: 10
                    //viewModel: 'formulary'
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'x-action-col-icon x-fa fa-undo',
                    handler: 'btnResetClick'
                }
            ]
        }
        ,
        '->',
        {
            xtype: 'button',
            text: 'Export To Excel',
            iconCls: 'x-fa fa-file-excel-o',
            handler: 'btnExportClick'
        },
        {
            xtype: 'button',
            text: 'Add NDC',
            iconCls: 'fa  fa-plus-circle',
            handler: 'btnAddNDCClick'
        }

    ],
    items: [
        {
            xtype: 'panel',
            title: 'NDC Details:',
            border: true,
            flex: 0.5,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpNDCDetails',

                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'NDC', dataIndex: 'NDC'
                            },
                            {
                                text: 'GCN_SEQNO', dataIndex: 'GCN_SeqNo'
                            },
                            {

                                text: 'LN', dataIndex: 'LN'
                            },
                            {
                                text: 'Price Date', dataIndex: 'NPT_DATEC',
                                xtype: 'datecolumn',
                                format: 'm/d/Y'
                            },
                            {
                                text: 'Unit Price', dataIndex: 'NPT_PRICEX',   xtype: 'numbercolumn', format: '$0,0.00000'
                            },
                            {
                                xtype: 'actioncolumn',
                                dataIndex: 'NDC',
                                width: 50,
                                hideable: false,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-arrow-circle-right',
                                    // Use a URL in the icon config
                                    tooltip: 'NDC History',
                                    handler: 'btnNDCHistory_Click'

                                }]
                            }
                        ]
                    },
                    plugins: [{
                        ptype: 'gridexporter'
                    }],
                    bind: '{storeNDCDetail}',
                    listeners: {
                        itemdblclick: 'gpNDCDetails_ItemDblClick',
                        select: 'gpNDCDetails_RowClick'
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: '{storeNDCDetail}',
                            displayInfo: true,
                            hideRefresh:true,
                            pageSize: 10,
                            dock: 'bottom'
                        }

                    ]
                }]
        },
        {
            xtype: 'panel',
            title: 'Formulary Details:',
            border: true,
            layout: 'fit',
            flex: 0.5,
            items: [
                {
                    xtype: 'grid',
                    disabled: true,

                    itemId: 'gpFormularyDetail',
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddFormularyClick'
                        },
                        '->',
                        {
                            xtype: 'button',
                            disabled: true,
                            text: 'Submit for Approval',
                            itemId: 'btnApproval',
                            iconCls: 'x-fa fa-tasks',
                            handler: 'btnSubmitforApprovalClick'
                        }
                        ,
                        {
                            xtype: 'button',
                            text: 'Approve',
                            disabled: true,
                            itemId: 'btnApprove',
                            iconCls: 'x-fa fa-check',
                            handler: 'btnApprove_Click'
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            text: 'Reject',
                            itemId: 'btnReject',
                            iconCls: 'fa fa-remove',
                            handler: 'btnRejectClick'
                        },
                        {
                            xtype: 'button',
                            disabled: false,
                            text: 'Save',
                            itemId:'btnSave',
                            iconCls: 'fa fa-save',
                            handler: 'btnSaveClick'
                        }

                    ],

                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Formulary Name', dataIndex: 'FormularyId',
                                renderer: 'rendererFormulary',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'combobox',
                                    itemId: 'cbxFormularyList',
                                    displayField: 'FormularyName',
                                    valueField: 'FormularyID',
                                    bind: {
                                        store: '{storeFormularyName}'
                                    },
                                    listeners: {
                                        select: 'cbxFormularyList_Select'
                                    }
                                }
                            },
                            {
                                text: 'Formulary Tier', dataIndex: 'FormularyTierId',
                                renderer: 'rendererFormularyTier',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'combobox',
                                    itemId: 'cbxFormulary_Tier',
                                    displayField: 'TierDesc',
                                    valueField: 'FormularyTierID',
                                    bind: {
                                        store: '{storeFormularyTiers}'
                                    }
                                }
                            },
                            {
                                text: 'PA IND', dataIndex: 'PAInd',
                                renderer: function (value) {
                                    if(value==true)
                                    {
                                        return "Yes";
                                    }
                                    else
                                    {
                                        return "No"
                                    }
                                },
                                editor: {
                                    xtype: 'checkbox'
                                }
                            },
                            {
                                text: 'Qty Limit', dataIndex: 'QtyLimit',
                                editor: {
                                    xtype: 'numberfield',
                                    maxValue: 999999,
                                    minValue: 0
                                }
                            },
                            {
                                text: 'Qty Time Period', dataIndex: 'QtyLmtTimePeriod',
                                renderer: 'rendererQtyLmtTimePeriod',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxQty_Time_Period',
                                    displayField: 'name',
                                    valueField: 'value',
                                    bind: {
                                        store: '{storeTimePeriod}'
                                    }
                                }
                            },
                            {
                                text: 'Days Supply', dataIndex: 'DaysSupply',
                                editor: {
                                    xtype: 'numberfield',
                                    maxValue: 999,
                                    minValue: 0
                                }
                            },
                            {
                                text: 'Days Supply Time Period', dataIndex: 'DaysSupplyTimePeriod',
                                renderer: 'rendererDaysSupplyTimePeriod',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxDaysSupplyTimePeriod',
                                    displayField: 'name',
                                    valueField: 'value',
                                    bind: {
                                        store: '{storeTimePeriod}'
                                    }
                                }
                            },
                            {
                                text: 'Status', dataIndex: 'RuleStatusDesc'
                            },
                            {
                                text: 'Approved By', dataIndex: 'ApprovedBy'
                            },
                            {
                                text: 'Approved On', dataIndex: 'ApprovedOn',
                                xtype: 'datecolumn',
                                format: 'm/d/Y'
                            },
                            {
                                text: 'Approval Notes', dataIndex: 'Notes'
                            },
                            {
                                xtype: 'widgetcolumn',
                                align: 'center',
                                widget: {
                                    xtype: 'button',
                                    width:75,
                                    text: 'Reject',
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {

                                        tooltip: 'Reject '
                                    },
                                    handler: 'onUndoChangeClick'

                                },
                                onWidgetAttach: function(col, widget, rec) {

                                    widget.setVisible(rec.get('isUpdated'));
                                    col.mon(col.up('gridpanel').getView(), {
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }

                            }
                        ]
                    },
                    bind: '{storeFormularyDetail}',
                    selType: 'checkboxmodel',
                    selModel: {
                        injectCheckbox: 0,
                        pruneRemoved: false,
                        showHeaderCheckbox: false
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        errorSummary: false,
                        autoCancel: false,
                        width: 300,
                        listeners: {
                            'canceledit': function (rowEditing, context) {
                                if (context.record.phantom) {
                                    if(context.record.data.FormularyId==0)
                                    context.store.remove(context.record);
                                }
                            },
                            edit: 'completeEdit'
                        }
                    }],
                    listeners: {
                        beforeedit: 'gpFormularyDetail_beforeedit',
                        select: 'gpFormularyDetail_RowClick'
                    },
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            hideRefresh:true,
                            bind: '{storeFormularyDetail}',
                            displayInfo: true,
                            dock: 'bottom'
                        }

                    ]
                },
                {
                    xtype: 'hidden', itemId: 'hdnSelectedNDC'
                },
                {
                    xtype: 'hidden', itemId: 'hidApproveCustomNDCAccess'
                }
            ]

        }
    ]
})
