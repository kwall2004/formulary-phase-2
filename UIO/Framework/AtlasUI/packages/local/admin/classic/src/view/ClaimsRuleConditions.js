Ext.define('Atlas.admin.view.ClaimsRuleConditions', {
    extend: 'Ext.grid.Panel',
    plugins: [{
        ptype: 'rowediting',
        clicksToMoveEditor: 1,
        errorSummary: false,
        autoCancel: false
    }],
    controller: 'claimsruleconditionscontroller',
    viewModel:{
        stores:{
            FieldsFunctionsStore: {
                autoLoad: true,
                remoteFilter: false,
                model: 'Atlas.admin.model.claimdef.ConditionFieldFunction',
                listeners: {
                    load: 'normalizeFieldsFunctions'
                }
            },
            ValuesFunctionsStore: {
                autoLoad: true,
                remoteFilter: false,
                model: 'Atlas.admin.model.claimdef.ConditionValueFieldFunction',
                listeners: {
                    load: 'normalizeFieldsFunctions'
                }
            }
        }
    },
    store: {
        type: 'clonestore',
        proxy: {
            url: 'claims/{0}/claimeditconditions'
        },
        model: 'Atlas.admin.model.claimdef.Conditions'
    },
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        ui: 'footer',
        items: [
            {
                text: 'Add Condition',
                iconCls: 'fa fa-plus-circle',
                reference:'addButton',
                handler: 'onAdd'
            },
            {
                text: 'Delete',
                iconCls: 'fa fa-minus-circle',
                /*bind:{
                    disabled: '{!conditionsgrid.selection}'
                },*/
                handler: 'onRemove'
            }
        ]
    }/*,{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: 'true',
        pageSize: 10,
        bind: {
            store: '{rulesDefinitions}'
        }
    }*/],

    listeners: {
        beforeedit: 'onBeforeEdit',
        canceledit: 'onCancelEdit',
        edit: 'onEdit'
    },
    columns: {
        defaults: {
            flex: 1
        },
        items: [{
            text: 'Id',
            dataIndex: 'ttConditionID',
            width: 75
        }, {
            dataIndex: 'aa',
            text: 'Field/Function Type',
            itemId: 'conditionFilter',
            renderer: 'blankRenderer',
            width: 265,
            editor: {
                xtype: 'combobox',
                forceSelection: true,
                listeners: {
                    select: 'onConditionFilterSelect'
                },
                bind: {
                    store: '{ConditionFilterStore}'
                },
                displayField: 'text',
                valueField: 'value'
            }
        }, {
            text: 'Field/Function',
            dataIndex: 'ttField',
            //width: 265,
            editor: {
                xtype: 'combobox',
                reference: 'cbxFieldFunction',
                allowBlank: false,
                queryMode: 'local',
                grow: true,
                bind: {
                    store: '{FieldsFunctionsStore}'
                },
                listeners: {
                    select: 'onFieldFunctionSelect'
                },
                displayField: 'tDesc',
                valueField: 'tItem'
            },
            renderer: 'rendererFieldFunction'
        }, {
            text: 'Condition',
            dataIndex: 'ttCondition',
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                forceSelection: true,
                queryMode: 'local',
                bind: {
                    store: '{ConditionListStore}'
                },
                displayField: 'ListDescription',
                valueField: 'ListItem'
            },
            width: 100
        }, {
            dataIndex: 'bb',
            text: 'Value Type',
            itemId: 'valuesFilter',
            renderer: 'blankRenderer',
            width: 265,
            editor: {
                xtype: 'combobox',
                allowBlank: true,
                forceSelection: true,
                queryMode: 'local',
                listeners: {
                    select: 'onValueFilterSelect'
                },
                bind: {
                    store: '{ValueFilterStore}'
                },
                displayField: 'text',
                valueField: 'value'
            }
        }, {
            //width: 120,
            text: 'Value',
            editor: {
                xtype: 'combobox',
                reference: 'cbxValue',
                allowBlank: false,
                grow: true,
                queryMode: 'local',
                bind: {
                    store: '{ValuesFunctionsStore}'
                },
                displayField: 'tDesc',
                valueField: 'tItem'
            },
            dataIndex: 'ttValue',
            renderer: 'rendererValueFunction'
        }, {
            text: 'Operator',
            dataIndex: 'ttOperator',
            editor: {
                xtype: 'combobox',
                allowBlank: false,
                forceSelection: true,
                queryMode: 'local',
                bind: {
                    store: '{OperatorStore}'
                },
                displayField: 'ListDescription',
                valueField: 'ListItem'
            },
            width: 75
        }]
    }
});