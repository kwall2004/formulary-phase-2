/**
 * Created by T4317 on 11/14/2016.
 */
Ext.define('Atlas.claims.view.FaxQueue', {
    extend: 'Ext.Window',
    itemId: 'claimsFaxQWindow',
    title: 'Fax Queue',
    controller: 'FaxQueueController',
    viewModel: 'ClaimsFaxQ',
    scrollable: true,
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    height: 500,
    width: 925,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    itemId: 'CDAGFAXQueueList',
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            ['1', 'New Faxes'],
                            ['2', 'Acknowledged Faxes']
                        ]
                    },

                    name: 'CDAGFAXQueueList',
                    width: 300,
                    displayField: 'text',
                    valueField: 'value',
                    listeners: {
                        select: 'faxQueueUpdate'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Rcvd between',
                    labelWidth: 80,
                    format: 'm/d/Y',
                    itemId: 'StartDate',
                    disabled: true
                },
                {
                    xtype: 'datefield',
                    itemId: 'EndDate',
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
            itemId: 'FaxQueueGrid',
            flex: 1,
            selectionModel: {
                singleSelect: true
            },
            bind: {
                store: '{faxQueueDocuments}'
            },

            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    dragGroup: 'faxDDGroup',
                    dropGroup: 'faxDDGroup',
                    copy: true,
                    enableDrop: false
                }
            },

            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{CDAGFAXQueueDocuments}'
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
                    {
                        xtype: 'actioncolumn',
                        text: 'View',
                        iconCls: 'x-fa fa-file-pdf-o',
                        align: 'center',
                        handler: 'onViewDoc'
                    },
                    {text: 'ID(*Filter)', dataIndex: 'DocumentID'},
                    {text: 'Date Rcvd.', dataIndex: 'RecieptDate', xtype: 'datecolumn', format: 'm/d/Y'},
                    {text: 'Time Rcvd.', dataIndex: 'RecieptTime'},
                    {
                        xtype: 'widgetcolumn',
                        text: 'Acknowledge',
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
                        onWidgetAttach: function (col, widget, rec) {
                            var faxQueue = this.getView().up().up().down('#CDAGFAXQueueList').getValue();

                            if (rec.data.AcknowledgedDate != '' && rec.data.AcknowledgedDate != undefined) {
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

