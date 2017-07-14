Ext.define('Atlas.benefitplan.view.coveragesetconfiguration.criteriasetdetail.Main',
{
    extend: 'Ext.container.Container',
    xtype : 'criteriasetdetail',
    reference : 'criteriaSetDetailRef',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack : 'center'
    },
    bind: {
        disabled: '{!copying && !creatingnew && !isCoverageSetCmbselected}'
    },
    items : [
        {
            xtype: 'grid',
            reference : 'ruleSetsGridRef',
            title : 'Rule Set',
            minHeight : 200,
            plugins: [{
                ptype: 'rowediting',
                reference: 'rowediting',
                clicksToEdit: 2,
                clicksToMoveEditor: 1,
                pluginId: 'rowEditing',
                autoCancel: false
            }],
            viewConfig: {
                loadMask: false
            },
            columns: [
                {
                    text: 'Priority',
                    dataIndex: 'CrtriaSetPrity',
                    flex: 1,
                    editor: {
                        vtype:'numeric',
                        allowBlank: false,
                        regex: /^[1-9]\d*$/
                    }
                },
                {
                    text: 'Rule Name',
                    dataIndex: 'CriteriaSetName',
                    flex: 1,
                    editor: {
                        vtype:'atlasAlphaNum',
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
                        format: 'n/j/Y',
                        validator: function (val) {
                            return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
                        }
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
                        format: 'n/j/Y',
                        validator: function (val) {
                            return (new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
                        }
                    }
                }
            ],
            listeners : {
                selectionchange: 'onRulesetGridSelectionChange',
                canceledit: 'onruleSetsGridItemCancelEdit',
                edit: 'onruleSetsGridItemComplete',
                beforeedit: 'onruleSetsGridItemStartEdit',
                validateedit:'onRuleSetGridValidateEdit'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    defaults: {
                        width: 100
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add Row',
                            handler : 'onAddRuleSet'
                        },
                        {
                            xtype: 'button',
                            text: 'Delete Row',
                            handler : 'onRemoveRuleSet',
                            bind: {
                                disabled:'{!ruleSetsGridRef.selection}'
                            }
                        }
                    ]
                }
            ]
        },
        {

            xtype: 'grid',
            reference : 'ruleDetailsGridRef',
            title : 'Rule Detail',
            minHeight : 300,
            layout:'fit',
            plugins: [{
                ptype: 'rowediting',
                reference: 'rowediting',
                clicksToEdit: 2,
                clicksToMoveEditor: 1,
                pluginId: 'rowEditing',
                autoCancel: false
            }],
            defaults: {
                sortable: true,
                filter: {
                    type: 'string'
                }
            },
            viewConfig: {
                loadMask: false
            },
            columns: [
                {
                    text: 'Priority',
                    dataIndex: 'CrtriaPrity',
                    flex: 1,
                    editor: {
                        vtype:'numeric',
                        allowBlank: false,
                        regex: /^[1-9]\d*$/
                    }
                },
                {
                    text: 'Value Qualifier Type',
                    dataIndex: 'ValQulfrTypeSK',
                    renderer: 'getEditorDisplayValue',

                    flex: 1,
                    editor: {
                        xtype : 'combo',
                        bind : {
                            store : '{valuequalifiertypestore}'
                        },
                        displayField : 'ValQulfrCode',
                        valueField : 'ValQulfrTypeSK',
                        allowBlank: false,
                        forceSelection:true
                    }
                }, {
                    text: 'Condition',
                    dataIndex: 'CrtriaCondTypeSK',
                    flex: 1,
                    renderer: 'getEditorDisplayValue',

                    editor: {
                        xtype : 'combo',

                        bind : {
                            store : '{criteriaconditiontypestore}'
                        },
                        displayField : 'CrtriaCondTypeCode',
                        valueField : 'CrtriaCondTypeSK',
                        allowBlank: false,
                        forceSelection : true
                    }
                }, {
                    text: 'Value',
                    dataIndex: 'CrtriaVal',
                    flex: 1,
                    editor: {
                        xtype     : 'textareafield',
                        grow      : true
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
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    defaults: {
                        width: 100
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add Row',
                            bind: {
                                disabled:'{!ruleSetsGridRef.selection}'
                            },
                            handler : 'onAddRuleSetDetail'
                        },
                        {
                            xtype: 'button',
                            text: 'Delete Row',
                            bind: {
                                disabled:'{!ruleDetailsGridRef.selection}'
                            },
                            handler : 'onRemoveRuleSetDetail'
                        }
                    ]
                }
            ],
            listeners : {
                canceledit: 'onruleDetailsGridItemCancelEdit',
                edit: 'onruleDetailsGridItemComplete',
                beforeedit: 'ontruleDetailsGridItemStartEdit'
            }
        }
    ]
});