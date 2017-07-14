Ext.define('Atlas.plan.view.group.PlanInformation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-planinformation',
    layout: 'border',
    controller: 'planplaninformationcontroller',
    itemId: 'planPlanInformation',

    height: '100%',
    width: '100%',

    viewModel: {
        stores: {
            letterInfo:{
                model: 'Atlas.plan.model.PlanLetterInfo'
            },
            letterInfoVert: {
                model: 'Atlas.plan.model.PlanLetterInfoVert'
            },
            letterMRxInfo: {
                model: 'Atlas.plan.model.PlanLetterInfo'
            },
            letterMRxInfoVert: {
                model: 'Atlas.plan.model.PlanLetterInfoVert'
            }
        }
    },

    items:[
        {
            region: 'center',
            layout:'hbox',
            flex:3,
            defaults: {
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    listeners: {
                        edit: 'editTopGrids'
                    }
                }]
            },
            items:[
                {
                    xtype:'gridpanel',
                    title: 'Plan',
                    bind: {
                        store: '{letterInfoVert}'
                    },
                    flex:1,
                    columns:[{
                        text: 'Letter Fields',
                        flex: 1,
                        dataIndex: 'letterFields'
                    }, {
                        text: 'Values',
                        flex: 2,
                        dataIndex: 'value',
                        editor: {}
                    }],
                    height: '100%',
                    scrollable: true
                },
                {
                    xtype:'gridpanel',
                    title: 'MRx',
                    scrollable: true,
                    height: '100%',
                    bind: {
                        store: '{letterMRxInfoVert}'
                    },
                    flex:1,
                    columns:[{
                        text: 'Letter Fields',
                        flex: 1,
                        dataIndex: 'letterFields'
                    }, {
                        text: 'Values',
                        flex: 2,
                        dataIndex: 'value',
                        editor: {}
                    }]
                }
            ]
        },
        {
            region: 'south',
            flex:2,
            split: 'true',
            xtype: 'panel',
            layout: 'fit',
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Save',
                        itemId: 'planInformationSave',
                        iconCls: 'x-fa fa-floppy-o',
                        disabled: true,
                        handler: 'saveBtn'
                    }]
            }],
            items:[
                {
                    xtype:'common-shared-editablegrid',
                    viewModel: {
                        type: 'common-shared-editgridmodel',
                        data:{
                            //note: this needs to move to controller with user permissions
                            userpermissions: {
                                create: true,
                                //update: true,
                                destroy: true
                            }
                        },
                        stores: {
                            letterDisclaimers: {
                                model: 'Atlas.plan.model.LetterDisclaimers'
                            }
                        }
                    },
                    laytout: 'fit',
                    height: '100%',
                    controller: 'planplaninformationcontroller',
                    title: 'Disclaimers',
                    bind: {
                        store: '{letterDisclaimers}'
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        triggeredEvent: 'celldblclick',
                        removeUnmodified: true,
                        listeners: {
                            edit: 'editDisclaimers',
                            beforeedit: 'checkForCurrentEdits',
                            canceledit: 'onCancelEdit'
                        }
                    }],
                    selModel: {
                        mode: 'MULTI'
                    },
                    columns:[{
                        text: 'Disclaimer Name',
                        flex: 6,
                        dataIndex: 'DisclaimerName',
                        editor: {
                            allowBlank: false
                        }
                    }, {
                        text: 'Disclaimer Text',
                        flex: 18,
                        dataIndex: 'DisclaimerText',
                        editor: {
                            allowBlank: false
                        }
                    }, {
                        text: 'Conversion Needed',
                        flex: 4,
                        dataIndex: 'ConversionNeeded',
                        editor: {
                            xtype: 'checkbox'
                        },
                        renderer: 'renderConversion'
                    }, {
                        text: 'From Type',
                        flex: 4,
                        dataIndex: 'LetterFrom',
                        editor: {
                            allowBlank: false,
                            xtype: 'combobox',
                            displayField: 'name',
                            valueField: 'name',
                            store: {
                                data: [{
                                    name: 'MRx'
                                }, {
                                    name: 'Plan'
                                }]
                            }
                        }
                    }, {
                        xtype: 'widgetcolumn',
                        width: 85,
                        hideable: false,
                        widget: {
                            xtype: 'button',
                            text: 'Reject',
                            iconCls: 'x-fa fa-refresh',
                            /*bind: {
                                hidden: '{!record.isUpdated}'
                            },*/
                            width: 75,
                            handler: 'onBtnReject'
                        },
                        onWidgetAttach: function(col, widget, rec) {
                            widget.setVisible(rec.get('isUpdated'));
                            col.mon(col.up('gridpanel').getView(), {
                                itemupdate: function() {
                                    widget.setVisible(rec.get('isUpdated'));
                                }
                            });
                        }
                    }]
                }
            ]
        }

    ]
});