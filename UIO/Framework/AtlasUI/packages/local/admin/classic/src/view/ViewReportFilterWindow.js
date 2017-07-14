/**
 * Created by s6685 on 1/31/2017.
 */

Ext.define('Atlas.admin.view.ViewReportFilterWindow', {
    extend: 'Ext.window.Window',
    alias: 'ViewReportFilterWindow',
    xtype: 'ViewReportFilterWindow',
    viewModel: {
        stores: {
            reportFilter: {
                model:'Atlas.common.model.ReportFilters'
            }

        }
    },
    controller:'ViewReportFilterWindowController',
    width: 700,
    height: 400,
    iconCls: 'x-fa fa-tasks',
    title: 'Report Filter',
    layout:'fit',
    modal: true,
    items: [
        {
            xtype: 'grid',
            itemId: 'gridReportFilter',
            region: 'center',
            height: '100%',
            flex: 1,
            bind: '{reportFilter}',
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'Parameter Order', dataIndex: 'ParameterOrder', editor:{
                        allowBlank:false,
                        xtype:'textfield',
                        maskRe: /[0-9]/
                    }},
                    {text: 'Control Type', dataIndex: 'ControlType', editor:{
                        allowBlank:false,
                        xtype:'combo',
                        store:['ComboBox','MultiComboBox','DateField','DateRange','NumberField','TextField','FileUploadField']

                    }},
                    {text: 'Label Name', dataIndex: 'LabelName', editor:{
                        allowBlank:false,
                        xtype:'textfield'
                    }},
                    {text: 'Default Value(not required', dataIndex: 'Description', editor:{
                        xtype:'textfield'
                    }},
                    {
                        text: 'Is Required Field', dataIndex: 'isFilterReqd',
                        editor: {
                            xtype: 'checkbox',
                            inputValue: true,
                            uncheckedValue: false
                        },
                        xtype: 'checkcolumn',
                        filter: {type: 'boolean'}
                    },
                    {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        width: 80,
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
                                    handler: 'onUndoChangeClick'
                                }
                            ]
                        }
                    }

                ]
            },
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                listeners: {
                    'canceledit': function (rowEditing, context) {
                        if (context.record.phantom) {
                            context.store.remove(context.record);
                        }
                    },
                    'edit': 'afteredit'
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'x-fa  fa-plus-circle',
                            listeners: {
                                click: 'onFilterAdd'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'x-fa  fa-minus-circle',
                            listeners: {
                                click: 'removeFilterRecord'
                            }
                            // ,
                            // bind:{
                            //     disabled: '{!admin-reportsettings.selection}'
                            // }
                        }
                    ]
                }, {
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'label',
                            iconCls: 'x-fa fa-tasks',
                            text:'Please see *Sample Report on how to set default values.'
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            listeners: {
                                click:'saveReportFilter'
                            }
                    }, {
                            xtype: 'button',
                            text: 'Close',
                            iconCls: 'x-fa fa-remove',
                            listeners: {
                            click:'CloseReportFilterWindow'
                             }
                    }]
                },
                {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    displayInfo: true
                }
                ]
        }
    ]
});

