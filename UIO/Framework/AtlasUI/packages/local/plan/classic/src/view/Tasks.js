Ext.define('Atlas.plan.view.Tasks', {
    extend: 'Ext.panel.Panel',
    controller: 'plantaskscontroller',
    viewModel: 'plantasksviewmodel',
    title:'Task Scheduler',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: true,
    items: [{
        xtype: 'fieldset',
        title: 'Advanced Filter',
        iconCls: 'x-fa fa-filter',
        minWidth: 610,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'fieldcontainer',
            layout: {
                type:"hbox",
                align: "stretch"
            },
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Due Date From',
                labelWidth: 95,
                minWidth: 220,
                flex:2,
                itemId: 'fromDateTasks',
                reference: 'fromDateTask',
                value: new Date(),
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDateRange'
                    // ,render: function(val) {
                    //     val.setValue(Ext.Date.format(Atlas.common.Util.getServerDateTime(), 'm/d/Y'));
                    // }

                }
            },
            {
                xtype: 'combobox',
                fieldLabel: 'Task',
                labelWidth: 40,
                minWidth: 160,
                itemId: 'cbxTask',
                flex:2,
                queryMode: 'local',
                bind: {
                    store: '{pbmTaskConfig}'
                },
                value: 0,
                forceSelection: true,
                displayField: 'TaskName',
                valueField: 'TaskConfigId'
            },
            {
                xtype: 'checkbox',
                margin: '2 0 2 0',
                itemId: 'chkActive',
                labelWidth: 85,
                minWidth: 110,
                flex: 1,
                fieldLabel: 'Show Inactive'
            },
                {
                    xtype: 'container',
                    flex: 4,
                    minWidth: 77,
                    items: [{
                        xtype: 'button',
                        width:75,
                        text: 'Search',
                        iconCls: 'x-fa fa-binoculars',
                        reference: 'searchButtonTaskSched',
                        listeners: {
                            click: 'searchTasks'
                        }
                    }]
                }
            ]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type:"hbox",
                align: "stretch"
            },
            items:[{
                xtype: 'datefield',
                fieldLabel: 'Due Date To',
                labelWidth: 95,
                minWidth: 220,
                flex: 2,
                value: Ext.Date.add(new Date(), Ext.Date.DAY, 30),
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDateRange'
                }
            }, {
                xtype: 'combobox',
                fieldLabel: 'Status',
                itemId: 'cbxTaskStatus',
                labelWidth: 40,
                minWidth: 160,
                displayField: 'name',
                valueField: 'value',
                flex: 2,
                value: '',
                queryMode: 'local',
                bind: {
                    store: 'pbmTaskStat'
                }
            }, {
                xtype: 'container',
                flex: 1,
                minWidth: 110
            }, {
                xtype: 'container',
                flex: 4,
                minWidth: 77,
                items: [{
                    xtype: 'button',
                    width:75,
                    text: 'Reset',
                    iconCls: 'x-fa fa-repeat',
                    listeners: {
                        click: 'resetPage'
                    }
                }]

            }]
        }]
    }, {
        xtype: 'gridpanel',
        minWidth: 630,
        flex: 1,
        bind: {
            store: '{pbmTaskScheduler}'
        },
        listeners: {
            rowdblclick: 'updateRow'
        },
        columns:[{
            text: 'Task',
            dataIndex: 'taskDescription',
            flex: 1
        }, {
            text: 'Run Program',
            dataIndex: 'runProgram',
            flex: 1
        }, {
            text: 'Submission From',
            dataIndex: 'dueDateBegin',
            xtype: 'datecolumn',
            renderer:function(value)
            {
                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s A');
            },
            //renderer: Ext.util.Format.dateRenderer('m/d/Y g:i:s A'),
            // listeners : {
            //     render: function(c) {
            //          return Ext.Date.format(Atlas.common.Util.getServerDateTime(), 'm/d/Y H:i:s');
            //        // c.setMinValue(Ext.Date.format(Atlas.common.Util.getServerDateTime(), 'm/d/Y'));
            //     }
            // },
            filter: {
                type: 'date'
            },
            flex: 1
        }, {
            text: 'Submission To',
            dataIndex: 'dueDateEnd',
            xtype: 'datecolumn',
            renderer:function(value)
            {
                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y H:i:s A');
            },
            //renderer: Ext.util.Format.dateRenderer('m/d/Y g:i:s A'),
            filter: {
                type: 'date'
            },
            flex: 1
        }, {
            text: 'Complete Date',
            dataIndex: 'completeDate',
            renderer:function(value)
            {
                return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(value, 'm/d/Y');
            },
            xtype: 'datecolumn',
            filter: {
                type: 'date'
            },
            flex: 1
        }, {
            text: 'Status',
            dataIndex: 'taskStatus',
            flex: 1
        }],

        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Task Queue',
                labelSeparator: ''
            },
                '->',
            {
                xtype: 'button',
                text: 'Delete Task',
                iconCls: 'x-fa fa-minus-circle',
                listeners: {
                    click: 'deleteTask'
                }
            }, {
                xtype: 'button',
                text: 'Add New Task',
                iconCls: 'x-fa fa-plus-circle',
                listeners: {
                    click: 'onAddNewTaskBtn'
                }
            }]
        }, {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            itemId:'paginginfobar'
            ,displayInfo: true
        }]
    }]
});