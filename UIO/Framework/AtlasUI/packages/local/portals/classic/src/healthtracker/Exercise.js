Ext.define('Atlas.portals.view.healthtracker.Exercise', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-exercise',

    title: 'Exercise',

    scrollable: 'y',

    controller: 'exercisecontroller',

    viewModel: 'exercisemodel',

    layout: 'border',

    items: [
        {
            xtype: 'container',

            region: 'center',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            items: [
                {
                    xtype: 'container',

                    layout: 'border',

                    items: [
                        {
                            xtype: 'gridpanel',
                            viewConfig:{
                                markDirty:false
                            },

                            region: 'north',

                            height: 400,

                            title: 'Exercise',

                            cls: 'card-panel',

                            reference: 'exerciseGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{exercisestore}'
                            },

                            listeners: {
                                canceledit: 'cancelExerciseEdit',
                                edit: 'editExercise',
                                beforeedit: 'maybeEditExercise',
                                'selectionchange': function(view, records){
                                    this.down('#removeExercise').setDisabled(!records.length);
                                }
                            },

                            columns: [
                                {
                                    text: 'Date',
                                    dataIndex: 'dateExercise',
                                    xtype: 'datecolumn',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'm/d/Y',
                                        maxValue: new Date()
                                    },
                                    filter: {type: 'date'}
                                },

                                {
                                    text: 'Type',
                                    dataIndex: 'exerciseType',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{exercisetype}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select exercise type',
                                        typeAhead: true
                                    }
                                },

                                {
                                    text: 'How Long? (in minutes)',
                                    dataIndex: 'exerciseDuration',
                                    flex: 1,
                                    xtype: 'numbercolumn',
                                    editor: {
                                        xtype: 'numberfield',
                                        allowDecimals: false
                                    }
                                },

                                {
                                    text: 'How did you feel?',
                                    dataIndex: 'feeling',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{feelingafter}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select feeling',
                                        typeAhead: true
                                    }
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add Exercise',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addExercise'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Exercise',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeExercise',

                                        itemId: 'removeExercise',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});