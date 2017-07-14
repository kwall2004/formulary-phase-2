Ext.define('Atlas.pharmacy.view.dispensingfee.DispensingFeeRuleDetailGrid', {
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.panel.Panel',
    xtype: 'dispensingfeeruledtlgrid',
    controller: 'dispensingfeeruledtlgrid',
    title: 'Detail',
    closable: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    flex: 1,
    items: [{
        xtype: 'grid',
        title: 'Dispensing Fees Details',
        flex: 1,
        reference: 'dispensingFeeRuleDetailGrid',
        itemId: 'dispensingFeeRuleDetailGrid',
        bind: {
            store: '{dispFeeRulesDetail}'
        },
        plugins: [
            {
                ptype: 'rowediting',
                reference: 'rowediting',
                triggerEvent: 'celldblclick',
                removeUnmodified: true,
                pluginId: 'rowEditing',
                listeners: {
                    cancelEdit: 'onCancelEdit',             // Removes specific model from store on btnReject.
                    edit: 'completeEdit'                   // Check context.record.dirty set isUpdated on ViewModel.
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
                    itemId: 'btnAdd',
                    text: 'Add',
                    bind: {
                        disabled: '{!selDispFeeRuleId}'
                    }
                }, {
                    iconCls: 'x-fa fa-remove',
                    handler: 'onRemove',
                    alignment: 'right',
                    itemId: 'btnRemove',
                    text: 'Remove',
                    bind: {
                        disabled: '{!canRemove}'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    itemId: 'btnSaveDetails',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onSaveClick'
                }

            ]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 10,
            bind: {
                store: '{dispFeeRulesDetail}'
            }
        }],
        columns: {
            defaults: {
                flex: 1
            },
            items: [
                {
                    text: 'Maint. Days',
                    dataIndex: 'Maintenance',
                    renderer: function (value, meta, rec) {
                        var vc = this.up('dispensingfeeruledtlgrid').controller;
                        return vc.cbxListItemsRenderer(value, 'maintenance', 'value', 'name');
                    },

                    editor: {
                        xtype: 'combobox',
                        autoLoadOnValue: true,
                        name: 'cbxMainteneance',
                        emptyText: '[Maintenance Type]',
                        allowBlank: false,
                        bind: {
                            store: '{maintenance}'
                        },
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        editable: true
                    }
                },
                {
                    text: 'Drug Type',
                    dataIndex: 'DrugType',
                    renderer: function (value, meta, rec) {
                        var vc = this.up('dispensingfeeruledtlgrid').controller;
                        return vc.cbxListItemsRenderer(value, 'drugType', 'value', 'name');
                    },

                    editor: {
                        xtype: 'combobox',
                        autoLoadOnValue: true,
                        name: 'cbxDrugType',
                        emptyText: '[Drug Type]',
                        allowBlank: false,
                        bind: {
                            store: '{drugType}'
                        },
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        editable: true
                    }
                },
                {
                    text: 'OTC',
                    dataIndex: 'OTCInd',
                    renderer: function (value, meta, rec) {
                        var vc = this.up('dispensingfeeruledtlgrid').controller;
                        return vc.cbxListItemsRenderer(value, 'otcInd', 'value', 'name');
                    },

                    editor: {
                        xtype: 'combobox',
                        autoLoadOnValue: true,
                        name: 'cbxOtcInd',
                        emptyText: '[Otc Ind]',
                        allowBlank: true,
                        bind: {
                            store: '{otcInd}'
                        },
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        editable: true
                    }
                },
                {
                    text: 'Range Basis',
                    dataIndex: 'RangeBasis',
                    renderer: function (value, meta, rec) {
                        var vc = this.up('dispensingfeeruledtlgrid').controller;
                        return vc.cbxListItemsRenderer(value, 'rangeBasis', 'value', 'name');
                    },

                    editor: {
                        xtype: 'combobox',
                        autoLoadOnValue: true,
                        name: 'cbxRangeBasis',
                        emptyText: '[Range Basis]',
                        allowBlank: true,
                        bind: {
                            store: '{rangeBasis}'
                        },
                        displayField: 'name',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        editable: true
                    }
                },
                {
                    text: 'Range From',
                    dataIndex: 'RangeFrom',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        allowDecimals: true
                    }
                },
                {
                    text: 'Range To',
                    dataIndex: 'RangeTo',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        allowDecimals: true
                    }
                },
                {
                    text: 'DispFee$',
                    dataIndex: 'DispFee',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: true,
                        allowDecimals: true
                    },
                    renderer: function (value) {
                        return '$' + Ext.util.Format.number(value, '0,0.000');

                    }
                },
                {
                    text: 'System ID',
                    dataIndex: 'SystemID',
                    hidden: true
                },
                {
                    xtype: 'widgetcolumn',
                    align: 'center',
                    hideable: false,
                    widget: {
                        xtype: 'button',
                        width: 75,
                        text: 'Reject',
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {

                            tooltip: 'Reject '
                        },
                        handler: 'onBtnReject'

                    },
                    onWidgetAttach: function (col, widget, rec) {

                        widget.setVisible(rec.get('isUpdated'));
                        col.mon(col.up('gridpanel').getView(), {
                            itemupdate: function () {
                                widget.setVisible(rec.get('isUpdated'));
                            }
                        });
                    }
                }

            ]
        },
        selModel: {
            selType: 'rowmodel',
            mode: 'SINGLE',
            listeners: {
                select: 'onGridRowSelect'
            }
        }
    }]
});
