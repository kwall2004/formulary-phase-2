/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.ProblemsAndGoals', {
    extend: 'Ext.panel.Panel',
    title: 'Problems And Goals',
    xtype: 'casemanagementProblemsAndGoals',
    alias: 'casemanagementProblemsAndGoals',
    controller: 'problemsandgoalscontroller',
    viewModel: 'ProblemsAndGoalsViewModel',
    requires: [
        'Ext.grid.feature.Grouping'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel',
            flex: 0.7,
            cls: 'card-panel',
            autoScroll: true,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add Problem',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddProblemClick',
                            itemId: 'btnAddMedication'
                        },
                        '-',
                        {
                            xtype: 'button',
                            text: 'Update Problem',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnUpdateMedicationClick',
                            itemId: 'btnUpdateMedication',
                            disabled: true
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Add Goal',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnGoals_Click',
                            itemId: 'btnAddGoal',
                            disabled: true
                        }

                    ]
                }],
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpProblemsAndGoals',
                    height:'100%',
                    width : '100%',
                    flex: 1,

                    //layout:'fit',
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                sortable: true,
                                text: 'Problem/Goals', dataIndex: 'GoalCount',
                                renderer: function (value, summaryData, dataIndex) {
                                    return dataIndex.data.GoalDesc;
                                },
                                summaryType: 'max',
                                summaryRenderer: function (value, summaryData, dataIndex, a) {
                                    var template = '<span style="color:{0};">{1}</span>';
                                    if (value <= 0)
                                        return '<span style="color:red;">(No Goals)</span>';
                                    else if (value == 1)
                                        return '<span style="color:green;">(1 Goal)</span>';
                                    else
                                        return '<span style="color:green;">(' + value + ' Goals)</span>';
                                }
                            },
                            {
                                text: 'ProblemId', dataIndex: 'ProblemId', hidden: true
                            },
                            {
                                text: 'Progress to Goal', dataIndex: 'GoalProgressDesc'
                            },
                            {
                                text: 'Goal Status', dataIndex: 'GoalStatusDesc'
                            },
                            {
                                text: 'Barriers', dataIndex: 'GoalBarriers',
                                renderer: function (value, summaryData, dataIndex) {
                                    var goalBarriers= value;
                                    var barrierCount = 0;
                                    if (goalBarriers != "") {
                                        var arrBarriers = goalBarriers.split(",");
                                        barrierCount = arrBarriers.length;
                                    }
                                    return 'Barriers ('+barrierCount+')';
                                }

                            }
                        ]
                    },
                    listeners: {
                        itemdblclick: 'gpProblemsAndGoals_Click',
                        select: 'gpProblemsAndGoals_select',
                        groupclick: function (view, node, group, e, eOpts) {
                            var grid= this.up('casemanagementProblemsAndGoals').down('#gpProblemsAndGoals');
                            var StoreProblemAndRecords= grid.getStore();
                            grid.getSelectionModel().select(StoreProblemAndRecords.findRecord('ProblemDesc', e.position.record.data.ProblemDesc));
                        }
                    },
                    features: [{
                        id: 'group',
                        ftype: 'groupingsummary',
                        groupHeaderTpl: '{name}'
                    }],
                    bind: '{StoreProblemAndRecords}',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'View PDF',
                                    handler: 'btnViewPDF_Click',
                                    itemId: 'btnViewPDF'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'hidden', itemId: 'hdnProblemId'
                }

            ]
        },
        {
            xtype: 'panel'
            , flex: 0.3,
            cls: 'card-panel',
            itemId:'PlnBarriers',
            disabled:true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    flex:.2,
                    items: [
                        {
                            xtype: 'barrierstypeahead',
                            emptyText: '[e.g. Homeless]',
                            itemId: 'cbxGoalBarriers',
                            fieldLabel: 'Barrier',
                            hideLabel: false
                        },
                        {
                            xtype: 'button',
                            text: 'Add Barrier',
                            iconCls: 'fa  fa-plus-circle',
                            itemId: 'btnAddBarrier',
                            handler: 'btnAddBarrier_Click'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    flex:.8,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'removeBarrier',
                            itemId: 'btnRemove'
                        }],
                    autoScroll: true,
                    itemId: 'grdBarriers',
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Code', dataIndex: 'BarrierCode'
                            },
                            {
                                text: 'Description', dataIndex: 'BarrierDescription'
                            }
                        ]
                    },
                    bind: '{storeBarriers}'
                },
                {
                    xtype: 'hidden', itemId: 'hdnGoalIdBarrier'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'SaveGoalBarriers',
                            itemId: 'btnSaveBarriers'
                        }
                    ]
                }
            ]
        }
    ]
});