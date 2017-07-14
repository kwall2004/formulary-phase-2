Ext.define('Atlas.portals.view.prescriber.FormularyDrugSearch',{
    extend: 'Ext.container.Container',
    title: 'Formulary Drug Search',
    xtype: 'portals-prescriber-formularydrugsearch',
    controller: 'portalsPrescriberFormularyDrugSearchController',
    viewModel: 'portalsPrescriberFormularyDrugSearchModel',
    anchor: '100%',
    requires: [
        'Ext.panel.Panel',
        'Ext.grid.plugin.Exporter'
    ],
    layout: 'border',
    items: [
        {
            xtype: 'form',
            region: 'north',
            title: 'Selection',
            iconCls: 'x-fa fa-search',
            cls: 'card-panel',
            collapsible: true,
            reference: 'drugsearchform',
            bodyPadding: '10 20',
            defaults: {
                labelWidth: 225,
                minWidth: '580'
            },
            items: [
                {
                    xtype: 'drugtypeahead',
                    name: 'drugSearch',
                    emptyText: '[e.g. ACETAMINOPHEN]',
                    reference: 'drugSearch',
                    fieldLabel: 'Medication Name',
                    allowBlank: false,
                    labelWidth: 215,
                    listeners: {
                        select: 'onMedicationSelected'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Covered Only',
                    name: 'coveredOnly',
                    reference: 'coveredOnly',
                    checked: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'No Prior Authorization Required',
                    name: 'noPriorAuthorization',
                    reference: 'noPriorAuthorization',
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Over-the-Counter Available',
                    name: 'overTheCounter',
                    reference: 'overTheCounter',
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Generic Alternatives',
                    name: 'genericAlternatives',
                    reference: 'genericAlternatives',
                    checked: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Preferred',
                    name: 'preferred',
                    reference: 'preferred',
                    uncheckedValue: '0',
                    bind: {
                        disabled: '{!isPreferred}'
                    }
                },
                {
                    xtype: 'plangrouptypeahead',
                    fieldLabel: 'Select Plan',
                    name: 'plan',
                    reference: 'plan',
                    allowBlank: false,
                    labelWidth: 215,
                    listeners: {
                        select: 'onPlanSelected'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Select Tier',
                    name: 'tier',
                    reference: 'tier',
                    queryMode: 'local',
                    displayField: 'TierDesc',
                    valueField: 'TierCode',
                    emptyText: 'Select a Tier',
                    labelWidth: 215,
                    bind: {
                        store: '{formularyTiers}',
                        disabled: '{!hasTiers}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Search',
                    minWidth: 115,
                    iconCls: 'x-fa fa-search',
                    listeners:{
                        click: 'onDrugSearch'
                    }
                }
            ]
        },
        {
            cls: 'formPanel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            region: 'center',
            items: [
                {
                    xtype: 'gridpanel',
                    reference: 'drugSearchGrid',
                    plugins: [{
                        ptype: 'gridexporter'
                    }],
                    cls: 'card-panel',
                    columns: [
                        { text: 'Label Name', dataIndex: 'LN', flex: 1, minWidth: 140 },
                        { text: 'Brand Name', dataIndex: 'BN', flex: 1, minWidth: 100 },
                        { text: 'Tier Code', dataIndex: 'tierCode', hidden: true },
                        { text: 'Tier', dataIndex: 'tierDesc' },
                        { text: 'Drug Type', dataIndex: 'DrugType' },
                        { text: 'Over-the-Counter', dataIndex: 'OTCInd', hidden: true },
                        { text: 'Covered', dataIndex: 'Covered', hidden: true },
                        { text: 'PA required', dataIndex: 'PAInd', hidden: true },
                        { text: 'Drug Code', dataIndex: 'DrugCode', hidden: true },
                        { text: 'Strength', dataIndex: 'strength', hidden: true },
                        { text: 'Side Effect', dataIndex: 'SideEffect', hidden: true },
                        { text: 'Coverage Gap', dataIndex: 'CoverageGapDrug', flex: 1 }
                    ],
                    listeners: {
                        itemclick: 'onDrugSelected'
                    },
                    bind: {
                        title: '{drugTitle}',
                        store: '{formularyDrugSearchResults}'
                    },
                    tbar: {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Export to Excel',
                                iconCls: 'x-fa fa-file-excel-o',
                                handler: 'exportToExcel'
                            }
                        ]
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        emptyMsg: 'No drugs to display.'
                    }
                },
                {
                    xtype: 'form',
                    cls: 'card-panel',
                    reference: 'drugdetails',
                    scrollable: 'y',
                    bind: {
                        title: '{drugDetailTitle}'
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
                                    fieldLabel: 'Medication Name:',
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
                                    name: 'Covered'
                                },
                                {
                                    fieldLabel: 'Prior Auth Required:',
                                    name: 'PAInd'
                                },
                                {
                                    fieldLabel: 'Over-the-Counter Available:',
                                    name: 'OTCInd'
                                },
                                {
                                    fieldLabel: 'Side Effect:',
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
        }
    ]
});