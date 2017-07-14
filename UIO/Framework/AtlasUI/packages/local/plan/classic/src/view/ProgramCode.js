/**
 * Created by b2352 on 12/21/2016.
 */


Ext.define('Atlas.plan.view.ProgramCode', {
    extend: 'Ext.panel.Panel',
    xtype: 'widget.plan-programcode',
    alias: 'widget.plan-programcode',
    controller: 'plan-programcode',
    viewModel: 'plan-programcode',

    layout: 'fit',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                iconCls: 'x-fa fa-plus-circle',
                handler: 'onAdd',
                alignment: 'right',
                text: 'Add'
            }, {
                iconCls: 'x-fa fa-remove',
                handler: 'onRemoveButtonClick',
                alignment: 'right',
                text: 'Remove'
            }
        ]
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
            {
                xtype: 'pagingtoolbar',

                bind:
                {
                    store:'{programcodes}'
                },
                displayInfo: true,
                hideRefresh: true
            }, '->',
            {
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onSaveClick'
            }
        ]
    }],

    items: [{
        xtype: 'grid',
        reference: 'PlanProgramGrid',
        //itemId: 'PlanProgramGrid',
         bind: {
            store: '{programcodes}'
        },
        plugins: [{
            ptype: 'rowediting',
            clicksToMoveEditor: 1,
            errorSummary: false,
            autoCancel: false,
            listeners: {
                cancelEdit: 'cancelEditButton',
                edit: 'completeEdit',
                beforeEdit: 'beforeEdit'
            }
        }],
        columns: {
            defaults: {
                flex: 1,
                align: 'left'
            },
            items: [
                {
                    text: 'Plan Group Name',
                    dataIndex: 'planGroupId',
                    renderer: 'planGroupNameRenderer',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        reference: 'plangroup',
                        emptyText: 'e.g. MHP Medicare 2011',
                        minChars: 4,
                        queryParam: 'pWhere',
                        bind: {
                            store: '{plangroups}'
                        },
                        //  listeners: {
                        //      select: 'onPlangroupSelect',
                        //      beforequery: function(record){
                        //          record.query = new RegExp(record.query, 'ig');
                        //          record.forceAll = true;
                        //      }
                        //
                        // },
                        listeners:{
                            select: 'onPlangroupSelect',
                            beforequery: function (queryPlan) {
                                var me = this;
                                if (queryPlan.query.length < 3) {
                                    return;
                                }
                                if(queryPlan.query !='') {
                                    queryPlan.query =' wrdidx contains ' + queryPlan.query+ "* ";
                                }

                            }
                        },
                        listConfig: {
                            getInnerTpl: function () {
                                // here you place the images in your combo
                                var tpl = '<div>' +
                                    '<b>{planGroupCode}</b><br/>' +
                                    '{planGroupName}<br/>' +
                                    '{lobName}<br/>' +
                                    '{accountName}</div>';
                                return tpl;
                            }
                        },
                        //reference: 'plangroupcombo',
                        forceSelection: true,
                        name: 'plangroup',
                        displayField: 'planGroupName',
                        valueField: 'planGroupId',
                        hideTrigger:true,
                        typeAhead: false,
                        autoSelect: true
                    }
                },
                {
                    text: 'Plan Benefit Name',
                    dataIndex: 'planBenefitId',
                    renderer: 'planBenefitRenderer',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: false,
                        autoLoadOnValue: true,
                        displayField: 'BenefitName',
                        valueField: 'planBenefitId',
                        bind: {store: '{planbenefitlistItem}'}
                    }
                }, {
                    text: 'Plan Group Code',
                    dataIndex: 'progGroupCode',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Program Benefit Code',
                    dataIndex: 'progBenefitCode',
                    editor: {
                        allowBlank: true,
                        disabled:true
                    }
                },
                {
                    text: 'Program Code Description',
                    dataIndex: 'progDescription',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    text: 'Effective Date',
                    dataIndex: 'effDate',
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false
                    }
                },
                {
                    text: 'Termination Date',
                    dataIndex: 'termDate',
                    xtype: 'datecolumn',
                    format: 'm/d/Y',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: true
                    }
                },
                {
                    text: 'Accumulator Reset Date',
                    dataIndex: 'benefitResetDate',
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: 'Riders',
                    dataIndex: 'groupRiders',
                    renderer: 'groupRidersRenderer',
                    editor: {
                        xtype: 'combobox',
                        allowBlank: true,
                        autoLoadOnValue: true,
                        name: 'groupRiders',
                        displayField: 'name',
                        valueField: 'value',
                        bind: {store: '{plangroupriders}'}
                    }
                },
                {
                    text: 'Rider Tier Code',
                    dataIndex: 'riderTierCodes',
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: 'Rider Coverage Max',
                    dataIndex: 'riderCovMax',
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: 'Employee Group Name',
                    dataIndex: 'empGroupName',
                    editor: {
                        allowBlank: true
                    }
                },
                {
                    text: 'Active',
                    dataIndex: 'active',
                    xtype: 'checkcolumn',
                    bind: {
                        disabled: '{!record.isEditing}'
                    },
                    disabled: true,
                    editor: {
                        xtype: 'checkbox',
                        allowBlank: true,
                        checked: true,
                        inputValue: true,
                        uncheckedValue: false
                    }
                },
                {
                    xtype: 'widgetcolumn',
                    align: 'center',
                    hideable : false,
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

                }
                /*{
                    text: '',
                    xtype: 'widgetcolumn',
                    isEditable: false,
                    widget: {
                       // xtype: 'panel',
                        xtype: 'container',
                        itemId: 'planProgramCodeId',
                        defaults: {
                            xtype: 'tool',
                            viewModel: true
                        },
                        bind: {
                            hidden: '{!record.isUpdated}'
                        },

                        items: [
                            {
                                xtype: 'button',
                                text: 'Reject',
                                handler: 'onUndoChangeClick',
                                iconCls: 'x-action-col-icon x-fa fa-undo',
                                width: 75,
                                border: false,
                                bind: {
                                    hidden: '{!record.isUpdated}'
                                }
                            }

                        ]
                    }
                }*/
            ]
        }
    }]
});

