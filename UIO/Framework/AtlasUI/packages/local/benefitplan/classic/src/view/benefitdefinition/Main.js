/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitdefinition.Main', {
    extend: 'Ext.form.Panel',
    trackResetOnLoad: true,
    title: 'Benefit Definition',
    itemId: 'benefitDefinitionView',
    scrollable: true,
    bodyPadding: 10,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    benefitSK: 0,
    isCopy: false,
    LOBName: 0,
    controller: 'benefitplan-adminconfigurationcontroller',
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false,
            changedforms: false,
            validform: false,
            rulesetgridediting: false,
            ruledetailgridediting: false,
            benefitpending: false,
            benefitlevel1approved: false,
            benefitapproved: false,
            unsavedbenefit: false,
            lastSubmtdForTestingTs: false
        },
        stores: {
            basicdetails: {
                model: 'Atlas.benefitplan.model.Benefit'
            },
            benefitintegration: {
                model: 'Atlas.benefitplan.model.BenefitIntegration'
            },
            criteriasettype:{
                model: 'Atlas.benefitplan.model.CriteriaSetType'
            },
            rulesets: {
                model: 'Atlas.benefitplan.model.BenDefRuleSets'
            },
            ruledetails: {
                model: 'Atlas.benefitplan.model.CriteriaDetails'
            },
            industrystandardnames: {
                model: 'Atlas.benefitplan.model.ServiceType',
                autoLoad: true
            },
            valuequalifiertypes: {
                model: 'Atlas.benefitplan.model.ValueQualifierType',
                autoLoad: true
            },
            criteriaconditiontypes: {
                autoLoad: true,
                model: 'Atlas.benefitplan.model.CriteriaConditionType'
            },
            BenefitWorkflow: {
                autoLoad: false,
                model: 'Atlas.benefitplan.model.BenefitWorkflow'
            }
        }
    },
    items: [
        {
            xtype: 'panel',
            itemId: 'benefitDefinitionPanel',
            title: 'Benefit Definition',
            titleAlign: 'center',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Benefit Details',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Code Description',
                            itemId: 'codeDescriptionSection',
                            layout: 'column',
                            bodyPadding: 5,
                            defaults: {
                                anchor: '100%',
                                bodyPadding: 15
                            },
                            bind: {
                                disabled: '{!benefitpending && !unsavedbenefit}'
                            },
                            items: [
                                {
                                    columnWidth: 0.33,
                                    items: [
                                        {
                                            defaults: {
                                                labelWidth: 175
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    name: 'EfctvStartDt',
                                                    itemId: 'EfctvStartDt',
                                                    format: 'n/j/Y',
                                                    fieldLabel: 'Effective Start Date',
                                                    validator: function (val) {
                                                        return (new Date(val) < new Date(this.up('[itemId="codeDescriptionSection"]').down('[itemId="EfctvEndDt"]').getValue())) ? true : "Must be less than Effective End Date";
                                                    },
                                                    allowBlank: false,
                                                    plugins: 'responsive',
                                                    responsiveConfig: {
                                                        'width < 1540': {
                                                            minWidth: 250,
                                                            labelAlign: 'top'
                                                        },
                                                        'width >= 1540': {
                                                            minWidth: 350,
                                                            labelAlign: 'left'
                                                        }
                                                    },
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    }
                                                },
                                                {
                                                    xtype: 'tagfield',
                                                    fieldLabel: 'Industry Standard Name',
                                                    itemId: 'industryStandardNames',
                                                    bind: {
                                                        store: '{industrystandardnames}'
                                                    },
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    },
                                                    name: 'ServiceTypes',
                                                    publishes: 'SvcTypeSK',
                                                    minChars: 0,
                                                    forceSelection: true,
                                                    displayField: 'SvcTypeDesc',
                                                    valueField: 'SvcTypeSK',
                                                    queryMode: 'local',
                                                    plugins: 'responsive',
                                                    responsiveConfig: {
                                                        'width < 1540': {
                                                            minWidth: 250,
                                                            labelAlign: 'top'
                                                        },
                                                        'width >= 1540': {
                                                            minWidth: 350,
                                                            labelAlign: 'left'
                                                        }
                                                    },
                                                    typeAhead: false
                                                }
                                            ]
                                        }
                                    ]

                                },
                                {
                                    columnWidth: 0.33,
                                    defaults: {
                                        labelWidth: 175
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            name: 'EfctvEndDt',
                                            itemId: 'EfctvEndDt',
                                            format: 'n/j/Y',
                                            fieldLabel: 'Effective End Date',
                                            validator: function (val) {
                                                return (new Date(val) > new Date(this.up('[itemId="codeDescriptionSection"]').down('[itemId="EfctvStartDt"]').getValue())) ? true : "Must be greater than Effective Start Date";
                                            },
                                            allowBlank: false,
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            listeners: {
                                                change: 'onItemChanged',
                                                enable: 'onItemEnabled'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            maxLength: 80,
                                            name: 'BenefitName',
                                            itemId: 'BenefitName',
                                            fieldLabel: 'Benefit Name',
                                            vtype: 'atlasAlphaNumDash',
                                            allowBlank: false,
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            maxLength: 6,
                                            name: 'BnftCode',
                                            itemId: 'BenefitCode',
                                            fieldLabel: 'Benefit Code',
                                            fieldStyle: 'text-transform:uppercase',
                                            allowBlank: false,
                                            vtype:'atlasAlphaNum',
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            bind: {
                                                readOnly: '{lastSubmtdForTestingTs}'
                                            }
                                        }
                                    ]

                                },
                                {
                                    columnWidth: 0.33,
                                    defaults: {
                                        labelWidth: 175
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            itemId: 'benefitdefinitionstatus'
                                        },
                                        {
                                            xtype: 'textfield',
                                            maxLength: 4,
                                            name: 'BnftOrder',
                                            itemId: 'BnftOrder',
                                            fieldLabel: 'Order',
                                            vtype: 'numeric',
                                            allowBlank: false,
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'displayfield',
                                            maxLength: 30,
                                            name: 'StatDesc',
                                            itemId: 'StatDesc',
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            fieldLabel: 'Status'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            maxLength: 30,
                                            name: 'LastPblshTs',
                                            reference: 'LastPblshTs',
                                            itemId: 'LastPblshTs',
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            fieldLabel: 'Last Published'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            maxLength: 30,
                                            name: 'LastSubmtdForTestingTs',
                                            reference: 'LastSubmtdForTestingTs',
                                            itemId: 'LastSubmtdForTestingTs',
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1540': {
                                                    minWidth: 250,
                                                    labelAlign: 'top'
                                                },
                                                'width >= 1540': {
                                                    minWidth: 350,
                                                    labelAlign: 'left'
                                                }
                                            },
                                            fieldLabel: 'Last Submitted for Testing'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Rule Set',
                            defaults: {
                                labelWidth: 90,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'ruleset-grid',
                                    title: 'Rule Set',
                                    minHeight: 250,
                                    reference: 'RuleSetGrid',
                                    bind: {
                                        store: '{rulesets}'
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    layout: 'fit',
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    columns: [
                                        {
                                            text: 'Priority',
                                            dataIndex: 'CrtriaSetPrity',
                                            flex: 1,
                                            editor: {
                                                xtype:'numberfield',
                                                allowBlank: false,
                                                regex: /^[1-9]\d*$/
                                            }
                                        },
                                        {
                                            text: 'Rule Name',
                                            dataIndex: 'CriteriaSetName',
                                            flex: 1,
                                            editor: {
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            text: 'DOS Start Date',
                                            dataIndex: 'EfctvStartDt',
                                            flex: 1,
                                            formatter: 'date("n/j/Y")',
                                            editor: {
                                                itemId: 'EfctvStartDt',
                                                xtype: 'datefield',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return ((new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) && (new Date(val) <= new Date(this.up('[itemId="benefitDefinitionPanel"]').down('[itemId="codeDescriptionSection"]').down('[itemId="EfctvEndDt"]').getValue())) && (new Date(val) >= new Date(this.up('[itemId="benefitDefinitionPanel"]').down('[itemId="codeDescriptionSection"]').down('[itemId="EfctvStartDt"]').getValue()))) ? true : "Must be less than Effective End Date and within range of List Effective dates";
                                                },
                                                format: 'n/j/Y'
                                            }
                                        }, {
                                            text: 'DOS End Date',
                                            dataIndex: 'EfctvEndDt',
                                            flex: 1,
                                            formatter: 'date("n/j/Y")',
                                            editor: {
                                                itemId: 'EfctvEndDt',
                                                xtype: 'datefield',
                                                allowBlank: false,
                                                validator: function (val) {
                                                    return ((new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) && (new Date(val) <= new Date(this.up('[itemId="benefitDefinitionPanel"]').down('[itemId="codeDescriptionSection"]').down('[itemId="EfctvEndDt"]').getValue())) && (new Date(val) >= new Date(this.up('[itemId="benefitDefinitionPanel"]').down('[itemId="codeDescriptionSection"]').down('[itemId="EfctvStartDt"]').getValue()))) ? true : "Must be greater than Effective Start Date and within range of List Effective dates";
                                                },
                                                format: 'n/j/Y'
                                            }
                                        }, {
                                            dataIndex: 'CurrentUser',
                                            renderer: 'onCurrentUserRenderer',
                                            hidden: true,
                                            hideable:false
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onAddClick',
                                            bind: {
                                                 disabled: '{!benefitpending && !unsavedbenefit}'
                                            }
                                        },
                                        {
                                            text: 'Remove Row',
                                            reference: 'removeRow',
                                            handler: 'onRemoveClick',
                                            bind: {
                                                disabled: '{(!RuleSetGrid.selection) || (benefitapproved || benefitlevel1approved)}'
                                            }
                                        }],
                                    listeners: {
                                        beforeselect: 'beforeSelectionChange',
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete',
                                        beforeedit: 'beforeGridItemEdit',
                                        validateedit:'onRuleSetGridValidateEdit'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Rule Detail',
                            defaults: {
                                labelWidth: 90,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'ruledetail-grid',
                                    title: 'Rule Detail',
                                    reference: 'RuleDetailGrid',
                                    minHeight: 300,
                                    layout: 'fit',
                                    bind: {
                                        store: '{ruledetails}'
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    columns: [
                                        {
                                            text: 'Priority',
                                            dataIndex: 'CrtriaPrity',
                                            flex: 1,
                                            editor: {
                                                xtype:'numberfield',
                                                allowBlank: false,
                                                regex: /^[1-9]\d*$/
                                            }
                                        },
                                        {
                                            text: 'Value Qualifier Type',
                                            dataIndex: 'ValQulfrTypeSK',
                                            flex: 1,
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{valuequalifiertypes}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'ValQulfrCode',
                                                valueField: 'ValQulfrTypeSK',
                                                publishes: 'ValQulfrTypeSK'
                                            }
                                        }, {
                                            text: 'Condition',
                                            dataIndex: 'CrtriaCondTypeSK',
                                            flex: 1,
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{criteriaconditiontypes}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'CrtriaCondTypeCode',
                                                valueField: 'CrtriaCondTypeSK'
                                            }
                                        }, {
                                            text: 'Value',
                                            dataIndex: 'CrtriaVal',
                                            flex: 1,
                                            cellWrap: true,
                                            editor: {
                                                xtype     : 'textareafield',
                                                grow      : true,
                                                allowBlank: true
                                            },
                                            renderer:function(value,metaData){
                                                Ext.apply(Ext.QuickTips.getQuickTip(), {
                                                    trackMouse: true
                                                });
                                                metaData.tdAttr = 'data-qtip= "' + value + '" data-qclass="forceWrap"';
                                                return value;
                                            }
                                        }, {
                                            text: 'Operator',
                                            flex: 1,
                                            renderer: function(){
                                                return 'AND';
                                            }
                                        }, {
                                            dataIndex: 'CurrentUser',
                                            renderer: 'onCurrentUserRenderer',
                                            hidden: true,
                                            hideable:false
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onAddDetailClick',
                                            bind: {
                                                disabled: '{(!RuleSetGrid.selection) || (!benefitpending && !unsavedbenefit)}'
                                            }
                                        },
                                        {
                                            text: 'Remove Row',
                                            reference: 'removeDetailRow',
                                            handler: 'onRemoveDetailClick',
                                            bind: {
                                                disabled: '{(!RuleDetailGrid.selection)  || (!benefitpending && !unsavedbenefit)}'
                                            }
                                        }],
                                    listeners: {
                                        canceledit: 'onDetailGridItemCancelEdit',
                                        edit: 'onDetailGridItemComplete',
                                        beforeedit: 'beforeDetailGridItemEdit',
                                        validateedit:'onRuleDetailGridValidateEdit'
                                    }
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
            text: 'Benefit Search',
            handler: 'onSearchClick'
        },
        {
            text: 'Benefit Configuration',
            handler: 'onBenefitConfigurationClick',
            itemId: 'coverageSetConfigurationButton',
            hidden: true
        },
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick',
            bind:{
                disabled: '{!changedforms}'
            }
        },
        {
            text: 'Make Changes',
            handler: 'onMakeChanges',
            bind: {
                disabled: '{benefitpending || unsavedbenefit}'
            }
        },
        {
            text: 'Submit to Sandbox',
            handler: 'onSubmitToSandbox',
            bind: {
                disabled: '{!benefitpending || unsavedbenefit}'
            }
        },
        {
            text: 'Publish to Production',
            handler: 'onPublishToProduction',
            bind: {
                disabled: '{!benefitlevel1approved || unsavedbenefit}'
            }
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!validform || rulesetgridediting || ruledetailgridediting || !benefitpending }'
            }
        }
    ]
});