/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.AddCMR', {
    extend: 'Ext.window.Window',
    xtype: 'casemanagementAddCMR',
    //itemId : 'compoundgcnwindow',
    title: 'Add CMR Details',
    itemId:'winCMR',
    width: 800,
    modal: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form', flex: 0.6,
            itemId:'frmCMR',
            autoScroll: true,layout: {
            type: 'vbox',
            align: 'stretch'
        },
            defaults: {
                labelWidth: 200
            },
            frame: true, items: [
            {
                xtype: 'datefield',
                fieldLabel: 'CMR Offered Date',
                itemId: 'dtCMROfferDate',
                format: 'm/d/Y',
                name:'CMROfferDate'
            },
            {
                xtype: 'combobox',
                itemId: 'cbxCMROfferMethod',
                fieldLabel: 'CMR Offer Method',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreCMROfferMethod}'
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'CMR Date',
                itemId: 'dtCMRDate',
                format: 'm/d/Y',
                name:'CMRDate'
            },
            {
                xtype: 'combobox',
                itemId: 'cbxCMRDelvMethod',
                fieldLabel: 'CMR Delivery Method',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreCMRDelvMethod}'
                }
            },
            {
                xtype: 'combobox',
                itemId: 'cbxLicProfType',
                fieldLabel: 'Licensed Professional Type',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreLicProfType}'
                }
            },
            {
                xtype: 'combobox',
                itemId: 'cbxCMRRecipient',
                fieldLabel: 'CMR Recipient',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreCMRRecipient}'
                }
            },
            {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    labelWidth: 200
                },
                items: [
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'CMR Non Conf. Reason',
                        name:'CMRNonConfReason',
                        itemId: 'txtCMRNonConfReason'
                    }
                ]
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Intervention Date',
                itemId: 'dtInterventionDate',
                format: 'm/d/Y',
                name:'interventionDate'
            },
            {
                xtype: 'container',
                layout: 'hbox',
                defaults: {
                    labelWidth: 200
                },
                items: [
                    {
                        xtype: 'textareafield',
                        fieldLabel: 'Intervention Description',
                        itemId: 'txtInterventionDesc',
                        name:'prescInterventions'
                    }
                ]
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Therapy Change Date',
                itemId: 'dtTherapyChangeDate',
                format: 'm/d/Y',
                name:'therapyChangeDate'
            },
            {
                xtype: 'combobox',
                itemId: 'cbxTherapyChangeType',
                fieldLabel: 'Therapy Change Type',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{StoreTherapyChangeType}'
                }
            },
            {
                xtype: 'prescribertypeahead',
                itemId: 'cbxPre',
                fieldLabel: 'NPI',
                emptyText: '[e.g. Dr. Smith]',
                displayField: 'fullname',
                valueField: 'npi'
            },
            {
                xtype: 'hidden', itemId: 'lblPrescriberName',name:'prescriberName'
            },
            {
                xtype: 'hidden', itemId: 'hdnParentsystemIDCMR',name:'systemID'
            }
        ]
        },
        {
            xtype: 'panel', flex: 0.4,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            frame: true, items: [
            {
                xtype: 'grid',
                height:'100%',
                tbar: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Add',
                        iconCls: 'fa  fa-plus-circle',
                        handler: 'btnAddMedActionPlan_click',
                        itemId:'btnAddMedActionPlan'
                    },
                    {
                        xtype: 'button',
                        text: 'Remove',
                        iconCls: 'x-fa  fa-minus-circle',
                        handler: 'btnRemoveMedActionPlan_click',
                        itemId:'btnRemoveMedActionPlan'
                    }

                ],
                itemId: 'gpMedicationActionPlan',
                columns: {
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            text: 'What we talked about:', dataIndex: 'plan',
                            editor: {
                                xtype: 'textfield'
                            }

                        },
                        {
                            text: 'parentSystemId', dataIndex: 'parentSystemId', hidden: true

                        },
                        {
                            text: 'Member needs to:', dataIndex: 'actionText',
                            editor: {
                                xtype: 'textfield'
                            }

                        }
                    ]
                },
                bind: '{StoreMedicationActionPlan}',
                plugins:[ {
                    ptype: 'rowediting',
                    clicksToEdit: 2,
                    autoCancel: false,
                    listeners: {
                        'canceledit': function (rowEditing, context) {
                            if (context.record.phantom) {
                                context.store.remove(context.record);
                            }
                        }
                    }
                }]
            }
        ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    handler: 'SaveCMRDetails',
                    itemId: 'btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    handler: 'btnCloseCMRClick',
                    itemId: 'btnClose'
                }
            ]
        }]

});