/**
 * Created by d3973 on 10/3/2016.
 */
Ext.define('Atlas.admin.view.EDIFileInfo', {
    extend: 'Ext.grid.Panel',
    xtype: 'admin-edifileinfo',
    title: 'EDI File Info',
    controller: 'admin-edifileinfo',
    viewModel: 'edifileinfo',
    reference: 'admin-edifileinfo',
    multiSelect: true,
    columns: {
        /*defaults: {
         flex: 1
         },*/
        items: [

            {
                text: 'File Pattern',
                dataIndex: 'filePattern',
                editor: {
                    allowBlank: false
                },
                filter: {
                    type: 'string'
                },
                flex: 1
            },
            {
                text: 'Carrier Name',
                dataIndex: 'carrierId',
                renderer: 'getCarrierName',
                editor: {
                    xtype: 'combo',
                    reference: 'carrierNameCombo',
                    allowBlank: false,
                    forceSelection:true,
                    bind: {
                        store: '{allCarrierInfo}'
                    },
                    selectOnFocus: true,
                    displayField: 'carrierName',
                    queryMode: 'local',
                    valueField: 'carrierId',
                    listeners: {
                        select: 'onUpdateCarrierName'
                    }

                },
                flex: 1,
                filter: {
                    type: 'string',
                    dataIndex:'carrierName'


                }
            },
            {
                text: 'Carrier Account Name',
                dataIndex: 'carrierAcctNumber',
                renderer: 'getCarrierAccountName',
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    reference: 'carrierAcctNumberCombo',
                    forceSelection:true,
                    selectOnFocus: true,
                    displayField: 'accountName',
                    queryMode: 'local',
                    valueField: 'carrierAcctNumber'

                },
                flex: 1,
                filter: {
                    type: 'string',
                    dataIndex:'carrierAcctName'
                }
            },
            {
                text: 'Carrier LOB Name',
                dataIndex: 'carrierLOBId',

                renderer: 'getCarrierLobName',
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    reference: 'carrierLobNameCombo',
                    forceSelection:true,
                    selectOnFocus: true,
                    displayField: 'lobName',
                    queryMode: 'local',
                    valueField: 'carrierLOBId'

                },
                flex: 1,
                filter: {
                    type: 'string',
                    dataIndex:'carrierLOBName'
                }
            },
            {
                text: 'Partner Name',
                dataIndex: 'partnerId',
                renderer: 'getPartnerName',
                editor: {
                    xtype: 'combo',
                    reference: 'partnerNameCombo',
                    bind: {
                        store: '{ediPartners}'
                    },
                    forceSelection:true,
                    queryMode: 'local',
                    selectOnFocus: true,
                    displayField: 'partnerName',
                    valueField: 'partnerId'

                },
                flex: 1,
                filter: {
                    type: 'string',
                    dataIndex:'partnerName'
                }
            },
            {
                text: 'File Type',
                dataIndex: 'fileType',
                editor: {
                    xtype: 'combo',
                    reference: 'fileTypeCombo',
                    bind: {
                        store: '{listDetails}'
                    },
                    forceSelection:true,
                    queryMode: 'local',
                    selectOnFocus: true,
                    displayField: 'name',
                    valueField: 'name'

                },
                flex: 1
            },
            {
                text: 'Program Name',
                dataIndex: 'programName',
                editor: {},
                flex: 1,
                filter: {
                    type: 'string'
                }
            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                width: 100,
                hideable : false,
                widget: {
                    xtype: 'container',
                    bind: true,
                    defaults: {
                        xtype: 'tool',
                        viewModel: true
                    },

                    items: [
                        // reject tool
                        {
                            xtype: 'button',
                            text: 'Reject',
                            width: 75,

                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {
                                hidden: '{!record.isNeedUpdate}',
                                tooltip: 'Reject '
                            },
                            handler: 'onReject'
                        }
                    ]
                }
            }


        ]
    },
    bind: {
        store: '{edifileinfo}'
    },
    plugins: [{
        ptype: 'rowediting',
        errorSummary: false,
        autoCancel: false,
        clicksToEdit: 2,
        id: 'rowEdit',
        listeners: {
            'canceledit': function (rowEditing, context) {
                if (context.record.phantom) {
                    if(context.record.data.systemID==0)
                        context.store.remove(context.record);
                }
            },
            beforeEdit: 'beforeEdit',
            edit:'afterEdit'
        }
    },
        {
            ptype: 'gridfilters'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    reference:'addButton',
                    iconCls: 'fa  fa-plus-circle',
                    listeners: {
                        click: 'onAdd'
                    }
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    disabled:true,
                    reference: 'removeButton',
                    iconCls: 'fa  fa-minus-circle',
                    listeners: {
                        click: 'onRemove'
                    }
                }

            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',

            items: [
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    reference: 'saveButton',
                    text: 'Save',
                    disabled: true,
                    listeners: {
                        click: 'onSave'
                    }
                }
            ]

        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout:'fit',
            items: [{
                xtype: 'pagingtoolbar',
                reference:'pToolBar',
                dock: 'bottom',
                displayInfo: 'true',
                hideRefresh:true,
                listeners:{
                    beforechange:'refresh'
                },
                bind: {
                    store: '{edifileinfo}'
                }
            }
            ]

        }
    ]
})
;
