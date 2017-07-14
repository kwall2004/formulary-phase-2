

Ext.define('Atlas.pharmacy.view.PricingTemplateInfo', {
    extend: 'Ext.Panel',
    controller: 'pricingtemplateinfocontroller',
    viewModel: 'pricingtemplateinfoviewmodel',
    itemId: 'pricinginfo_pricingtemplate',
    xtype: 'xtypricinginfo_pricingtemplate',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'gppricingtemplateinfo',
            reference:'gppricingtemplateinfo',
            flex: 1,
            tbar: [
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'fa  fa-plus-circle',
                    handler:'btnAddClick'
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa  fa-minus-circle',
                    handler:'btnRemoveClick'
                }

            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items:[

                    {
                        text: 'Network Type', dataIndex: 'NetworkType', width: 100,
                        editor: {
                            xtype: 'combobox',
                            itemId : 'cbxnetworktype',
                            width: 350,
                            displayField: 'name',
                            valueField: 'value',
                            lazyRender: true,
                            queryMode: 'local',
                            allowBlank:false,
                            listConfig:{
                                maxWidth: 220
                            },
                            bind: {

                                //value:'NetworkType',
                                store: '{storePharContractNetworkType}'
                            }
                        }
                        ,renderer: 'comboBoxNetworkTypeRenderer'
                    },
                    {
                        text: 'Maint Days', dataIndex: 'Maintenance', width: 100,
                        editor: {
                            xtype: 'combobox',
                            itemId : 'cbxmaintdays',
                            width: 350,
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank:false,
                            queryMode: 'local',
                            listConfig:{
                                maxWidth: 220
                            },
                            bind: {
                                //value:'Maintenance',
                                store: '{storeMaintenance}'
                            }
                        }
                        ,renderer: 'comboBoxMaintenanceRenderer'
                    },
                    {
                        text: 'OTC', dataIndex: 'OTCInd', width: 100,
                        editor: {
                            xtype: 'combobox',
                            itemId : 'cbxotc',
                            width: 350,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listConfig:{
                                maxWidth: 220
                            },
                            bind: {
                               // value:'{OTCInd}',
                                store: '{storeOTCInd}'
                            }
                        }
                        ,renderer: 'comboBoxOTCIndRenderer'
                    },
                    {
                        text: 'Drug Type', dataIndex: 'DrugType', width: 100,
                        editor: {
                            xtype: 'combobox',
                            itemId : 'cbxdrugtype',
                            width: 350,
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank:false,
                            queryMode: 'local',
                            listConfig:{
                                maxWidth: 220
                            },
                            bind: {
                                value:'{DrugType}',
                                store: '{storeDrugType}'
                            }
                        }
                        ,renderer: 'comboBoxDrugTypeRenderer'
                    },
                    {
                        text: 'Cost Basis', dataIndex: 'costBasis', width: 100,
                        editor: {
                            xtype: 'combobox',
                            itemId : 'cbxcostbasis',
                            allowBlank:false,
                            width: 350,
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            listConfig:{
                                maxWidth: 220
                            },
                            bind: {
                                value:'{costBasis}',
                                store: '{storeCostBasis}'
                            }
                        }
                       // ,renderer: 'comboBoxCostBasisRenderer'
                    },
                    {
                        text: '(%)', dataIndex: 'DiscPercent', width: 100,
                        renderer: function(value){
                            return value + '%'
                        },
                        editor: {
                            allowBlank: false,
                            width: 400,
                            hideLabel: true
                        }
                    },
                    {
                        text: '($)', dataIndex: 'DiscAmount', width: 100,
                        renderer: function(value){
                            return  '$' + value
                        },
                        editor: {
                            allowBlank: true,
                            width: 400,
                            hideLabel: true
                        }
                    },
                    {
                        text: 'DispFee$', dataIndex: 'DispFee', width: 100,
                        renderer: function(value){
                            return  '$' + value
                        },
                        editor: {
                            allowBlank: true,
                            width: 400,
                            hideLabel: true
                        }
                    },
                    {
                        dataIndex: 'systemID',
                        hidden:true
                    },
                    {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        hideable : false,
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
                            //debugger;

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
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                errorSummary: false,
                listeners: {
                    'canceledit': function (rowEditing, context) {
                        //debugger;
                        if (context.record.phantom) {
                            context.store.remove(context.record);
                        }
                    },
                    'edit': function (rowEditing, context) {
                        //debugger;
                       /* if(context.record.dirty) {
                            // context.grid.columns[3].items[0].hidden = false;
                            //context.grid.getView().refresh();
                        }*/
                        if (context.record.dirty) {
                            //debugger;
                            context.record.set('isUpdated', true);
                        }
                    }
                }
            },
            listeners: {
                //beforeedit: 'gpFormularyDetail_beforeedit'
            },
            bind: '{storepricingdetailtemplate}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storepricingdetailtemplate}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 10
                }

            ]
        },
        {
            // dockedItems : {
            //     dock: 'bottom',
            //     xtype: 'toolbar',
            //     items : [
            //         '->'
            //         ,{xtype: 'button', text: 'Save',handler:'btnSaveClick'}
            //     ]
            // }

        }
    ],
    bbar: [

        '->',
        {xtype: 'button', text: 'Archive this Pricing Template', iconCls: 'fa fa-save', handler: 'btnArchive',itemId:'btnArchive'},
        {xtype: 'button', text: 'View Archived Pricing Template', iconCls: 'fa fa-save', handler: 'btnViewArchive',itemId:'btnViewArchive'},
        {xtype: 'button', text: 'Save', iconCls: 'fa fa-save', handler: 'btnSaveClick'}

    ]
});