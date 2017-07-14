Ext.define('Atlas.plan.view.benefits.PricingGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-pricinggrid',
    title: 'Pricing Setup',
    controller:"plan-benefitspricinggrid",

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            autoScroll: true,
            title: 'Pricing Setup',
            tbar:[

                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'onPricingAdd',
                    text: 'Add',
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    reference:'btnPricingAdd'
                },
                {
                    xtype: 'button',
                    reference:'btnPricingDelete',
                    iconCls: 'x-fa fa-ban',
                    handler: 'onPricingDelete',
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    text: 'Delete'
                }

            ],
            items: [
                {

                    xtype: 'grid',
                    // title: 'Pricing Setup',
                    reference: 'planBenefitPricingGrid',
                    viewModel: {
                        type: 'common-shared-editgridmodel'
                    },
                    bind:{
                        store: '{planpricingdetail}'
                        // ,
                        // disabled: '{!isEditing}'
                    },


                    columns: {
                        defaults: {
                            width: 180
                        },
                        items: [
                            {text: 'Maint. Days', dataIndex: 'Maintenance',renderer:'maintenanceDaysRenderer',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'maintenanceDays',
                                    emptyText: '',allowBlank: false,  bind: {store: '{maintenance}'},
                                    displayField:'name', valueField:'value',forceSelection: true,
                                    queryMode: 'local',editable: true
                                }
                            },
                            {text: 'Drug Type', dataIndex: 'DrugType',renderer:'drugTypeRenderer',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'drugType',
                                    emptyText: '',allowBlank: false,  bind: {store: '{drugtype}'},
                                    displayField: 'name', valueField: 'value', forceSelection: true,
                                    queryMode: 'local',editable: true
                                }
                            },
                            {text: 'Cost Basis', dataIndex: 'CostBasis',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'maintenanceDays',
                                    emptyText: '',allowBlank: false,  bind: {store: '{costbasis}'},
                                    displayField:'value', valueField:'value',forceSelection: true,
                                    queryMode: 'local',editable: true
                                }
                            },
                            {text: '%', dataIndex: 'DiscPercent',xtype: 'numbercolumn', format:'0,0.00%',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    allowNegative: true,
                                    maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    hideTrigger: true
                                }
                            },
                            {text: '$', dataIndex: 'DiscAmount',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    //minValue: 0,
                                    allowNegative: true,
                                    maxValue: 150000,
                                    maxLength: 6,
                                    enforceMaxLength: true,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Min Disp Fee $', dataIndex: 'DispFee',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Max Disp Fee $', dataIndex: 'maxDispFee',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Addl Disp Fee $', dataIndex: 'addlDispFee',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    hideTrigger: true
                                }
                            },
                            {text: 'GER Disp FEE$', dataIndex: 'dispFeeGER',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    hideTrigger: true
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

                    },
                    plugins: [
                        {
                            ptype: 'rowediting',
                            reference: 'rowediting',
                            triggerEvent: 'celldblclick',
                            removeUnmodified: true,
                            pluginId: 'rowEditing',
                            id: 'rowEdit',
                            listeners: {
                                cancelEdit: 'cancelEditButton',
                                edit: 'completeEdit',
                                beforeEdit: 'beforeEdit'
                            }
                        }
                    ]
                }],
            bbar: [
                '->',

                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onPricingAdminEdit',
                    text: 'AdminEdit',
                    bind:{

                        disabled: '{!canEdit}'
                    },
                    reference: 'btnPricingAdminEdit'
                },
                {
                    xtype: 'button',
                    reference: 'btnPricingAdminSave',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onPricingSave',
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    text: 'Save'
                }

            ]
        }]

});