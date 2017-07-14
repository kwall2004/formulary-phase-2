Ext.define('Atlas.portals.view.rxmember.DrugSearch',{
    extend: 'Ext.panel.Panel',
    title: 'Drug Search',
    xtype: 'portals-rxmember-drugsearch',
    controller: 'portalsRxmemberDrugSearchController',
    anchor: '100%',
    viewModel: 'portalsRxmemberDrugSearchModel',
    scrollable: true,
    items: [{
        xtype: 'form',
        reference: 'drugsearchform',
        title: 'Drug Search',
        collapsible: true,
        cls: 'card-panel',
        bodyPadding: '10 20',
        defaults: {
            labelWidth: 225,
            width: 580
        },
        items: [
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'drugtypeahead',
                        labelWidth: 215,
                        name: 'drugSearch',
                        emptyText: '[e.g. ACETAMINOPHEN]',
                        reference: 'drugSearch',
                        fieldLabel: 'Drug Name:',
                        allowBlank: false,
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        iconCls: 'x-fa fa-question-circle',
                        tooltip: 'Enter drug name (3 characters or more)'
                    }
                ]
            },
            {
                xtype: 'checkboxfield',
                fieldLabel: 'Covered Only:',
                name: 'coveredOnly',
                reference: 'coveredOnly',
                checked: true,
                uncheckedValue: '0'
            },
            {
                xtype: 'checkboxfield',
                fieldLabel: 'Over-the-Counter Available:',
                name: 'overTheCounter',
                reference: 'overTheCounter',
                uncheckedValue: '0'
            },
            {
                xtype: 'checkboxfield',
                fieldLabel: 'Generic Alternatives:',
                name: 'genericAlternatives',
                reference: 'genericAlternatives',
                checked: true,
                uncheckedValue: '0'
            },
            {
                xtype: 'checkboxfield',
                fieldLabel: 'Preferred:',
                name: 'preferred',
                reference: 'preferred',
                uncheckedValue: '0',
                bind: {
                    hidden: '{!isPreferred}'
                }
            },
            {
                xtype: 'combo',
                labelWidth: 215,
                fieldLabel: 'Plan:',
                name: 'plan',
                reference: 'plan',
                queryMode: 'local',
                displayField: 'DisplayName',
                valueField: 'PlanGroupId',
                emptyText: 'Select a plan',
                bind: {
                    store: '{memberCoverages}'
                },
                listeners: {
                    select: 'onPlanSelected'
                },
                allowBlank: false
            },
            {
                xtype: 'combo',
                labelWidth: 215,
                fieldLabel: 'Pharmacy Networks:',
                name: 'pharmacyNetwork',
                reference: 'pharmacyNetwork',
                queryMode: 'local',
                displayField: 'displayName',
                valueField: 'networkId',
                emptyText: 'Select a network',
                allowBlank: false,
                style: {
                    marginBottom: '10px'
                }
            },
            {
                xtype: 'container',
                flex: 1,
                layout: 'center',
                items: {
                    xtype: 'button',
                    text: 'Search',
                    width: 115,
                    iconCls: 'x-fa fa-search',
                    listeners:{
                        click: 'onDrugSearch'
                    }
                }
            }
        ]
    },
    {
        xtype: 'container',

        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            flex: 1
        },
        items: [
            {
                xtype: 'gridpanel',
                title: 'Drug Details',
                cls: 'card-panel',
                columns: [
                    { text: 'Label Name', dataIndex: 'LN', flex: 1, minWidth: 140 },
                    { text: 'Brand Name', dataIndex: 'BN', flex: 1, minWidth: 100 },
                    { text: 'Tier Code', dataIndex: 'tierCode', hidden: true },
                    { text: 'Tier', dataIndex: 'tierDesc' },
                    { text: 'Drug Type', dataIndex: 'DrugType' },
                    {
                        xtype: 'actioncolumn',
                        menuDisabled: true,
                        sortable: false,
                        hidden: true,
                        flex: 1,
                        align: 'center',
                        text: '$4 Generic Available',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-home',
                                handler: 'openPharmacyWindow',
                                tooltip: 'Click to view list of $4 Pharmacies'
                            }
                        ]
                    },
                    { text: 'Over-the-Counter', dataIndex: 'OTCInd', hidden: true },
                    { text: 'Covered', dataIndex: 'Covered', hidden: true },
                    { text: 'PA required', dataIndex: 'PAInd', hidden: true },
                    { text: 'Drug Code', dataIndex: 'DrugCode', hidden: true },
                    { text: 'Strength', dataIndex: 'strength', hidden: true },
                    { text: 'SideEffect', dataIndex: 'SideEffect', hidden: true },
                    { text: 'Coverage Gap', dataIndex: 'CoverageGapDrug', hidden: true },
                    {
                        xtype: 'actioncolumn',
                        menuDisabled: true,
                        sortable: false,
                        flex: 1,
                        align: 'center',
                        text: 'Estimated Price',
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-money',
                                handler: 'estimateCopay'
                            }
                        ]
                    }
                ],
                listeners: {
                  itemclick: 'onDrugSelected'
                },
                bind: {
                    store: '{drugSearchResults}'
                },
                bbar: {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    emptyMsg: 'No drugs to display.'
                }
            },
            {
                xtype: 'form',
                title: 'Detail',
                reference: 'drugdetails',
                cls: 'card-panel',
                bodyPadding: '5 10',
                tbar: {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Understand Copay',
                            handler: 'openCopayExample'
                        },'->',{
                             xtype: 'button',
                             text: 'Drug to Drug Interaction',
                             handler: 'openDrugInteraction',
                             itemId: 'drugInteractionButton',  // Active on Select
                             disabled: 'true'
                        }
                    ]
                },
                bbar: {
                    xtype: 'toolbar',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'View Recent 30-day Prescription History',
                            handler: 'goToMyClaims'
                        }
                    ]
                },
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Drug Information',
                        layout: {
                            type: 'vbox'
                        },
                        defaults: {
                            xtype: 'displayfield',
                            width: '100%',
                            labelWidth: 225
                        },
                        items: [
                            {
                                fieldLabel: 'Drug name:',
                                name: 'LN'
                            },
                            {
                                fieldLabel: 'Strength:',
                                name: 'strength'
                            },
                            {
                                fieldLabel: 'Drug Type:',
                                name: 'DrugType'
                            },
                            {
                                fieldLabel: 'Covered:',
                                name: 'CoveredDisplay'
                            },
                            {
                                fieldLabel: 'Copay:',
                                name: 'memberResponsibilityAmtDisplay'
                            },
                            {
                                fieldLabel: 'Max Copay:',
                                name: 'maxCopayDisplay'
                            },
                            {
                                fieldLabel: 'Co. Insurance Start:',
                                name: 'coinsuranceStartAmtDisplay'
                            },
                            {
                                fieldLabel: 'Deductible:',
                                name: 'deductibleDisplay'
                            },
                            {
                                fieldLabel: 'Prior Auth Required:',
                                name: 'PaIndDisplay'
                            },
                            {
                                fieldLabel: 'Step Therapy:',
                                name: 'STAppliesDisplay'
                            },
                            {
                                fieldLabel: 'Quantity Limits:',
                                name: 'QLAppliesDisplay'
                            },
                            {
                                fieldLabel: 'Over-the-Counter Available:',
                                name: 'OTCIndDisplay'
                            },
                            {
                                fieldLabel: 'Side Effects and Significant Risks:',
                                name: 'SideEffect'
                            },
                            {
                                fieldLabel: 'Title:',
                                name: 'TitleName'
                            },
                            {
                                fieldLabel: 'Other Brand Name(s):',
                                name: 'OtherBrandNames'
                            },
                            {
                                fieldLabel: 'Uses:',
                                name: 'Uses'
                            },
                            {
                                fieldLabel: 'Coverage Gap:',
                                name: 'CoverageGapDrug'
                            }
                        ]
                    }
                ]
            }
        ]
    }]
});