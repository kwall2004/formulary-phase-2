/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.MedispanToFDB', {
    extend: 'Ext.panel.Panel',
    xtype: 'medispantofdb',
    /*viewModel: {
     type: 'cdagviewmodel'
     },*/
    viewModel: 'medispantofdbviewmodel',
    //itemId: 'cdagmain',
    title: 'Medispan To FDB',
    controller: 'medispantofdbcontroller',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel',
            title:'First Databank Search:',
            border:true,
            layout: 'fit',
            flex: 1,
            tbar:[
                {
                    xtype: 'drugtypeahead',
                    emptyText:'[e.g. 00247008500 or ACETAMINOPHEN]',
                    itemId: 'cbxNDC',
                    fieldLabel: 'First Databank NDC/LN',
                    width: 400,
                    displayField: 'LN',
                    valueField: 'NDC',
                    labelStyle: 'width:150px',
                    hideLabel: false,
                    listeners: {
                        select: 'cbxNDC_Select'
                    },
                    listConfig: {
                        // Custom rendering template for each item
                        userCls: 'common-key-value-boundlist',
                        getInnerTpl: function() {
                            return '<h5>NDC:<span>{NDC}</span></h5>'+
                                '<h5>Label:<span>{LN}</span></h5>'+
                                '<h5>Brand:<span>{BN}</span></h5>'+
                                '<h5>GCN:<span>{GCN_SEQNO}</span></h5>'
                        }
                    }
                },
                {
                    xtype: 'button',
                    text:'Reset',
                    iconCls: 'x-action-col-icon x-fa fa-undo',
                    handler: 'btnResetClick'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Export To Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'btnExportClick'
                }
            ],
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpMedispan',
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddClick'
                        }
                    ],
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Medispan NDC', dataIndex: 'NDC',
                                editor: {
                                    xtype: 'gpindctypeahead',
                                    emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                                    allowBlank: false,
                                    displayField: 'NDC',
                                    valueField: 'NDC',
                                    itemId: 'cbxMedispanNDC',
                                    width: 400,
                                    hideLabel: true,
                                    listeners: {
                                        select: 'cbxMedispanNDC_Select'
                                    }
                                }

                            }
                            ,
                            {
                                text: 'Drug Name', dataIndex: 'LN',
                                editor: {
                                    itemId: 'drugName',
                                    allowBlank: false,
                                    disabled: true
                                }
                            },
                            {
                                text: 'First Databank GCN', dataIndex: 'GCN',
                                editor: {
                                    xtype: 'drugtypeahead',
                                    emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                                    allowBlank: false,
                                    displayField: 'GCN_SEQNO',
                                    valueField: 'GCN_SEQNO',
                                    itemId: 'cbxMember',
                                    width: 400,
                                    hideLabel: true,
                                    listeners: {
                                        select: 'cbxNDCGrid_Select'
                                    },
                                    listConfig: {
                                        // Custom rendering template for each item
                                        userCls: 'common-key-value-boundlist',
                                        getInnerTpl: function() {
                                            return '<h5>NDC:<span>{NDC}</span></h5>'+
                                                '<h5>Label:<span>{LN}</span></h5>'+
                                                '<h5>Brand:<span>{BN}</span></h5>'+
                                                '<h5>GCN:<span>{GCN_SEQNO}</span></h5>'
                                        }
                                    }
                                }
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

                            }
                        ]
                    },
                    selModel: 'rowmodel',
                    plugins:[{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        autoCancel: false,
                        errorSummary: false,
                        width: 300,
                        listeners: {
                            'canceledit': function (rowEditing, context) {
                                if (context.record.phantom) {
                                    context.store.remove(context.record);
                                }
                            },
                            edit: 'completeEdit'
                        }
                    },
                        {
                            ptype: 'gridexporter'
                        }
                    ],
                    listeners: {
                        beforeedit: 'gpMedispan_beforeedit',
                        itemdblclick: 'gpMedispan_ItemDblClick'
                    },
                    bind: '{storeMedispan}',
                    dockedItems: [
                        {
                            xtype:'toolbar',dock:'bottom',
                            items:[
                                '->'
                                , {
                                    xtype: 'button', text: 'Save',
                                    iconCls: 'fa fa-save',
                                    handler:'btnSave_Click'
                                }
                            ]
                        },
                        {
                            xtype: 'pagingtoolbar',
                            hideRefresh:true,
                            bind: '{storeMedispan}',
                            displayInfo: true,
                            dock: 'bottom'
                        }
                    ]
                }
            ]
        }
    ]
})
