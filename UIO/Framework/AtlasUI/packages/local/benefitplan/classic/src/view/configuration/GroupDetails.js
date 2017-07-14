Ext.define('Atlas.benefitplan.view.Configuration.GroupDetails', {
    extend: 'Ext.panel.Panel',
    itemId: 'groupdetailview',
    title: 'Group Configuration',
    titleAlign: 'center',
    alias: 'widget.benefitplan-groupdetails',
    controller: 'benefitplan-groupconfigurationcontroller',
    viewModel: {
        data: {
            changed: false,
            validforms: false,
            planPgmChange: false
            
        },
        stores: {
            navigationBreadCrumb: {
                model : 'Atlas.benefitplan.model.BreadCrumb',
                listeners: {
                    'load': 'onBreadCrumbLoad'
                }
            },
            basicdetails: {
                model: 'Atlas.benefitplan.model.Group'
            },
            accountdetails: {
                model: 'Atlas.benefitplan.model.Account'
            },
            tenantdetails: {
                model: 'Atlas.benefitplan.model.Tenant'
            },
            tenantfamilydetails: {
                model: 'Atlas.benefitplan.model.TenantFamily'
            },
            groups: {
                model: 'Atlas.benefitplan.model.PopulationGroup'
            },
            copypopulationgroups:{
                model: 'Atlas.benefitplan.model.CopyGroupContents'
            },
            packageSummary: {
                model: 'Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSummary'
            }
        }
    },
    layout: 'border',
    items: [
        {
            xtype: 'fieldset',
            reference: 'breadcrumbarea',
            region: 'north',
            items: [
            ]
        },

        {
            xtype: 'panel',
            region: 'center',
            layout: 'border',
            itemId: 'centersection',
            items: [
                {
                    xtype: 'form',
                    itemId: 'detailsection',
                    trackResetOnLoad: true,
                    region: 'west',
                    width: '50%',
                    items: [
                        {
                            xtype: 'fieldset',
                            height: '100%',
                            title: 'Group',
                            itemId: 'detailsectionfieldset',
                            defaults: {
                                labelWidth: 165,
                                allowBlank: false,
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    maxLength: 80,
                                    name: 'GrpName',
                                    fieldLabel: 'Group Name',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
                                            labelAlign: 'top'
                                        },
                                        'width >= 1300': {
                                            labelAlign: 'left'
                                        }
                                    },
                                    vtype: 'atlasAlphaNumDash'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'EfctvStartDt',
                                    itemId: 'EfctvStartDt',
                                    format: 'n/j/Y',
                                    fieldLabel: 'Effective Start Date',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
                                            labelAlign: 'top'
                                        },
                                        'width >= 1300': {
                                            labelAlign: 'left'
                                        }
                                    },
                                    validator: function (val) {
                                        return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'EfctvEndDt',
                                    itemId: 'EfctvEndDt',
                                    format: 'n/j/Y',
                                    fieldLabel: 'Effective End Date',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
                                            labelAlign: 'top'
                                        },
                                        'width >= 1300': {
                                            labelAlign: 'left'
                                        }
                                    },
                                    validator: function (val) {
                                        return (new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    maxLength: 50,
                                    name: 'GrpNbr',
                                    allowBlank: true,
                                    fieldLabel: 'Group Number',
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
                                            labelAlign: 'top'
                                        },
                                        'width >= 1300': {
                                            labelAlign: 'left'
                                        }
                                    },
                                    listeners: {
                                        change: 'onItemChanged'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    maxLength: 50,
                                    name: 'HIOIssuerID',
                                    fieldLabel: 'HIOS Issuer ID',
                                    disabled: true,
                                    plugins: 'responsive',
                                    responsiveConfig: {
                                        'width < 1300': {
                                            labelAlign: 'top'
                                        },
                                        'width >= 1300': {
                                            labelAlign: 'left'
                                        }
                                    },
                                    allowBlank: true
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'CopyPopulationGroupsButton',
                                    text: 'Copy Population Groups',
                                    handler: 'onCopyPopulationGroupsButtonClick'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'benefitplan-address',
                    itemId: 'addresssection',
                    region: 'east',
                    width: '50%'
                }
            ]
        }
    ],
    bbar:[
        {
            itemId: 'CreateNewChildButton',
            text: 'Create New Population Group',
            handler: 'onCreateNewChildClick',
            bind: {
                disabled: '{changed}'
            }
        },
        {
            itemId: 'ViewContactsButton',
            text: 'View Contacts',
            handler: 'onViewContactsClick',
            bind: {
                disabled:  '{tenantHierarchyEntityId==0}'
            }
        },
        '->',
        {
            itemId: 'CancelButton',
            text: 'Cancel',
            handler: 'onCancelClick'
        },
        {
            itemId: 'SaveButton',
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!validforms}'
            }
        }
    ]
});
