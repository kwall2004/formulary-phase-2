/**
 * Created by agupta on 12/15/2016.
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.CredFaxQueueWin', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-CredFaxQueueWin',
    controller: 'CredFaxQueueWinController',
    viewModel: 'CredFaxQueueWinModel',
    title: 'Fax Queue',
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    height: 470,
    width: 1000,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    itemId: 'CredFAXQueueList',
                    bind: {
                        store: '{CredFAXQueueList}'
                    },
                    name: 'CredFAXQueueList',
                    width: 300,
                    displayField: 'text',
                    valueField: 'value',
                    value: '1',
                    listeners: {
                        select: 'faxQueueUpdate'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Rcvd between',
                    labelWidth: 80,
                    itemId:'StartDate',
                    format: 'm/d/Y',
                    disabled: true
                },
                {
                    xtype: 'datefield',
                    itemId:'EndDate',
                    format: 'm/d/Y',
                    disabled: true
                },
                {
                    xtype: 'button',
                    itemId: 'btnSearch',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                },
                {
                    xtype: 'button',
                    itemId: 'btnReset',
                    text: 'Reset',
                    iconCls: 'x-fa fa-reply',
                    handler: 'onReset'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId: 'FaxQGridPanel',
            flex: 1,
            selectionModel : {
                singleSelect : true
            },
            bind: {
                store: '{FaxQStore}'
            },

            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    dragGroup: 'faxDDGroup',
                    dropGroup: 'faxDDGroup',
                    enableDrop: false
                }
            },

            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{FaxQStore}'
                },
                pageSize: 12,
                dock: 'bottom',
                displayInfo: true
            }],
            columns: {
                defaults: {
                    flex: 1
                },
                items: [

                    {text: 'ID(*Filter)', dataIndex: 'DocumentID'},
                    {text: 'Date Rcvd.', dataIndex: 'RecieptDate', xtype: 'datecolumn', format: 'm/d/Y'},
                    {text: 'Time Rcvd.', dataIndex: 'RecieptTime'},
                    {text: 'SystemID', dataIndex: 'SystemID', hidden: true},
                    {text: 'Assign To', dataIndex: 'AssignTo', hidden: true},
                    {text: 'AckDate', dataIndex: 'AckDate', hidden: true},
                    {
                        xtype: 'actioncolumn',
                        text: 'View',
                        hideable: false,
                        iconCls: 'x-fa fa-file-pdf-o',
                        align: 'center',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var gridPanel = grid.up('panel'),
                                vc = Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').up('panel').up('panel').controller;
                            vc.getDocumentDetails(rec.data.DocumentID);
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        text: 'Acknowledge',
                        hideable: false,
                        widget: {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'fa fa-check',
                                    text: 'Acknowledge',
                                    itemId: 'btnAcknowledge',
                                    handler: 'onAcknowledge'
                                }
                            ]
                        },
                        onWidgetAttach: function(col, widget, rec) {
                            //var faxQueue = this.getView().up().up().down('#CredFAXQueueList').getValue();
                            if (rec.data.AcknowledgedDate != '' && rec.data.AcknowledgedDate != null){
                                widget.down('#btnAcknowledge').setDisabled(true);
                                widget.down('#btnAcknowledge').setTooltip('Acknowledged');
                            }
                            else {
                                widget.down('#btnAcknowledge').setDisabled(false);
                                widget.down('#btnAcknowledge').setTooltip('');
                            }
                        }
                    }
                ]
            }
        }
    ]

});