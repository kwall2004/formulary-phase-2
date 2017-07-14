/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.healthcarefinancialaccount.HealthcareFinancialAccount', {
    extend: 'Ext.window.Window',
    title: 'Savings Account Configuration',
    controller: 'benefitplan-healthcarerinancialaccountcontroller',
    height: '50%',
    width: '70%',
    scrollable: true,
    modelValidation: true,
    popGrpPBPStatusIsDraft: false,
    itemId: 'BenefitPlanNew',
    name:'CreateBenefitPlan',
    closable: false,
    draggable: false,
    resizable: false,
    modal: true,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false,
            isReadOnly: false
        },
        stores: {
            healthcarefinancialaccount: {
                model: 'Atlas.benefitplan.model.healthcarefinancialaccount',
                sorters: 'PopGrpPBPHealthcareFinclAcctSK',
                listeners: {update : 'storeUpdated'}
            },
            healthcarefinancialaccounttype: {
                model: 'Atlas.benefitplan.model.HealthcareFinancialAccountType',
                sorters: 'HealthcareFinclAcctTypeDesc'
            },
            BenefitPlanType: {
                model: 'Atlas.benefitplan.model.BenefitPlanType',
                sorters: 'BnftPlanTypeDesc'
            }
        }
    },
    tbar: [
        {
            itemId: 'AddRowButton',
            id: 'AddRowButton',
            text: 'Add Row',
            handler: 'onAddClick',
            bind: {
                disabled: '{isReadOnly}'
            }
        },
        {
            itemId: 'RemoveRowButton',
            id: 'RemoveRowButton',
            text: 'Remove Row',
            handler: 'onRemoveClick',
            bind: {
                disabled: '{isReadOnly}'
            }
        }
    ],
    items: [
        {
            xtype: 'grid',
            id: 'HealthcareFinancialAccountGrid',
            itemId: 'HealthcareFinancialAccountGrid',
            reference: 'HealthcareFinancialAccountGrid',
            minHeight: 200,
            viewConfig: {
                loadMask: false
            },
            plugins :
                [{
                    ptype: 'rowediting',
                    clicksToEdit: 2,
                    clicksToMoveEditor: 1
                }],
                defaults :
                {
                    sortable: true,
                    filter :
                    {
                        type: 'string'
                    }
                },
                bind :
                {
                    store: '{healthcarefinancialaccount}'
                },
            columns: [
                {
                    header: 'Account Number',
                    text: 'Account Number',
                    dataIndex: 'AcctNbr',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        vtype: 'atlasAlphaNum',
                        allowBlank: false,
                        maxLength: 55
                    }
                },
                {
                    header: 'Financial Account Type',
                    text: 'Financial Account Type',
                    flex: 1,
                    dataIndex: 'HealthcareFinclAcctTypeSK',
                    renderer: 'getEditorDisplayValue',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        queryMode: 'local',
                        typeAhead: true,
                        forceSelection: true,
                        displayField: 'HealthcareFinclAcctTypeCode',
                        valueField: 'HealthcareFinclAcctTypeSK',
                        publishes: 'HealthcareFinclAcctTypeSK',
                        bind: {
                            store: '{healthcarefinancialaccounttype}'
                        }
                    }
                },
                {
                    header: 'Bank Name',
                    text: 'Bank Name',
                    flex: 1,
                    dataIndex: 'BankName',
                    editor: {
                        maxLength: 55,
                        vtype: 'atlasAlphaNum',
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    header: 'Maximum Contribution Amount',
                    text: 'Maximum Contribution Amount',
                    flex: 1,
                    dataIndex: 'MaxContributionAmt',
                    formatter: 'usMoney',
                    editor: {
                        maxValue: 999999,
                        xtype: 'numberfield',
                        vtype: 'currency',
                        minValue: 1
                    }
                },
                {
                    header: 'Benefit Plan Type',
                    text: 'Benefit Plan Type',
                    flex: 1,
                    dataIndex: 'BnftPlanTypeSK',
                    renderer: 'getEditorDisplayValue',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        typeAhead: true,
                        forceSelection: true,
                        publishes: 'BnftPlanTypeSK',
                        displayField: 'BnftPlanTypeCode',
                        valueField: 'BnftPlanTypeSK',
                        queryMode: 'local',
                        bind: {
                            store: '{BenefitPlanType}'
                        }
                    }
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        },

        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!changed || isReadOnly}'
            }
        }
    ]
});