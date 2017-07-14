/**
 * Created by T4317 on 11/4/2016.
 */
//Refactored by @Sencha
Ext.define('Atlas.claims.view.ClaimTest', {
    extend: 'Ext.panel.Panel',
    controller: 'claims-claimtest',
    xtype: 'claims-claimtest',
    viewModel: 'claims-claimstestmodel',
    title: 'Claim Test',
    cls: 'mClaimTest',
    layout: 'fit',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'testClaimId',
                    fieldLabel: 'Test Claim ID',
                    emptyText: '[Test ClaimID]',
                    hideTrigger: true,
                    allowDecimals: false,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'loadTestClaim'
                    },
                    labelWidth: 100,
                    width: 300
                },
                '-',
                {
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'btnSearchClick'
                },
                '-',
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Claim Status',
                    itemId: 'lblClaimStsatus',
                    labelWidth: 50
                },
                '->',
                {
                    text: 'Check Status',
                    itemId: 'btnCheckStatus',
                    iconCls: 'x-fa fa-server',
                    disabled: true,
                    handler: 'onCheckStatus'
                },
                {
                    text: 'Submit Claim',
                    iconCls: 'x-fa fa-arrow-circle-right',
                    handler: 'onSubmitClaim'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'btnClaimID',
                    fieldLabel: 'Original Claim ID',
                    emptyText: '[ClaimID]',
                    hideTrigger: true,
                    allowDecimals: false,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'loadClaimInfo'
                    },
                    labelWidth: 100,
                    width: 300
                },
                '-',
                {
                    xtype: 'numberfield',
                    itemId: 'btnAuthID',
                    fieldLabel: 'Auth ID',
                    emptyText: '[AuthID]',
                    hideTrigger: true,
                    allowDecimals: false,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'loadAuthInfo'
                    },
                    labelWidth: 50,
                    width: 270
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'tabpanel',
            itemId: 'claimTabBar',
            layout: 'fit',
            items: [
                {
                    xtype: 'form',
                    title: 'Claim Details',
                    itemId: 'tabClaimDetails',
                    autoScroll : true,
                    overFlowX : 'scroll',
                    overFlowY : 'scroll',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    scrollable: true,
                    items: [
                        {
                            xtype: 'container',
                            minWidth : 1500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            //These defauts will be applied to 3 panels inside the container
                            defaults: {
                                xtype: 'panel',
                                flex: 1,
                                userCls: 'card-panel',
                                /*layout: {
                                    type: 'vbox'
                                },*/
                                defaults: {
                                    labelWidth: 140,
                                    width: '100%'
                                }
                            },
                            items: [
                                {
                                    title: 'Member Info',
                                    itemId: 'memInfo',
                                    listeners: {
                                        render: 'setHorizPanScroll',
                                        resize: 'onMinSizeReached'
                                    },
                                    bind: {
                                        scrollable: '{horizPanScroll}'
                                    },
                                    iconCls: 'x-fa fa-user',
                                    items: [
                                        {
                                            xtype: 'container',
                                            // xtype: 'fieldcontainer', // use fieldcontainers. They have fieldLabel and properly will encapsulate fields
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    fieldLabel: 'Insured Id',
                                                    labelWidth: 140,
                                                    xtype: 'membertypeahead',
                                                    displayField: 'memberID',
                                                    valueField: 'memberID',
                                                    reference: 'memberId',
                                                    emptyText: '[e.g 000123]',
                                                    matchFieldWidth: false,
                                                    itemId: 'InsuredID',
                                                    allowBlank: false,
                                                    flex: 1,
                                                    listeners: {
                                                        select: 'cbxMember_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-user',
                                                    reference: 'redirectMemberName',
                                                    margin: '0 1 0 0',
                                                    width: 25,
                                                    maxWidth:25,
                                                    handler: 'routeToMember'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Name',
                                            itemId: 'memberName'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'DOB',
                                            itemId: 'memberDOB'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Gender',
                                            itemId: 'memberGender'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Address',
                                            itemId: 'memberAddress1',
                                            name: 'memberAddress'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            hideEmptyLabel: false, // keep the label space for proper alignment
                                            itemId: 'memberAddress2',
                                            name: 'memberAddress2'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Service Date',
                                            //maxValue: new Date(),
                                            listeners : {
                                                render: function(c) {
                                                    c.setMaxValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                                }
                                            },
                                            name: 'serviceDate',
                                            itemId: 'serviceDate',
                                            emptyText: '[mm/dd/yyyy]',
                                            allowBlank: false,
                                            format: 'm/d/Y'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'PCN',
                                            itemId: 'cbxPCN',
                                            queryMode: 'local',
                                            name: 'PCN',
                                            allowBlank: false,
                                            displayField: 'PCNCode',
                                            valueField: 'PCNCode'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Residence Code',
                                            queryMode: 'local',
                                            name: 'patResidenceCode',
                                            itemId: 'patResidenceCode',
                                            displayField: 'name',
                                            valueField: 'value',
                                            bind: {
                                                store: '{PatientResidenceCode}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'CMS Qualified Facility',
                                            name: 'CMSQualFacility',
                                            itemId: 'CMSQualFacility',
                                            queryMode: 'local',
                                            displayField: 'name',
                                            valueField: 'value',
                                            bind: {
                                                store: '{CMSQualFacility}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            // xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    fieldLabel: 'Clinical<br>Information',
                                                    xtype: 'displayfield',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    maxWidth:25,
                                                    iconCls: 'x-fa fa-plus-circle',
                                                    margin: '0 1 0 0',
                                                    handler: 'onAddClinicalInfo'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    title: 'Drug info',
                                    iconCls: 'x-fa fa-medkit',
                                    listeners: {
                                        resize: 'onMinSizeReached'
                                    },
                                    bind: {
                                        scrollable: '{horizPanScroll}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            width: '100%',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    fieldLabel: 'NDC',
                                                    labelWidth: 140,
                                                    xtype: 'drugtypeahead',
                                                    displayField: 'NDC',
                                                    valueField: 'NDC',
                                                    reference: 'drugId',
                                                    matchFieldWidth: false,
                                                    emptyText: '[e.g Nexium]',
                                                    itemId: 'NDC',
                                                    allowBlank: false,
                                                    flex: 1,
                                                    listeners: {
                                                        select: 'cbxMedication_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-medkit',
                                                    handler: 'routeToDrugSearch',
                                                    margin: '0 1 0 0',
                                                    width: 25,
                                                    maxWidth:25
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            hideEmptyLabel: false,
                                            name: 'LN',
                                            itemId: 'medicationLN'
                                        },
                                        {
                                            xtype: 'container',
                                            // xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    itemId: 'gcnseq',
                                                    name: 'gcnseq',
                                                    labelWidth: 140,
                                                    flex: 1,
                                                    fieldLabel: 'GCN'
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    text: 'Compound Drug',
                                                    margin: '0 1 0 0',
                                                    width: 120,
                                                    maxWidth:120,
                                                    handler: 'btnCompoundGCN_Click'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'numberfield',
                                            minValue: 0,
                                            maxLength: 8,
                                            hideTrigger: true,
                                            allowDecimals: true,
                                            fieldLabel: 'Dispense Qty',
                                            allowBlank: false,
                                            itemId: 'dispQuantity',
                                            name: 'dispQuantity'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            minValue: 0,
                                            hideTrigger: true,
                                            allowDecimals: false,
                                            maxValue: 365,
                                            maxLength: 3,
                                            fieldLabel: 'Days Supply',
                                            allowBlank: false,
                                            itemId: 'daysSupply',
                                            name: 'daysSupply'
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Rx Origin',
                                            queryMode: 'local',
                                            name: 'rxOrigin',
                                            displayField: 'name',
                                            valueField: 'value',
                                            itemId: 'rxOrigin',
                                            bind: {
                                                store: '{TestClaimRxOrigin}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'DAW Code',
                                            queryMode: 'local',
                                            name: 'dawCode',
                                            matchFieldWidth: false,
                                            displayField: 'name',
                                            valueField: 'value',
                                            itemId: 'dawCode',
                                            bind: {
                                                store: '{DAWType}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Dosage Form',
                                            queryMode: 'local',
                                            name: 'compoundDosageForm',
                                            itemId: 'compoundDosageForm',
                                            displayField: 'name',
                                            valueField: 'value',
                                            disabled: true,
                                            bind: {
                                                store: '{CompoundDosageForm}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Dispensing Unit',
                                            queryMode: 'local',
                                            name: 'compoundDispUnitForm',
                                            itemId: 'compoundDispUnitForm',
                                            displayField: 'name',
                                            valueField: 'value',
                                            disabled: true,
                                            bind: {
                                                store: '{CompoundDispUnit}'
                                            }
                                        }
                                    ]
                                },
                                {
                                    title: 'Pharmacy Info',
                                    iconCls: 'x-fa fa-home',
                                    listeners: {
                                        resize: 'onMinSizeReached'
                                    },
                                    bind: {
                                        scrollable: '{horizPanScroll}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            // xtype: 'fieldcontainer',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    fieldLabel: 'NCPDP',
                                                    labelWidth: 140,
                                                    xtype: 'providertypeahead',
                                                    itemId: 'cbxPharmacy',
                                                    displayField: 'Name',
                                                    valueField: 'ncpdpId',
                                                    allowBlank: false,
                                                    emptyText: '[NPI# / NCPDP#]',
                                                    matchFieldWidth: false,
                                                    flex: 1,
                                                    listeners: {
                                                        select: 'cbxPharmacy_Select'
                                                    }
                                                },
                                                {
                                                    xtype: 'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    width: 25,
                                                    maxWidth:25,
                                                    margin: '0 1 0 0',
                                                    iconCls: 'x-fa fa-home',
                                                    handler: 'routeToPharmacy'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Address',
                                            itemId: 'pharmacyAddress'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Phone',
                                            itemId: 'PharmacyPhone',
                                            name: 'PharmacyPhone'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            minValue: 0,
                                            maxLength: 12,
                                            hideTrigger: true,
                                            allowDecimals: false,
                                            allowBlank: false,
                                            name: 'rxNum',
                                            itemId: 'rxNum',
                                            fieldLabel: 'Rx Number'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            minValue: 0,
                                            maxLength: 12,
                                            hideTrigger: true,
                                            allowDecimals: false,
                                            name: 'fillNumber',
                                            itemId: 'fillNumber',
                                            fieldLabel: 'Fill #'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date Written',
                                            allowBlank: false,
                                            emptyText: '[mm/dd/yyyy]',
                                            name: 'dateWritten',
                                            itemId: 'dateWritten',
                                            format: 'm/d/Y',
                                            //maxValue: new Date(),
                                            listeners:{
                                                blur: function(date, event, eOpts) {
                                                    date.setValue(Ext.Date.format(new Date(date.rawValue), date.format));
                                                },
                                                render: function(c) {
                                                    c.setMaxValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                                }

                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Pharmacy Type',
                                            queryMode: 'local',
                                            name: 'pharmacyServType',
                                            itemId: 'pharmacyServType',
                                            displayField: 'name',
                                            valueField: 'value',
                                            bind: {
                                                store: '{DispenserType}'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            minWidth : 1500,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            //These defaults will be applied to 3 panels inside the container
                            defaults: {
                                xtype: 'panel',
                                flex: 1,
                                userCls: 'card-panel',
                                /*layout: {
                                    type: 'vbox'
                                },*/
                                defaults: {
                                    labelWidth: 140,
                                    width: '100%'
                                }
                            },
                            items: [
                                {
                                    title: 'COB Info',
                                    itemId: 'cobInfo',
                                    iconCls: 'x-fa fa-random',
                                    listeners: {
                                        resize: 'onMinSizeReached'
                                    },
                                    bind: {
                                        scrollable: '{horizPanScroll}'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            fieldLabel: 'Other Coverage Code',
                                            queryMode: 'local',
                                            name: 'otherCoverageCode',
                                            itemId: 'otherCoverageCode',
                                            displayField: 'name',
                                            valueField: 'value',
                                            bind: {
                                                store: '{OtherCoverageCode}'
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            minValue: 0,
                                            maxLength: 8,
                                            hideTrigger: true,
                                            allowDecimals: true,
                                            format: '$0,0.00',
                                            itemId: 'paidAmt',
                                            fieldLabel: 'Paid Amount'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'PayerIdQual',
                                            fieldLabel: 'Payer Id Qual'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'PayerID',
                                            fieldLabel: 'Payer Id'
                                        },
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Date Paid',
                                            itemId: 'payerDate',
                                            format: 'm/d/Y',
                                            emptyText: '[mm/dd/yyyy]',
                                            //maxValue: new Date()
                                            listeners : {
                                                render: function(c) {
                                                    c.setMaxValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
                                                }
                                            }

                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'RejCode',
                                            fieldLabel: 'Reject Codes'
                                        }
                                    ]
                                },
                                {
                                     xtype: 'panel',
                                     bind: {
                                         scrollable: '{horizPanScroll}'
                                    },
                                    layout: {
                                        type: 'fit'
                                    },
                                    items: [{
                                        xtype: 'grid',
                                        title: 'Responsibility',
                                        iconCls: 'x-fa fa-usd',
                                        itemId: 'responsibilityGrid',
                                        plugins:
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowediting',
                                            triggerEvent: 'celldblclick',
                                            //removeUnmodified: true,
                                            pluginId: 'rowEdit',

                                            listeners: {
                                                cancelEdit: 'cancelEditButton',
                                                beforeEdit: 'beforeEdit'
                                            }
                                        },

                                        tbar: [
                                            {
                                                text: 'Add',
                                                iconCls: 'x-fa fa-plus-circle',
                                                handler: 'onAdd'
                                            }
                                        ],
                                        bind: {
                                            store: '{PatientResponsibility}'
                                        },
                                        columns: {
                                            defaults: {
                                                flex: 1
                                            },
                                            items: [
                                                {
                                                    text: 'Patient Resp. Qualifier',
                                                    dataIndex: 'otherPayerPatRespQual',
                                                    renderer: 'rendererOtherPayerPatRespQual',
                                                    editor: {
                                                        xtype: 'combobox',
                                                        allowBlank: false,
                                                        bind: {store: '{UCFPatRespAmtQualifier}'},
                                                        matchFieldWidth: true,
                                                        queryMode: 'local',
                                                        displayField: 'name',
                                                        valueField: 'value'
                                                    }
                                                },
                                                {
                                                    text: 'Resp. Amount',
                                                    dataIndex: 'otherPayerPatRespAmt',
                                                    format: '$0,0.00',
                                                    editor: {
                                                        xtype: 'numberfield',
                                                        allowBlank: false,
                                                        minValue: 0,
                                                        hideTrigger: true
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    hideable: false,
                                                    width: 50,
                                                    iconCls: 'x-fa fa-minus-circle',
                                                    align: 'center',
                                                    handler: 'onRemove'
                                                }
                                            ]
                                        }
                                     }]
                                },
                                {
                                    title: 'Prescriber Info',
                                    iconCls: 'x-fa fa-pencil',
                                    listeners: {
                                        resize: 'onMinSizeReached'
                                    },
                                    bind: {
                                        scrollable: '{horizPanScroll}'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    xtype: 'prescribertypeahead',
                                                    labelWidth:140,
                                                    emptyText: '[e.g Dr. Smith]',
                                                    fieldLabel: 'DEA/NPI',
                                                    itemId: 'prescriberNPI',
                                                    displayField: 'fullname',
                                                    valueField: 'npi',
                                                    matchFieldWidth: false,
                                                    flex: 1,
                                                    allowBlank: false,
                                                    listeners: {
                                                        select: 'cbxPrescriber_Select'
                                                    }
                                                },
                                                {
                                                    xtype:'splitter'
                                                },
                                                {
                                                    xtype: 'button',
                                                    iconCls: 'x-fa fa-user',
                                                    width: 25,
                                                    maxWidth:25,
                                                    margin: '0 1 0 0',
                                                    handler: 'routeToPrescriber'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'displayfield',
                                            hideEmptyLabel: false,
                                            name: 'prescriberName',
                                            itemId: 'prescriberName'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Phone',
                                            itemId: 'prescriberPhone',
                                            name: 'prescriberPhone'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            fieldLabel: 'Sanctioned',
                                            itemId: 'FWAPrescriberLockFlag'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            minWidth : 1500,
                            title: 'Notes',
                            userCls: 'card-panel',
                            iconCls: 'x-fa fa-sticky-note-o',
                            defaults: {
                                labelWidth: 140
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Representative',
                                    itemId: 'Representative',
                                    name: 'Representative'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    fieldLabel: 'Notes',
                                    items: [
                                        {
                                            xtype: 'textarea',
                                            itemId: 'notes',
                                            width: 500
                                        },
                                        {
                                            xtype: 'splitter'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-bars',
                                            maxWidth:25,
                                            width:25,
                                            handler: 'onbtnNotes'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    title: 'Other Details',
                    itemId: 'tabOtherDetails',
                    disabled: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: []
                }
            ]
        }
    ]
});
