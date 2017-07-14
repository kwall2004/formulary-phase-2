
Ext.define('Atlas.letter.view.LetterDetailPlan', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    //extend: 'Ext.grid.plugin.RowEditing',
    xtype: 'LetterDetail',
    title: 'Letter Detail for Plan',
    layout: 'fit',
    controller: 'letterdetailplanctrl',
    viewModel: 'letterdetailplanvm',
    bind: '{letterdetailplandata}',
    plugins: {
        ptype: 'rowediting',
        clicksToEdit: 2,
        listeners: {
            edit: 'onEdit'
        }
    },
    columns: [
        {
            text: 'Plan Group Name',
            dataIndex: 'planGroupId',
            flex: 1,
            editor: {
                xtype: 'plangrouptypeahead',
                allowBlank: false,
                matchFieldWidth: false,
                listeners: {
                    select: 'setPlanGroupText'
                }
            },
            renderer: 'displayPlanGroupName'
        },
        {
            text: 'Letter Name',
            dataIndex: 'LetterNameID',
            flex: 1,
            editor: {
                xtype: 'combobox',
                displayField: 'LetterName',
                valueField: 'LetterNameID',
                allowBlank: false,
                matchFieldWidth: false,
                forceSelection: true,
                queryMode: 'local',
                bind: {
                    store: '{lettertypes}'
                }
            },
            onWidgetAttach: function(col, widget, rec) {
                widget.setVisible(rec.get('isNeedUpdate'));
                col.mon(col.up('gridpanel').getView(), {
                    itemupdate: function() {
                        widget.setVisible(rec.get('isNeedUpdate'));
                    }
                });
            },
            renderer: 'displayLetterName'
        },
        {
            text: 'FromType',
            dataIndex: 'letterFrom',
            flex: 1,
            editor: {
                xtype: 'combobox',
                displayField: 'LetterFrom',
                valueField: 'LetterFrom',
                dataIndex: 'LetterFrom',
                queryMode: 'local',
                store: {
                    fields: ['LetterFrom', 'LetterFromDisplay'],
                    data : [
                        {"LetterFrom":"MRx", "LetterFromDisplay":"MRx"},
                        {"LetterFrom":"Plan", "LetterFromDisplay":"Plan"}
                    ]
                }
            }
        },
        {
            text: 'Left Header',
            dataIndex: 'leftHeader',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'leftHeader'
            }
        },
        {
            text: 'Right Header',
            dataIndex: 'rightHeader',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'rightHeader'
            }
        },
        {
            text: 'Left Footer',
            dataIndex: 'leftFooter',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'leftFooter'
            }
        },
        {
            text: 'Right Footer',
            dataIndex: 'rightFooter',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'rightFooter'
            }
        },
        {
            text: 'Signature',
            dataIndex: 'signedBy',
            flex: 1,
            editor: {
                xtype: 'combobox',
                displayField: 'ListValue',
                valueField: 'ListValue',
                dataIndex: 'ListValue',
                matchFieldWidth: false,
                publishes: 'value',
                queryMode: 'local',
                bind: {
                    store: '{queryDB}'
                },
                listeners: {
                    //change: 'onStateChange'
                }
            }
        },
        {
            text: 'Override By user',
            xtype:'checkcolumn',
            dataIndex: 'overrideSignedBy',
            flex: 1,
            editor: {
                xtype: 'checkbox',
                dataIndex: 'overrideSignedBy'
            }
        },
        {
            text: 'Custom Field Labels',
            dataIndex: 'customFieldLabels',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'customFieldLabels'
            }
        },
        {
            text: 'Custom Field List',
            dataIndex: 'customFieldList',
            flex: 1,
            editor: {
                xtype: 'textfield',
                dataIndex: 'customFieldList'
            }
        },
        {
            xtype: 'widgetcolumn',
            align: 'center',
            width: 100,
            hideable : false,
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
                        preventDefault:true,
                        width: 75,
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {
                            tooltip: 'Reject '
                        },
                        handler:'onReject'
                    }
                ]
            },
            onWidgetAttach: function(col, widget, rec) {
                widget.setVisible(rec.get('isNeedUpdate'));
                col.mon(col.up('gridpanel').getView(), {
                    itemupdate: function() {
                        widget.setVisible(rec.get('isNeedUpdate'));
                    }
                });
            }
        }
    ],
    tbar: [
        {
            xtype: 'button',
            text: 'Add',
            cls: 'btn-small',
            iconCls: 'x-fa fa-plus-square',
            listeners: {
                click: 'onActionClick'
            }
        },
        {
            xtype: 'button',
            text: 'Remove',
            cls: 'btn-small',
            iconCls: 'x-fa fa-minus-square',
            listeners: {
                click: 'onActionClick'
            }
        }
    ],
    bbar: ['->',
        {
            xtype: 'button',
            text: 'Save',
            cls: 'btn-small',
            iconCls: 'x-fa fa-floppy-o',
            listeners: {
                click: 'onActionClick'
            }
        }
    ],
    dockedItems: [{
        dock: 'bottom',
        xtype: 'pagingtoolbar',
        bind:{
            store: '{letterdetailplandata}'
        },
        displayInfo: true
    }]
});