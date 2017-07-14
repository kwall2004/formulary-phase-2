/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitplan.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.benefitplan-planbenefit-main',
    title: 'Benefit Plan Search',

    requires: [
        'Ext.form.RadioGroup'
    ],
    controller: 'benefitplanview',
    viewModel:
    {
        data : {
            PBPSK : '0',
            canassignplan :false
        },
        stores:
        {
            plansearch:
            {
                type: 'benefitplan-searchresults-store'
            },
            benefitplantypes:
            {
                type: 'benefitplan-type-store'
            },
            lobs:
            {
                type: 'benefitplan-lob-store'
            },
            packages: {
                model : 'Atlas.benefitplan.model.PlanBenefitPackageName',
                listeners: {
                    'load': 'onLoad'
                }
            },            assignPlantoPackage: {
                model : 'Atlas.benefitplan.model.PlanBenefitPackageName',
                proxy: {
                    actionMethods: {
                        read: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/PlanBenefitPackage'
                }
            },
            copyEditPlan: {
                model : 'Atlas.benefitplan.model.BenefitPlanName',
                proxy: {
                    actionMethods: {
                        read: 'POST'
                    },
                    type: 'benefitplan',
                    url: '/BenefitPlan'
                }
            }
        }
    },
    items:[
        {
            xtype: 'form',
            title: 'Benefit Plan Search',
            titleAlign:'center',
            layout:'container',
            scrollable: true,
            items: [
                {
                    xtype: 'fieldset',
                    bind : {
                        hidden: '{!hasPBPSK}'
                    },
                    region: 'north',
                    items: [
                        {
                            xtype: 'displayfield',
                            bind : {
                                value :  ' {PBPName}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Search Criteria',
                    region: 'north',
                    items: [
                        {

                            xtype: 'form',
                            layout: 'column',
                            trackResetOnLoad:'true',
                            reference: 'formreset',
                            defaults: {
                                xtype: 'container',
                                layout: 'anchor',
                                columnWidth: 0.3,
                                margin: 5,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%',
                                    labelWidth: 110
                                }
                            },

                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Benefit Plan',
                                            emptyText: 'search',
                                            maxLength: 50,
                                            vtype: 'atlasAlphaNumDash',
                                            name: 'benefitplan',
                                            listeners: {
                                                change: 'onSearch'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            itemId:'BenefitPlanType',
                                            fieldLabel: 'Benefit Plan Type',
                                            emptyText: 'Select a Benefit Plan Type',
                                            bind: {
                                                store: '{benefitplantypes}'
                                            },
                                            queryMode: 'local',
                                            name: 'benefitplanType',
                                            displayField: 'BnftPlanTypeDesc',
                                            valueField: 'BnftPlanTypeSK',
                                            listeners:
                                            {
                                                change: 'onSearch'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            itemId:'LOB',
                                            fieldLabel: 'Line of Business',
                                            emptyText: 'Select a Line of Business',
                                            bind: {
                                                store: '{lobs}'
                                            },
                                            queryMode: 'local',
                                            name: 'lob',
                                            displayField: 'LOBName',
                                            valueField: 'LOBSK',
                                            listeners:
                                            {
                                                change: 'onSearch'
                                            }
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Effective Start Date',
                                            emptyText: 'Select Effective Start Date',
                                            format: 'n/j/Y',
                                            name: 'benefitplanStartDate',
                                            itemId: 'benefitplanStartDate',
                                            reference: 'benefitplanStartDate',
                                            listeners: {
                                                select: 'onSearch',
                                                change: 'onSearch'
                                            }
                                        },{
                                            xtype: 'datefield',
                                            fieldLabel: 'Effective End Date',
                                            emptyText: 'Select Effective End Date',
                                            format: 'n/j/Y',
                                            name: 'benefitplanEndDate',
                                            itemId: 'benefitplanEndDate',
                                            reference: 'benefitplanEndDate',
                                            listeners: {
                                                select: 'onSearch',
                                                change: 'onSearch'
                                            }
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            itemId:'searchPlanTypeRadioType',
                                            name: 'isTemplate',
                                            flex : 6,
                                            items: [{
                                                boxLabel: 'Plans Only',
                                                name:'searchPlanType',
                                                inputValue: '1',
                                                checked: true
                                            }, {
                                                boxLabel: 'Templates Only',
                                                name:'searchPlanType',
                                                inputValue: '2'
                                            }]
                                        }
                                    ]
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Search',
                                    handler: 'onSearch'
                                },
                                {
                                    text: 'Reset',
                                    handler: 'onReset'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Search Results',
                    region: 'center',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'grid',
                            height: 600,

                            itemId: 'benefitPlanGrid',
                            viewConfig: {
                                loadMask: false
                            },
                            reference: 'benefitPlanGrid',
                            bind: {
                                store: '{plansearch}'
                            },
                            columns: [
                                {
                                    dataIndex: 'BnftPlanSK',
                                    hideable: false,
                                    hidden: true
                                },
                                {
                                    text: 'Benefit Plan ID',
                                    dataIndex: 'BnftPlanID',
                                    flex: 1
                                },
                                {
                                    text: 'Benefit Plan Name',
                                    dataIndex: 'BnftPlanName',
                                    flex: 1
                                }, {
                                    text: 'Benefit Plan Type',
                                    dataIndex: 'BnftPlanTypeCode',
                                    flex: 1
                                }, {
                                    text: 'LOB',
                                    dataIndex: 'LOBName',
                                    flex: 1
                                }, {
                                    text: 'Effective Start Date',
                                    dataIndex: 'EfctvStartDt',
                                    formatter: 'date("n/j/Y")',
                                    flex: 1

                                }, {
                                    text: 'Effective End Date',
                                    dataIndex: 'EfctvEndDt',
                                    formatter: 'date("n/j/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'Associated Populations',
                                    xtype: 'actioncolumn',
                                    flex: 1,
                                    dataIndex: 'BnftPlanSK',
                                    items: [{
                                        iconCls: 'x-fa fa-external-link-square',
                                        tooltip: 'View Elements',
                                        handler: 'onViewElementsClick'
                                    }]
                                }
                            ],

                            listeners: {
                                selectionchange: 'onSelectionChange',
                                itemdblclick: 'onPlanBenefitPlanGridItemClick'
                            }
                        }
                    ]
                },

                {
                    xtype: 'window',
                    itemId: 'BenefitPlanNew',
                    name:'CreateBenefitPlan',
                    closable: false,
                    draggable: false,
                    resizable: false,
                    title: 'Create New Benefit Plan',
                    modal: true,
                    items: [
                        {
                            xtype:'form',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'combobox',//Line of Business
                                    bind: {
                                        store: '{lobs}'
                                    },
                                    itemId: 'lineofbusiness',
                                    name: 'Modallineofbusiness',
                                    labelWidth: 165,
                                    fieldLabel: 'Choose Line of Business:',
                                    publishes: 'LOBSK',
                                    minChars: 0,
                                    displayField: 'LOBName',
                                    valueField: 'LOBSK',
                                    queryMode: 'local',
                                    typeAhead: false
                                },
                                {
                                    xtype: 'combobox',//Benefit Plan Type
                                    bind: {
                                        store: '{benefitplantypes}'
                                    },
                                    itemId: 'benefitplantype',
                                    name: 'Modalbenefitplantype',
                                    fieldLabel: 'Choose Benefit Plan Type:',
                                    labelWidth: 165,
                                    publishes: 'BnftPlanTypeSK',
                                    minChars: 0,
                                    displayField: 'BnftPlanTypeDesc',
                                    valueField: 'BnftPlanTypeSK',
                                    queryMode: 'local',
                                    typeAhead: false
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: 'Begin',
                                            handler: 'onNewPlanBegin',
                                            disabled: true,
                                            formBind: true
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Cancel',
                                            handler: 'onNewPlanCancel'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]

        }
    ],
   // layout: 'border',
    bbar: [
        {
            text: 'Create New Plan',
            handler: 'onNewPlanClick'
        },
        {
            text: 'Edit Plan',
            reference:'editPlanButton',
            bind: {
                disabled: '{!benefitPlanGrid.selection}'
            },
            handler: 'onPlanBenefitPlanGridItemClick'
        },
        {
            text: 'Copy & Edit',
            reference:'copyEditPlanButton',
            bind: {
                disabled: '{!benefitPlanGrid.selection}'
            },
            handler: 'onPlanBenefitPlanGridItemClick'

        },
        {
            text: 'Assign Plan to Plan Benefit Package',
            reference:'assignPlanToPackageButton',
            bind: {
                disabled: '{(!canassignplan) || (!benefitPlanGrid.selection)}'
            },
            handler: 'onAssignPlanToBenefitPackageClick'

        }
    ]
});
