/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.view.PatientSafetyRules', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    xtype: 'admin-patientSafetyRules',

    title: 'Patient Safety Rules',
    reference: 'admin-patientsafetyrules',
    controller: 'admin-patientsafetyrules',
    selModel:{
        mode:'MULTI'
    },
    viewModel: {
        stores: {
            patientSafetyRulesStore: {
                model: 'Atlas.admin.model.PatientSafetyRulesModel',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: false
            },/*
             psRulesDrop: {
             model: 'Atlas.admin.model.planGroupHierarchyExt',
             remoteSort: true,
             remoteFilter: true,
             autoLoad: false

             },*/
            cmsPatSafetyRuleNameStore:{
                type:'admin-cmsPatSafetyRuleName'
            },
            cmsPatSafetyRuleLevelStore:{
                type:'admin-cmsPatSafetyRuleLevel'
            }
        }
    },
    plugins: [
        {
            ptype: 'rowediting',
            triggerEvent: 'celldblclick',
            removeUnmodified: false,
            id: 'rowEdit',
            errorSummary: false,
            listeners: {
                'canceledit': 'cancelEditButton',
                'beforeedit': 'beforeEditing',
                'edit': 'afterEditing'
            }
        }
    ],

    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {
                text: 'Rule Level',
                dataIndex: 'ruleLevel',
                flex:1,
                editor:{
                    xtype:'combo',
                    allowBlank: false,
                    matchFieldWidth: true,
                    reference:'ruleLevelCombo',
                    forceSelection:true,
                    queryMode: 'local',
                    bind: {
                        store: '{cmsPatSafetyRuleLevelStore}'
                    },
                    displayField: 'name',
                    valueField: 'value'
                },
                renderer:'getRuleLevelDesc'
            },
            {
                text: 'Drug Code',
                dataIndex: 'drugCode',
                editor: {allowBlank: false}
            },
            {
                text: 'Drug Category',
                dataIndex: 'drugCategory',
                editor: {}
            },
            {
                text: 'Step Flag',
                dataIndex: 'stepFlag',
                editor: {}
            },
            {
                text: 'Max Dose1',
                dataIndex: 'maxDose1',
                editor: {}
            },
            {
                text: 'Max Dose2',
                dataIndex: 'maxDose2',
                editor: {}
            },
            {
                text: 'Auto Note',
                dataIndex: 'autoNotes',
                editor: {}
            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                width: 100,
                hideable : false,
                flex:0,
                widget: {
                    xtype: 'container',
                    bind: true,
                    defaults: {
                        xtype: 'tool',
                        viewModel: true
                    },

                    items: [
                        // reject tool
                        {
                            xtype: 'button',
                            text: 'Reject',
                            width: 75,
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {
                                hidden: '{!record.isNeedUpdate}',
                                tooltip: 'Reject '
                            },
                            handler: 'onReject'

                            /*,
                             callback: function (owner, tool, e) {
                             var vm = this.getViewModel(),
                             rec = vm.get('record');
                             owner.up('admin-options').getController().onRuleReject(rec);
                             }*/
                        }
                    ]
                }
            }
        ]
    },
    bind: {
        store: '{patientSafetyRulesStore}'
    },
    dockedItems: [

        {
            xtype: 'toolbar',
            dock: 'top',
            alignment: 'left',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    reference:'addButton',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'onAdd',
                    disabled:true
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    reference:'removeButton',
                    iconCls: 'x-fa fa-minus-circle',
                    handler: 'onRemove',
                    disabled:true
                },
                {
                    xtype: 'combobox',
                    alignment:'right',
                    width:'24.25%',
                    fieldLabel: 'Rule Name',
                    matchFieldWidth: false,
                    reference: 'psRuleCombo',
                    name: 'ruleTypes',
                    valueNotFoundText: 'Rule Name',
                    displayField: 'name',
                    valueField: 'value',
                    queryMode: 'local',
                    bind: {
                        store: '{cmsPatSafetyRuleNameStore}'
                    },
                    listeners: {
                        select: "onRulesSelect"
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    text: 'Save',
                    reference:'saveButton',
                    handler: 'onSaveConfirm',
                    iconCls: 'fa fa-save',
                    disabled:true,
                    alignment: 'right'
                }
            ]

        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            layout:'fit',
            items:[
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    pageSize: 25,
                    displayInfo: 'true',
                    bind: {
                        store: '{patientSafetyRulesStore}'
                    }
                }
            ]

        }
    ]
});

