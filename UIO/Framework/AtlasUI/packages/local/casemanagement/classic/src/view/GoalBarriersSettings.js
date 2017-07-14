Ext.define('Atlas.casemanagement.view.GoalBarriersSettings', {
    extend: 'Ext.panel.Panel',
    xtype: 'GoalBarriersSettings',
    title: 'Goal Barriers Settings',
    controller: 'goalBarriersSettingsController',
    flex: 1,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    viewModel: {
        data: {
            goalBarriersSettingsGrid: null
        },
        stores: {
            goalBarriersSettingsStore: {
                model: 'Atlas.casemanagement.model.GoalBarriersSettingsModel',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: true
            },
            StoreGroup: {
                //model: 'Atlas.common.model.UserGroup',
                model: 'Atlas.common.model.UserGroupList',
                autoLoad:false
            }
        }
    },
    items: [
        /*Goal Barriers Settings Grid*/
        {
            xtype: 'grid',
            height:'100%',
            width : '100%',
            flex: 1,
            reference: 'refGoalBarriersSettingsGrid',
            itemId:'GoalBarriersSettingsGrid',
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
                autoCancel: false,
                errorSummary: false,
                listeners: {
                    'canceledit': function (rowEditing, context) {
                        if (context.record.phantom) {
                            if(context.record.data.systemID==0)
                                context.store.remove(context.record);
                        }
                    },
                    edit: 'completeEdit',
                    beforeedit:'beforeEdit'
                }
            },
                {
                    ptype: 'gridfilters'
                }

            ],
            selModel: 'rowmodel',
            bind: {
                store: '{goalBarriersSettingsStore}'
            },
            columns: [
                {text: 'Code', dataIndex: 'reasonCode', flex: 1, editor: {allowBlank: false, enableKeyEvents: true}},
                {
                    text: 'Description (filter*)',
                    dataIndex: 'description',
                    flex: 1,
                    editor: {allowBlank: false, enableKeyEvents: true},
                    filter: {
                        type: 'string'
                    }
                },
                {
                    text: 'User Group', dataIndex: 'TypeCode', flex: 1,
                    renderer: 'rendererGroup',
                    editor: {
                        xtype: 'combo',
                        displayField: 'groupName',
                        id: 'checkCombo',
                        valueField: 'groupId',
                        bind: {
                            store: '{StoreGroup}'
                        },
                        queryMode: 'local',
                        multiSelect: true,
                        forceSelection: true,
                        listConfig: {
                            getInnerTpl: function() {
                                return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {groupName} </div>';
                            }
                        },
                        anyMatch: true,
                        lazyRender: true
                    }

                },
                {
                    text: 'Active',
                    dataIndex: 'active',
                    flex: 1,
                    xtype: 'checkcolumn',
                    stopSelection: true,
                    editor: {xtype: 'checkbox', cls: 'x-grid-checkheader-editor', allowBlank: false}
                },
                {
                    xtype: 'widgetcolumn',
                    align: 'center',
                    widget: {
                        xtype: 'button',
                        width:75,
                        text: 'Reject',
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {

                            tooltip: 'Reject '
                        },
                        handler: 'onUndoChangeClick'

                    },
                    onWidgetAttach: function(col, widget, rec) {

                        widget.setVisible(rec.get('isUpdated'));
                        col.mon(col.up('gridpanel').getView(), {
                            itemupdate: function() {
                                widget.setVisible(rec.get('isUpdated'));
                            }
                        });
                    }

                },
                {text: 'System Id', dataIndex: 'systemID', flex: 1, hidden: true}
            ]
        }],
    dockedItems: [
        {
            dock: 'bottom',
            xtype: 'pagingtoolbar',
            displayInfo: 'true',
            displayMsg: 'Displaying Rules {0} - {1} of {2}',
            bind: {
                store: '{goalBarriersSettingsStore}'
            },
            pageSize: 12
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'fa fa-plus-circle',
                    text: 'Add',
                    handler: 'onAddClick'
                },
                {
                    xtype: 'button',
                    iconCls: 'fa fa-minus-circle',
                    text: 'Remove',
                    handler: 'onRemoveClick',
                    bind: {
                        disabled: '{!refGoalBarriersSettingsGrid.selection}'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    handler: 'onSaveClick'
                }
            ]
        }
    ]
});
