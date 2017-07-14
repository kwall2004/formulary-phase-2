/**
 * Created by j2560 on 10/17/2016.
 */
Ext.define('Atlas.benefitplan.view.planbenefitpackage.PlanBenefitPackageConfig', {
    extend:'Ext.form.Panel',
    trackResetOnLoad: true,
    title: 'Plan Benefit Package Configuration',
    controller: 'planbenpackageconfig',
    //reference: 'PlanBenefitPackageForm',
    listen:{
        controller: {
            '*': {
                onPlanAssign: 'onPlanAssignToPackage'
            }
        }
    },listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    width: '100%',
    layout: 'vbox',
    viewModel: {
        data: {
            changed: false,
            validform: false,
            isCommercialOrHIX: false,
            PBPSK:0,
            gridRowSelected:false,
            newPackage: true,
            package: false,
            canChangePBPBnftPlanList:false,
            onStatusChange:false,
            changePBPBnftPlanList:false,
            combinedLevelDeductible:false,
            combinedPlanMOOP:false
        },
        stores: {
            PlanBenefitPackageConfig:{
                model:'Atlas.benefitplan.model.PlanBenefitPackageConfig'
            },
            LineOfBusiness:{
                model:'Atlas.benefitplan.model.LineOfBusiness',
                sorters: 'LOBSK',
                autoLoad: true
            }
            }
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            text: 'Service Area',
            handler: 'onServiceAreaClick',
            bind: {
                disabled: '{newPackage}'
            }

        }, {
            text: 'Business Rules',
            handler: 'onBusinessRulesClick',
            bind: {
                disabled: '{newPackage || !isCommercialOrHIX}'
            }
        },
        '->', {
            text: 'Cancel',
            handler: 'cancelPBPConfigOnClick'
        }, {
            text: 'Save',
            handler: 'savePBPConfigOnClick',
                bind: {
                    disabled: '{!changed || !validform || onStatusChange}'
                }
        }]
    }],
    items: [{
        xtype: 'fieldset',
        title: 'Plan Benefit Package Detail',
        reference: 'PlanBenefitPackageDetail',
        width: '99%',
        defaults: {
            xtype: 'container',
            layout: 'hbox',
            width: '100%'
        },
        items: [
            {

                xtype : 'label',
                reference: 'pkgDetaiApprovedInfo',
                text  : 'Package is Approved. Cannot modify Plan Detail.',
                bind:{
                    hidden:'{!changePBPBnftPlanList}'
                }

                    }
               ,{
            defaults: {
                xtype: 'textfield',
                width: '33%',
                labelWidth: '50%'
            },
            items: [{
                fieldLabel: 'Plan Benefit Package Name:',
                name: 'PBPName',
                reference: 'PlanBenefitPackageDetailPBPName',
                allowBlank:false,
                maskRe: /[A-Za-z0-9\s]/,
                listeners: {
                    change: 'onItemChanged'
                }
            },  {
                fieldLabel: 'PBP ID:',
                name: 'PBPID',
                maskRe: /[A-Za-z0-9]/,
                allowBlank: false,
                listeners: {
                    change: 'onItemChanged'
                }
            },
                {
                    xtype: 'combo',
                    name: 'LOBSK',
                    allowBlank:false,
                    fieldLabel: 'Line of Business',
                    displayField: 'LOBName',
                    valueField: 'LOBSK',
                    bind: {
                        store: '{LineOfBusiness}'
                    },
                    listeners: {
                        change: 'onItemChanged'
                    },
                    publishes: 'LOBSK',
                    queryMode: 'local',
                    typeAhead: true,
                    forceSelection: true,
                    emptyText: 'Select a Line of Business'
                }

            ]
        }, {
            defaults: {
                xtype: 'textfield',
                width: '33%',
                labelWidth: '50%'
            },
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Effective Start Date:',
                name: 'EfctvStartDt',
                allowBlank:false,
                format: 'n/j/Y',
                validator: function (val) {
                    return (new Date(val) < new Date(this.up().down('[name="EfctvEndDt"]').getValue())) ? true : "Must be less than Effective End Date";
                },
                listeners: {
                    change: 'onItemChanged'
                }
            },
                {
                xtype: 'datefield',
                fieldLabel: 'Effective End Date:',
                name: 'EfctvEndDt',
                allowBlank:false,
                format: 'n/j/Y',
                validator: function (val) {
                    return (new Date(val) > new Date(this.up().down('[name="EfctvStartDt"]').getValue())) ? true : "Must be greater than Effective Start Date";
                },
                listeners: {
                    change: 'onItemChanged'
                }
            }, {
                fieldLabel: 'PBP Year:',
                name: 'PBPYr',
                maskRe: /[0-9.]/,
                minLength:4,
                maxLength:4,
                enforceMaxLength:true,
                listeners: {
                       change: 'onItemChanged'
                }
            }]
        },
            {
            defaults: {
                xtype: 'textfield',
                width: '33%',
                labelWidth: '50%'
            },
            items: [{
                xtype: 'radiogroup',
                fieldLabel: 'Combined Plan Level Deductible',
                columns: 2,
                name: 'CombinedPlanLvlDeducbIndGrp',
                allowBlank:false,
                items: [
                    { boxLabel: 'Yes', name: 'CombinedPlanLvlDeducbInd', inputValue: 'true'},
                    { boxLabel: 'No', checked: true,  name: 'CombinedPlanLvlDeducbInd', inputValue: 'false'}
                ],
                listeners: {
                    change: 'onItemChanged'
                }

            }, {
                xtype: 'radiogroup',
                allowBlank:false,
                fieldLabel: 'Combined MOOP',
                name: 'CombinedMOOPIndGrp',
                columns: 2,
                items: [
                    { boxLabel: 'Yes', name: 'CombinedMOOPInd', inputValue: 'true'},
                    { boxLabel: 'No', checked: true, name: 'CombinedMOOPInd',  inputValue: 'false'}
                ],
                listeners: {
                    change: 'onItemChanged'
                }
            }, {
                fieldLabel: 'HIOS Product ID',
                name: 'HIOSPrdctID',
                maskRe: /[A-Za-z0-9]/,
                listeners: {
                    change: 'onItemChanged'
                }

            }]
        }]
    },
        {
        title: 'Plan Benefit Package Contents',
        reference: 'PlanBenefitPackageGrid',
        xtype: 'fieldset',
        width: '100%',
        items: [{
            xtype: 'toolbar',
            items: [{
                text: 'Assign',
                bind: {
                    disabled:'{(PBPSK == 0) || (!canChangePBPBnftPlanList)}'
                },
                handler: 'onAssignClick'
            }, {
                text: 'Unassign',
                bind: {
                    disabled: '{(!gridRowSelected) || (!canChangePBPBnftPlanList)}'
                },
                handler: 'onUnassignClick'
            }]
        },
            {
                xtype : 'label',
                reference: 'approvedInfo',
                cls:'m-red-color',
                text  : 'Package is Approved. Cannot modify plan list!',
                bind:{
                    hidden: '{!changePBPBnftPlanList}'
                }

            },
            {
            xtype: 'grid',
            reference: 'pbpinfogrid',
            width: '100%',
            layout: 'fit',
            height: 200,
            viewConfig: {
                loadMask: false
            },
            columns: {
                defaults: {
                    flex: 1
                },
                items: [{
                    text: 'Benefit Plan Name',
                    dataIndex: 'BnftPlanName'
                }, {
                    text: 'Product Type',
                    dataIndex: 'PrdctTypeCode'
                }, {
                    text: 'Benefit Plan Type',
                    dataIndex: 'BnftPlanTypeCode'
                }, {
                    text: 'Line of Business',
                    dataIndex: 'LOBName'
                }, {
                    xtype: 'datecolumn',
                    text: 'Effective Start Date',
                    dataIndex: 'EfctvStartDt',
                    format: 'n/j/Y'
                }, {
                    xtype: 'datecolumn',
                    text: 'Effective End Date',
                    dataIndex: 'EfctvEndDt',
                    format: 'n/j/Y'
                }, {
                    text: 'Network Tiers',
                    dataIndex: 'NbrofNtwrkTiers'
                }, {
                    xtype: 'checkcolumn',
                    text: 'Pay as Secondary',
                    dataIndex: 'PayasScndInd'
                }, {
                    xtype: 'checkcolumn',
                    text: 'Combined Plan Level Deductible',
                    dataIndex: 'CombinedPlanLvlDeducbInd',
                    bind: {
                        disabled: '{!combinedLevelDeductible}'
}
                }, {
                    text: 'IsDeleted',
                    dataIndex: 'IsDeleted',
                    hidden: true
                },
                    {
                        text: 'CurrentUser',
                        dataIndex: 'CurrentUser',
                        hidden: true,
                        renderer:'onColumnRenderer'
                    },{
                    xtype: 'checkcolumn',
                    text: 'Combined Plan MOOP',
                    dataIndex: 'CombinedMOOPInd',
                        bind:{
                            disabled:'{!combinedPlanMOOP}'
                        }
                }]
            },
            listeners: {
                select: 'onPlanGridSelect'
            }
        }]
    }]
});