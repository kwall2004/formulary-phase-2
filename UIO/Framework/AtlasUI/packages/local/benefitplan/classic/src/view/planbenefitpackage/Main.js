/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Plan Benefit Package Search',
    controller: 'planbenefitpackage-search',
    viewModel: {
        data : {
            hasPopGrpSK: false,
            popGrpSK : '0'
        },
        stores: {
            navigationBreadCrumb: {
                model : 'Atlas.benefitplan.model.BreadCrumb',
                listeners: {
                    'load': 'onBreadCrumbLoad'
                }
            },populationgroup: {
                model: 'Atlas.benefitplan.model.PopulationGroup'
            },
            packagesearch: {
                type: 'benefitplan-packagesearchresults-store'
            },
            benefitplantypes: {
                type: 'benefitplan-type-store'
            },
            lobs: {
                type: 'benefitplan-lob-store'
            }
        }
    },
    items:[
        {
            xtype: 'form',
            title: 'Plan Benefit Package Search',
            titleAlign: 'center',
            layout: 'container',
            items: [
                {
                    xtype: 'fieldset',
                    reference: 'breadcrumbarea',
                    bind : {
                        hidden: '{!hasPopGrpSK}'
                    },
                    region: 'north',
                    items: [
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Search Criteria',
                    region: 'north',
                    items: [
                        {
                            xtype: 'form',
                            reference: 'PBPSearchForm',
                            layout: 'column',
                            defaults: {
                                xtype: 'container',
                                layout: 'anchor',
                                columnWidth: 0.3,
                                margin: 5,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '100%',
                                    labelWidth: 150
                                }
                            },
                            items: [
                                {
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Plan Benefit Package',
                                            emptyText: 'search',
                                            maxLength: 50,
                                            vtype: 'atlasAlphaNumDash',
                                            name: 'benefitpackageName',
                                            listeners: {
                                                change: 'onSearch'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            name: 'lob',
                                            fieldLabel: 'Line of Business',
                                            displayField: 'LOBName',
                                            valueField: 'LOBSK',
                                            bind: {
                                                store: '{lobs}'
                                            },
                                            publishes: 'LOBSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            forceSelection: true,
                                            emptyText: 'Select a Line of Business',
                                            listeners:
                                            {
                                                change: 'onSearch'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            name: 'benefitplanType',
                                            fieldLabel: 'Benefit Plan Type',
                                            displayField: 'BnftPlanTypeDesc',
                                            valueField: 'BnftPlanTypeSK',
                                            bind: {
                                                store: '{benefitplantypes}'
                                            },
                                            publishes: 'BnftPlanTypeSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            forceSelection: true,
                                            emptyText: 'Select a Benefit Plan Type',
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
                                            name: 'benefitpackageStartDate',
                                            itemId: 'benefitpackageStartDate',
                                            reference: 'benefitpackageStartDate',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'tenantFamily',
                                            fieldLabel: 'Tenant Family'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'tenant',
                                            fieldLabel: 'Tenant'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'account',
                                            fieldLabel: 'Account'
                                        }
                                    ]
                                },
                                {
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            fieldLabel: 'Effective End Date',
                                            emptyText: 'Select Effective End Date',
                                            format: 'n/j/Y',
                                            name: 'benefitpackageEndDate',
                                            itemId: 'benefitpackageEndDate',
                                            reference: 'benefitpackageEndDate',
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'group',
                                            fieldLabel: 'Group'
                                        },
                                        {
                                            xtype: 'textfield',
                                            name:'popGroup',
                                            fieldLabel: 'Population Group'
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
                    items: [
                        {
                            xtype: 'grid',
                            height: 600,
                            itemId: 'packagesearchgrid',
                            reference: 'packagesearchgrid',
                            bind: {
                                store: '{packagesearch}'
                            },
                            viewConfig: {
                                loadMask: false
                            },
                            listeners: {
                                selectionchange: 'onSelectionChange',
                                itemdblclick: 'onPlanBenefitPackageGridItemClick'
                            },
                            columns: [
                                {
                                    text: 'Plan Benefit Package SK',
                                    dataIndex: 'PBPSK',
                                    hidden: true,
                                    hideable: false

                                },
                                {
                                    text: 'Plan Benefit Package ID',
                                    dataIndex: 'PBPID',
                                    flex: 1
                                },
                                {
                                    text: 'Plan Benefit Package Name',
                                    dataIndex: 'PBPName',
                                    flex: 1
                                },
                                {
                                    text: 'Benefit Plan Type',
                                    dataIndex: 'BenefitPlanInfo',

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
                                    dataIndex: 'PopGrpSK',
                                    items: [{
                                        iconCls: 'x-fa fa-external-link-square',
                                        tooltip: 'View Elements',
                                        handler: 'onViewElementsClick'
                                    }]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        {
            text: 'Create New Package',
            handler: 'onNewPackageClick'
        },
        {
            text: 'Edit Package',
            bind: {
                disabled: '{!packagesearchgrid.selection}'
            },
            handler: 'onEditPackageClick'
        },
        {
            text: 'Assign Plan Benefit Package to Population Group',
            bind:{
                disabled:'{!packagesearchgrid.selection || !hasPopGrpSK}'
            },
            handler: 'onAssignPBPPopGrpClick'
        }
    ]
});
