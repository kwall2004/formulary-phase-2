Ext.define('Atlas.plan.view.group.RuleSetup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-rulesetup',
    controller: 'plan-group-rulesetup',
    viewModel: 'plan-group-rulesetup',

    layout: 'border',
    defaults: {
        bodyPadding: 10
    },
    items: [
        {
            height: '100%',
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'stretch'
            },
            bodyPadding: 10,
            defaults: {
                frame: true,
                bodyPadding: 10
            },
            items: [
                {
                    flex: 3,
                    margin: '0 10 0 0',
                    xtype:'grid',
                    name :'planRulesGrid',
                    reference:'planRulesGrid',
                    bind: {
                        store: '{rules}'
                    },
                    listeners: {
                        select: 'onRuleSelect',
                        rowdblclick: 'onPlanRuleGriddblClick'
                    },
                    tbar:[
                        {xtype: 'combobox', autoLoadOnValue: true, name:'ruletype', fieldLabel: 'RuleType', emptyText: 'Select a rule type',
                            allowBlank: false, bind: {store: '{ruletypes}'}, displayField:'name', valueField:'value',reference:'cmbPlanRuleType',
                            listeners:{
                                select:'OnRuleTypeSelected'
                            }},

                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-plus-circle',
                            handler: 'onRuleAdd',
                            text: 'Add',
                            disabled:true,
                            reference:'btnPlanRuleAdd'
                        },
                        /* {
                         xtype: 'button',
                         iconCls: 'x-fa fa-chevron-circle-up',
                         reference:'btnPlanRuleUpdate',
                         handler: 'onRuleUpdate',
                         disabled:true,
                         text: 'Update'
                         },*/
                        {
                            xtype: 'button',
                            reference:'btnPlanRuleDelete',
                            iconCls: 'x-fa fa-ban',
                            handler: 'onRuleDelete',
                            disabled:true,
                            text: 'Delete'
                        }

                    ],
                    title: 'Rules',
                    columns:[
                        {text: 'ID',dataIndex:'planDURRuleID'},
                        {text: 'Rule Name', dataIndex:'planDURRuleName',flex: 1},
                        {text: 'Rejection Codes',dataIndex:'RejectionCodes', flex: 1},
                        {text: 'Monitor Hours' ,dataIndex:'MonitorHrs'},
                        {text: 'DUR Type',dataIndex:'DURDesc', flex: 1},
                        {text: 'DUR Condition',dataIndex:'DURCondDesc', flex: 1},
                        {text: 'All Level',dataIndex:'allLevels', flex: 1, renderer:'renderAllLevel'},
                        {text: 'ETC',dataIndex:'ultimateChildETCID'},
                        {text: 'GCN',dataIndex:'GCN_SEQNOultimateChildETCID', flex: 1},
                        {text: 'GPI',dataIndex:'GPICode'},
                        {text: 'NDC',dataIndex:'NDC'},
                        {text: 'Eff.Date',dataIndex:'effDate', flex: 1,dateformat: 'm/j/Y', xtype: 'datecolumn'},
                        {text: 'Term Date',dataIndex:'termDate', flex: 1,dateformat: 'm/j/Y', xtype: 'datecolumn'},
                        {text: 'Active',dataIndex:'ACTIVE', renderer:'renderActive'}
                    ],
                    dockedItems: {
                    xtype: 'pagingtoolbar',
                    bind: '{rules}',
                    dock:'bottom',
                    displayInfo: true,
                    hideRefresh: true
                }
                },
                {
                    flex: 1,
                    xtype:'grid',
                    name :'planRuleDrugsGrid',
                    reference:'planRuleDrugsGrid',
                    bind: {
                        store: '{drugs}'
                    },
                    listeners: {
                        select: 'onRuleDrugsSelect',
                        rowdblclick: 'onPlanRuleDrugsGriddblClick'
                    },
                    tbar:[

                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-plus-circle',
                            handler: 'onRuleDrugsAdd',
                            text: 'Add',
                            disabled:true,
                            reference:'btnPlanRuleDrugAdd'
                        },
                        /*{
                         xtype: 'button',
                         reference:'btnPlanRuleDrugsUpdate',
                         iconCls: 'x-fa fa-chevron-circle-up',
                         handler: 'onRuleDrugsUpdate',
                         disabled:true,
                         text: 'Update'
                         },*/
                        {
                            xtype: 'button',
                            reference:'btnPlanRuleDrugsDelete',
                            iconCls: 'x-fa fa-ban',
                            handler: 'onRuleDrugsDelete',
                            disabled:true,
                            text: 'Delete'
                        },
                        '->',
                        {
                            xtype: 'displayfield',
                            labelWidth: 90,
                            fieldLabel: '<b> Rule ID</b>',
                            reference: 'planDURRuleID'
                        }

                    ],

                    title: 'Rule Drugs',
                    columns:[
                        {text: 'Drug Level', dataIndex:'drugLevelDesc'},
                        {text: 'Value', dataIndex:'drugLevelID'},
                        {text: 'drugDesc', dataIndex:'drugDesc', flex: 1}
                    ]
                }
            ]
        }
    ]

});