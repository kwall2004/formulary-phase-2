/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.view.PCN', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-planpcnsetup',

    controller: 'plan-planpcnsetup',
    viewModel: 'plan-planpcnsetup',
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'combo',
                flex: 1,
                allowBlank: false,
                fieldLabel: 'Carrier',
                forceSelection: true,
                emptyText: '[Select a Carrier]',
                bind: {
                    store: '{carriers}'
                },
                dataIndex: 'carrier',
                queryMode:'local',
                displayField: 'carrierName',
                valueField: 'carrierId',
                listeners: {
                    change: 'onCarrierChange'
                },
                reference: 'carrierId'
            },
            {
                xtype: 'combo',
                flex: 1,
                fieldLabel: 'Account',
                forceSelection: true,
                queryMode:'local',
                emptyText: '[Select an Account]',
                // bind: {
                //     store: '{pcnaccounts}'
                // },
                dataIndex: 'account',
                displayField: 'accountName',
                valueField: 'carrierAcctNumber',
                reference: 'account',
                listeners: {
                    change: 'onAccountChange'
                }

            },
            {
                xtype: 'combo',
                flex: 1,
                fieldLabel: 'LOB',
                queryMode:'local',
                forceSelection: true,
                emptyText: '[Select a LOB]',
                // bind: {
                //     store: '{lobs}'
                // },
                dataIndex: 'lob',
                displayField: 'lobName',
                valueField: 'carrierLOBId',
                reference: 'lob',
                listeners: {
                    change: 'onLobChange'
                }

            },
            '->',
            {
                xtype: 'container',
                flex: .3,
                items: [{
                    xtype: 'button',
                    width: 85,
                    iconCls: 'x-fa fa-plus-square',
                    handler: 'onAdd',
                    text: 'Add PCN',
                    bind: {
                        disabled: '{!isEditing}'
                    }
                }]
            },

            {
                xtype: 'container',
                flex: .35,
                items: [{
                    xtype: 'button',
                    width:97,
                    iconCls: 'x-fa fa-trash',
                    handler: 'onDeletePCN',
                    text: 'Delete PCN',
                    reference:'deletePCNCode',
                    // bind:{
                    //     disabled: '{!isEditing}'
                    // }
                    disabled: true
                }
                ]

            }

        ]
    }],
    items: [{
        xtype: 'grid',
        flex: 1,
        reference: 'PCNSetUpGrid',
        title: 'PCN Details',
        listeners: {
            select: 'onPCNCodeSelect',
            rowdblclick: 'onPCNCodedblClick'

        },
        bind: {
            store: '{pcnsetups}'
        },
        columns: {
            defaults: {
                flex: 1
                // align: 'center'
            },
            items: [
                {
                    text: 'PCN Code',
                    dataIndex: 'pcnCode'

                }, {
                    text: 'PCN Description',
                    dataIndex: 'pcnDesc'

                }, {
                    text: 'RxBIN',
                    dataIndex: 'BIN'

                }, {
                    text: 'DMR LOB Name',
                    dataIndex: 'dmrLobName',
                    reference: 'dmrLobName',
                    renderer: 'planDMRLOBRenderer'

                }, {
                    text: 'DMR Customer Code',
                    dataIndex: 'dmrCustCode'

                }, {
                    text: 'Multi Account',
                    dataIndex: 'multiAccount',
                    xtype: 'checkcolumn',
                    disabled: true

                }
            ]
        }
    }
        , {
            xtype: 'plan-pcnruledetails',
            flex: 1
        }
    ]

});