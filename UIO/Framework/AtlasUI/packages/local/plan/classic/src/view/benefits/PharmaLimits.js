Ext.define('Atlas.plan.view.benefits.PharmaLimits', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-pharmalimits',
    title: '~pharmalimits',

    // controller: 'plan-group-planclaimrules',

    // layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            minHeight:400,
            alighnment: 'center',
            autoScroll: true,
            items: [
                {

                    xtype: 'grid',
                    minHeight:400,
                    reference: 'refpharmalimitsgrid',
                    itemId: 'grdPlanServiceType',
                    bind: '{PlanServiceTypeStore}',
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            //{text: 'Rule Level', dataIndex: 'RuleLevel',
                            {
                                text: 'Pharmacy Type', dataIndex: 'fulFillmentType', width: 80,
                                renderer:'rendererPharmacyType',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true,
                                    allowBlank: false,itemId:'cbxFulfillmentType',
                                    displayField: 'name', valueField: 'value',
                                    bind: {
                                        store: '{StoreFulfillmentType}'
                                    },
                                    listeners: {
                                        beforeselect: 'SetUniqueFulfillment',
                                        select: 'ValidateEdit'
                                    }
                                }
                            },

                            {
                                text: 'Non Maint. Days Limit', dataIndex: 'daysSupplyNonMaint', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false,
                                    maxLength: 3,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }

                                }
                            },
                            {
                                text: 'Maint. Days Limit', dataIndex: 'daysSupplyMaint', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false, maxValue: 999,
                                    maxLength: 3,
                                    maskRe: /[0-9]/,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }
                                }


                            },

                            {
                                text: 'In Network Cost Sharing Days', dataIndex: 'inNetworkCostSharingDays', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false, minValue: 1,
                                    enforceMaxLength:true,
                                    maxLength:3,
                                    maskRe: /[0-9]/,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else{
                                            return true;
                                        }

                                    }
                                }

                            },

                            {
                                text: 'Out Network Cost Sharing', dataIndex: 'outNetworkCostSharingDays', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false, maxValue: 100,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:3,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }
                                }

                            },

                            {
                                text: 'Non Maint. Qty Limit', dataIndex: 'qtyLimitNonMaint', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:3,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }
                                }
                            },
                            {
                                text: 'Maint. Qty Limit', dataIndex: 'qtyLimitsMaint', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowBlank: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:3,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }
                                }
                            },
                            {
                                text: 'Early Refill(%)', dataIndex: 'earlyRefillPercent', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    allowNegative: false,
                                    maxLength:3,
                                    validator : function(value)
                                    {
                                        if (value>100)
                                        {
                                            return 'Must be less than 100';
                                        }
                                        else
                                            return true;
                                    }
                                },
                                renderer:'renderPercent'
                            },

                            {
                                text: 'Max($) Per 30 days', dataIndex: 'maxDollarPer30Days', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowNegative: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:7,
                                    validator : function(value)
                                    {
                                        if (value>9999)
                                        {
                                            return 'Must be less than 10000';
                                        }
                                        else
                                            return true;
                                    }
                                },
                                renderer:'renderDollar'
                            },
                            {
                                text: 'Max($) Per 60 days', dataIndex: 'maxDollarPer60Days', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowNegative: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:7,
                                    validator : function(value)
                                    {
                                        if (value>9999)
                                        {
                                            return 'Must be less than 10000';
                                        }
                                        else
                                            return true;
                                    }
                                },
                                renderer:'renderDollar'
                            },
                            {
                                text: 'Max($) Per 90 days', dataIndex: 'maxDollarPer90Days', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowNegative: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:7,
                                    validator : function(value)
                                    {
                                        if (value>9999)
                                        {
                                            return 'Must be less than 10000';
                                        }
                                        else
                                            return true;
                                    }
                                },
                                renderer:'renderDollar'
                            },

                            {
                                text: 'Max($) Per Rx', dataIndex: 'maxDollarPerRx', width: 110,
                                editor: {
                                    xtype:'textfield',
                                    allowNegative: false,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength:true,
                                    maxLength:7,
                                    validator : function(value)
                                    {
                                        if (value>9999)
                                        {
                                            return 'Must be less than 10000';
                                        }
                                        else
                                            return true;
                                    }
                                },
                                renderer:'renderDollar'
                            },
                            {
                                text: 'Copay Configured', dataIndex: 'copayConfiguredInd', width: 80, xtype: 'checkcolumn',
                                editable: false,
                                disabled:true
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
                                    handler: function(button){
                                        var record = button.getViewModel().data.record;
                                        if(!record.phantom ) {
                                            record.reject();
                                        }
                                        else
                                        {
                                            //debugger;
                                            var grid = this.up('grid').getView();
                                            grid.store.remove(record);
                                            grid.up().findPlugin('rowediting').cancelEdit();

                                        }

                                    }

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
                            clicksToEdit: 2,
                            triggerEvent: 'celldblclick',
                            autoCancel: false,
                            listeners: {
                             'canceledit': function (rowEditing, context) {
                                    if (context.record.phantom) {
                                        context.store.remove(context.record);
                                    }
                                },
                                select: 'setButtons',
                                'beforeEdit': function (editor,context) {

                                    if(context.column.getXType() == 'widgetcolumn' && !context.field) // this is the Reject Button column and its needed to reject record when added new.
                                    {
                                        if(context.record && context.record.phantom) {
                                            var grid = context.grid.getView();
                                            grid.store.removeAt(context.rowIdx);
                                            return false;
                                        }

                                    }

                                },
                                'edit': function(editor, context)
                                {
                                    var grid = context.grid.getView();
                                    var gridColumns = grid.headerCt.getGridColumns();

                                    if ((Object.keys(context.record.getChanges()).length == 1) && context.record.getChanges().isUpdated){
                                        context.record.set('isUpdated', false);
                                        //btnSave.disable();
                                    }
                                    else {
                                        context.record.set('isUpdated', true);
                                        //btnSave.enable();
                                    }

                                    var curSelModel = grid.getSelectionModel().getSelection()[0];
                                    var curRow = grid.getSelectionModel().getSelection()[0];
                                    this.addedRow = false;
                                }

                            }//,
                           // removeUnmodified: true,
                           // pluginId: 'rowEditing'
                            //id: 'rowEdit',

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
                                text: 'Add',
                                itemId:'btnAdd'
                            },
                            {
                                iconCls: 'x-fa fa-remove',
                                handler: 'btnRemoveClick',
                                alignment: 'right',
                                text: 'Remove',
                                itemId:'btnRemove'
                            }

                        ]

                    }]
                }
            ]
        }
    ]

});