Ext.define('Atlas.plan.view.group.PlanLocationCoverage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-planlocationcoverage',
    controller: 'plan-group-planlocationcoverage',
    layout: 'border',
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
            items:[
                {
                    flex:2,
                    xtype:'grid',
                    name :'planLocationCoverageStateGrid',
                    reference:'planLocationCoverageStateGrid',
                    bind: {
                        store: '{planlocationcoveragestate}'
                    },
                    listeners: {
                        select: 'onStateSelect'
                    },
                    columns:[



                        // {text: 'Plan Coverage State', flex: 1,width:150},

                        {text: 'Plan Coverage State', dataIndex: 'stateCode',renderer:'planCoverageStateRenderer',width:150,
                            editor: {
                                xtype: 'combobox', autoLoadOnValue: true, name: 'coverageState',
                                emptyText: '',allowBlank: false,  bind: {store: '{states}'},
                                displayField:'name', valueField:'value'
                            }
                        },

                        {
                            xtype: 'widgetcolumn',
                            align: 'center',
                            hideable : false,
                            //dataIndex:'isUpdated',
                            width: 100,
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
                                        iconCls: 'x-action-col-icon x-fa fa-undo',
                                        bind: {
                                            //hidden: '{!record.isUpdated}',
                                            tooltip: 'Reject '
                                        },
                                        handler: 'onUndoChangeClick'

                                    }
                                ]
                            }
                            ,
                            onWidgetAttach: function(col, widget, rec) {

                                widget.setVisible(rec.get('isUpdated'));
                                col.mon(col.up('gridpanel').getView(), {
                                    itemupdate: function() {
                                        widget.setVisible(rec.get('isUpdated'));
                                    }
                                });
                            }
                        }
                    ],
                    plugins: [
                        {
                            ptype: 'rowediting',
                            reference: 'rowediting',
                            removeUnmodified: true,
                            pluginId: 'rowEditing',
                            listeners: {
                                cancelEdit: 'cancelEditButton',
                                edit: 'completeEdit',
                                beforeEdit: 'beforeEdit',
                                validateedit:'validateEdit'
                            }
                        }
                    ],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',

                        items: [
                            {
                                iconCls: 'x-fa fa-plus-circle',
                                handler: 'onAdd',
                                alignment: 'right',
                                text: 'Add State'
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                handler: 'onRemoveButtonClick',
                                alignment: 'right',
                                text: 'Remove State'
                            }

                        ]

                    }]
                },
                {
                    flex:1,
                    height: '100%',
                    layout: {
                        type: 'vbox',
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
                            flex: 1,
                            margin: '0 0 10 0',
                            xtype:'grid',
                            name :'availableCountyGrid',
                            reference:'availableCountyGrid',
                            bind: {
                                store: '{countybystate}'
                            },
                            selModel: {
                                mode: 'MULTI'
                            },

                            columns:[
                                {text: 'Available County', flex: 1, dataIndex:'name'}
                            ]
                        },
                        {
                            height: 40,
                            dockedItems:[
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        '->',
                                        {iconCls: 'x-fa fa-chevron-down', handler:'onAssignCounty'},
                                        {iconCls: 'x-fa fa-chevron-up', handler:'onRemoveCounty'},
                                        '->'
                                    ]

                                }
                            ]
                        },
                        {
                            flex: 1,
                            xtype:'grid',
                            name :'assignedCountyGrid',
                            reference:'assignedCountyGrid',
                            bind: {
                                store: '{planlocationcoverage}'
                            },
                            selModel: {
                                mode: 'MULTI'
                            },
                            columns:[
                                {text: 'Assigned County', flex: 1, dataIndex: 'planCoverageCountyDesc'}
                            ]
                        }
                    ]
                }
            ]
        }

    ],
    dockedItems: [{
        xtype:'toolbar',
        dock:'bottom',

        items:[
            '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                handler: 'onAdminEditClick',
                alignment: 'right',
                bind:{

                    disabled: '{!canEdit}'
                },
                text: 'Admin Edit'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSaveClick',
                alignment: 'right',
                bind:{
                    disabled: '{!isEditing}'
                },
                text: 'Save'
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-ban',
                handler: 'onMasterCancelClick',
                alignment: 'right',
                bind:{
                    disabled: '{!isEditing}'
                },
                text: 'Cancel'
            }

        ]}]
});