Ext.define('Atlas.benefitplan.view.planexceptionlimits.PlanExceptionLimits', {
    extend: 'Ext.panel.Panel',
    title: 'Plan Exception Limits',

    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    atlasId: 0,
    formularyTypeValue:0,
    controller: 'benefitplanexceptionlimits',
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data:{
            changed:false
        },
        stores: {
            earlyRefills: {
                model : 'Atlas.benefitplan.model.EarlyRefillExceptions',
                proxy: {
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/EarlyRefillExceptions'
                }
            },
            planCapLimits: {
                model: 'Atlas.benefitplan.model.PlanCapLimits',
                proxy: {
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/PlanCapLimits'
                }
            },
            earlyrefillqualifiers:{
                model: 'Atlas.benefitplan.model.EarlyRefillExceptionsQualifier'
            },
            caplimitsqualifiers:{
                model: 'Atlas.benefitplan.model.PlanCapLimitsQualifier'
            },
            caplimitsperiod:{
                model:'Atlas.benefitplan.model.PlanCapLimitsCapPeriod'
            },
            basicdetails: {
                model: 'Atlas.benefitplan.model.BenefitPlan'
            }
        }
    },
    items: [
        {
            xtype: 'benefitplan-progress',
            region: 'north',
            itemId: 'thermometerPanel'
        },
        {
            xtype: 'fieldset',
            scrollable: true,
            title: 'Plan Exception Configuration',
            items: [

                {
                    xtype: 'fieldset',
                    title: 'Early Refill % Exceptions',
                    items: [
                        /*Early Refill % Exceptions Grid*/
                        {
                            xtype: 'grid',
                            reference:  'earlyRefillsGrid',
                            minHeight: 200,
                            defaults: {
                                sortable: true,
                                filter: {
                                    type: 'string'
                                }
                            },
                            viewConfig: {
                                loadMask: false
                            },
                            plugins: [{
                                ptype: 'rowediting',
                                pluginId: 'rowEditing',
                                reference: 'rowEditing',
                                clicksToEdit: 2,
                                clicksToMoveEditor: 1,
                                autoCancel: false
                            }],
                            selModel: 'rowmodel',
                            bind: {
                                store: '{earlyRefills}'
                            },
                            columns: [
                                {
                                    dataIndex: 'BnftPlanSK',
                                    hidden: true,
                                    hideable: false
                                },
                                {
                                    dataIndex: 'CurrentUser',
                                    renderer: 'onCurrentUserRenderer',
                                    hidden: true,
                                    hideable: false
                                },
                                {
                                    header: 'Qualifier',
                                    dataIndex: 'EarlyRefillExcpQulfrTypeSK',
                                    renderer:'getEditorDisplayValue',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combo',
                                        bind:
                                        {
                                            store: '{earlyrefillqualifiers}'
                                        },
                                        typeAhead: true,
                                        allowBlank: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        displayField: 'EarlyRefillExcpQulfrTypeCode',
                                        valueField: 'EarlyRefillExcpQulfrTypeSK'
                                    }
                                },
                                {
                                    header: 'Value',
                                    dataIndex: 'EarlyRefillVal',
                                    flex: 1,
                                    dirtyText: 'Value has been edited',
                                    format:'0',
                                    editor: {
                                        xtype: 'textfield',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        maxLength: 14,
                                        enforceMaxLength: true,
                                        listeners: {
                                            focus: 'validateCombo'
                                        }
                                    }
                                },
                                {
                                    header: 'Early Refill %',
                                    dataIndex: 'EarlyRefillPct',
                                    flex: 1,
                                    xtype: 'numbercolumn',
                                    format: '0.00',
                                    renderer: function (value) {
                                        return value + '%';
                                    },
                                    editor: {
                                        vtype: 'percent',
                                        allowBlank: false
                                    }
                                }],
                            listeners:{
                                edit: 'onGridItemComplete',
                                validateedit : 'validateEdit',
                                canceledit: 'onEarlyRefillCancelEdit',
                                beforeedit: 'onGridBeforeEdit',
                                itemdblclick: 'checkValidation'
                            },

                            tbar: [
                                {
                                    text: 'Add Row',
                                    handler: 'onearlyrefillAddRowClick'
                                },
                                {
                                    text: 'Remove Row',
                                    handler: 'onearlyrefillRemoveRowClick',
                                    bind:
                                    {
                                        disabled: '{!earlyRefillsGrid.selection}'
                                    }

                                }]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Plan Cap Limits',
                    items: [
                        /*Plan Cap Limits Grid*/
                        {
                            xtype: 'grid',
                            reference:  'planCapLimitsGrid',
                            minHeight: 200,
                            defaults: {
                                sortable: true,
                                filter: {
                                    type: 'string'
                                }
                            },
                            plugins: [{
                                ptype: 'rowediting',
                                pluginId: 'rowEditing',
                                reference: 'rowEditing',
                                clicksToEdit: 2,
                                clicksToMoveEditor: 1,
                                autoCancel: false
                            }],
                            selModel: 'rowmodel',
                            bind: {
                                store: '{planCapLimits}'
                            },

                            columns: [
                                {
                                    dataIndex: 'BnftPlanSK',
                                    hidden: true,
                                    hideable: false
                                },
                                {
                                    dataIndex: 'CurrentUser',
                                    renderer: 'onCurrentUserRenderer',
                                    hidden: true,
                                    hideable: false
                                },
                                {
                                    dataIndex: 'isDeleted',
                                    hidden: true,
                                    hideable: false
                                },
                                {
                                    header: 'Qualifier',
                                    dataIndex: 'PlanCapLimQulfrTypeSK',
                                    renderer:'getEditorDisplayValue',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combo',
                                        bind:
                                        {
                                            store: '{caplimitsqualifiers}'
                                        },
                                        typeAhead: true,
                                        allowBlank: false,
                                        forceSelection: true,
                                        queryMode: 'local',
                                        displayField: 'PlanCapLimQulfrTypeCode',
                                        valueField: 'PlanCapLimQulfrTypeSK'
                                    }
                                },
                                {
                                    header: 'Value',
                                    dataIndex: 'PlanCapLimVal',
                                    flex: 1,
                                    format:'0',
                                    dirtyText: 'Value has been edited',
                                    editor: {
                                        xtype: 'textfield',
                                        allowBlank: false,
                                        enableKeyEvents: true,
                                        listeners:{
                                            focus:'planCapLimitValidateCombo'
                                        }
                                    }
                                }, {
                                    header: 'Cap Period',
                                    dataIndex: 'PlanCapLimPerQulfrTypeSK',
                                    flex: 1,
                                    renderer:'getEditorDisplayValue',
                                    editor: {
                                        xtype: 'combo',
                                        bind: {
                                            store: '{caplimitsperiod}'
                                        },
                                        displayField: 'PlanCapLimPerQulfrTypeCode',
                                        valueField: 'PlanCapLimPerQulfrTypeSK',
                                        typeAhead: true,
                                        allowBlank: false,
                                        forceSelection: true
                                    }
                                },
                                {
                                    header: 'Cap Amount',
                                    dataIndex: 'PlanCapLimAmt',
                                    flex: 1,
                                    xtype: 'numbercolumn',
                                    formatter: 'usMoney',
                                    dirtyText: 'Cap Amount has been edited',
                                    editor: {
                                        vtype: 'currency',
                                        allowBlank: false,
                                        enableKeyEvents: true
                                    }
                                }
                            ],

                            tbar: [
                                {
                                    text: 'Add Row',
                                    handler: 'onAddRowClick'
                                },
                                {
                                    text: 'Remove Row',
                                    handler: 'onRemoveRowClick',
                                    bind:
                                    {
                                        disabled: '{!planCapLimitsGrid.selection}'
                                    }
                                }],
                            listeners:{
                                edit: 'onGridItemComplete',
                                validateedit : 'validateCapLimitsEdit',
                                canceledit: 'onCancelEdit',
                                beforeedit: 'onGridBeforeEdit',
                                itemdblclick: 'checkPlanCapLimitValidation'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler : 'onBtnCancelClick'
        },
        {
            text: 'Save',
            handler : 'onBtnSaveClick',
            bind:{
                disabled: '{!changed}'
            }
        }
    ]
});