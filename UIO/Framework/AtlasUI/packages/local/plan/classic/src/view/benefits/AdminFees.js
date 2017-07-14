/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.benefits.AdminFees', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-adminfees',
    controller: 'plan-benefits-adminfees',
    viewModel: 'plan-benefits-adminfees',

    title: '~administrativefees',


    scrollable: true,

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            autoScroll: true,

            items: [{
                xtype: 'grid',
                reference:'PlanAdminFeeGrid',
                bind: {
                    store: '{planadminfees}'
                },
                plugins: [{
                    ptype: 'rowediting',
                    reference: 'rowediting',
                    triggerEvent: 'celldblclick',
                    removeUnmodified: true,
                    pluginId: 'rowEditing',
                    listeners: {
                        cancelEdit: 'cancelEditButton',
                        edit: 'completeEdit',
                        beforeEdit: 'beforeEdit'
                    }
                }],
                columns: {
                    defaults: {
                        flex: 1,
                        align: 'center'
                    },
                    items: [

                        {
                            text: 'Fee Type',
                            dataIndex: 'feeType',
                            renderer: 'feeTypeRenderer',
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',
                                bind: {store: '{feetypes}'}
                            }
                        },
                        {
                            text: 'Fee Amount',
                            dataIndex: 'feeAmount',
                            xtype: 'numbercolumn',
                            format: '$0.00',

                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                maxLength: 8,
                                enforceMaxLength: true,
                                hideTrigger:true,
                                maxValue:150000
                            }
                        },
                        {
                            text: 'Fee Per Rx (Y/N)',
                            dataIndex: 'feePerRx',
                            xtype: 'checkcolumn',
                            editor: {
                                xtype: 'checkbox',
                                allowBlank: true,
                                checked: true,
                                inputValue: true,
                                uncheckedValue: false

                            },
                            bind: {
                                disabled: '{!record.isEditing}'
                            },
                            renderer: function (value) {
                                if (value)
                                    return 'Yes';
                                else
                                    return 'No';
                            },
                            disabled: true
                        },
                        {
                            text: 'Fee Period',
                            dataIndex: 'feePeriod',
                            renderer: 'feePeriodRenderer',

                            editor: {
                                xtype: 'combobox',
                                allowBlank: true,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',
                                bind: {store: '{feeperiods}'}
                            }
                        },
                        {
                            text: 'Fee Class Type',
                            dataIndex: 'feeClassType',
                            renderer: 'feeClassTypeRenderer',
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',
                                bind: {store: '{feeclasstypes}'},
                                listeners: {
                                    select: 'onFeeClassSelect'
                                }
                            }
                        },
                        {
                            text: 'Fee Class Value',
                            dataIndex: 'feeClassValue',
                            reference: 'feeClassValue',
                            renderer: 'feeClassValueTypeRenderer',
                            editor: {
                                xtype: 'combobox',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',

                                bind: {store: '{feeclassvalues}'}

                            }

                        },
                        {
                            text: 'Start Date',
                            dataIndex: 'startDate',
                            xtype: 'datecolumn',
                            format: 'm/d/Y',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: false
                            }
                        },
                        {
                            text: 'End Date',
                            dataIndex: 'endDate',
                            xtype: 'datecolumn',
                            format: 'm/d/Y',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: true
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
                    ]
                }
            }]

        }],
    dockedItems: [{
        xtype: 'panel',
        title: 'Administrative Fees Maintanence'
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                text: 'Add',
                handler: 'onAdd',
                reference:'btnFeeAdd',
                bind:{
                    disabled: '{!isEditing}'
                }
            },
            {
                xtype: 'button',
                text: 'Remove',
                iconCls: 'x-fa fa-minus-circle',
                handler: 'onRemoveButtonClick',
                reference:'btnFeeRemove',
                bind:{
                    disabled: '{!isEditing}'
                }

            }]

    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                text: 'Admin Edit',
                handler: 'onFeeAdminEdit',
                reference: 'btnFeeAdminEdit',
                bind:{
                    disabled: '{!canEdit}'
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onAdminFeeSave',
                reference: 'btnFeeSave',
                bind:{
                    disabled: '{!isEditing}'
                }

            }]
    }]

});

