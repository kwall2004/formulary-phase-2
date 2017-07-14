/**
 * Created by akumar on 11/19/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGFaxQueue', {
    extend: 'Ext.window.Window',
    xtype: 'authorization-CDAGFaxQueue',
    controller: 'CDAGFaxQueueController',
    title: 'Coverage Determination Fax Queue',
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
                    itemId: 'CDAGFAXQueueList',
                    bind: {
                        store: '{CDAGFAXQueueList}'
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
                    itemId:'StartDate',
                    disabled: true,
                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j'
                },
                {
                    xtype: 'datefield',
                    itemId:'EndDate',
                    format: 'm/d/Y',
                    disabled: true,
                    altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j'
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
            selectionModel : {
                singleSelect : true
            },
            bind: {
                store: '{CDAGFAXQueueDocuments}'
            },
            plugins: 'gridfilters',
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
                        hideable: false,
                        handler: 'onViewDoc'
                    },
                    { text: 'ID(*Filter)', dataIndex: 'DocumentID', filter: {
                        type: 'string'
                    }},
                    {text: 'Date Rcvd.', dataIndex: 'RecieptDate', xtype: 'datecolumn', format: 'm/d/Y'},
                    {text: 'Time Rcvd.', dataIndex: 'RecieptTime',renderer:function(value,index,record)
                    {
                        if(value)
                        {
                            if(record.data.RecieptDate)
                            {
                                var date=Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal((Ext.Date.format(record.data.RecieptDate, 'm/d/Y')+' '+ value),'m/d/Y H:i:s');
                                return date.split(' ')[1];
                            }
                        }
                    }},
                    {text: 'SystemID', dataIndex: 'SystemID', hidden: true},
                    {text: 'Assign To', dataIndex: 'AssignTo', hidden: true},
                    {text: 'AckDate', xtype: 'datecolumn', dataIndex: 'AcknowledgedDate', format: 'm/d/Y h:i:s A', hidden: true},
                    {text: 'Description', dataIndex: 'DESCRIPTION'},
                    {
                        xtype: 'widgetcolumn',
                        text: 'Initiate PA',
                        hideable: false,
                        width: 150,
                        widget: {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnInitiatePA',
                                    iconCls: 'fa fa-plus-square',
                                    text: 'Create CD',
                                    handler: 'onInitiatePA'
                                }
                            ]
                        },
                        onWidgetAttach: function(col, widget, rec) {
                            var faxQueue = this.getView().up().up().down('#CDAGFAXQueueList').getValue();

                            widget.down('#btnInitiatePA').setDisabled(false);
                            widget.down('#btnInitiatePA').setText('Create CD');

                            if (faxQueue == '10' || faxQueue == '12'){
                                widget.down('#btnInitiatePA').setText('Create DMR');
                            }
                            else if (faxQueue == '9' || faxQueue == '11'){
                                widget.down('#btnInitiatePA').setDisabled(true);
                            }
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        text: 'Acknowledge',
                        hideable: false,
                        width: 150,
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
                            var faxQueue = this.getView().up().up().down('#CDAGFAXQueueList').getValue();

                            if (rec.data.AcknowledgedDate != '' && rec.data.AcknowledgedDate != undefined){
                                widget.down('#btnAcknowledge').setDisabled(true);
                                widget.down('#btnAcknowledge').setTooltip('Acknowledged');
                            }
                            else {
                                widget.down('#btnAcknowledge').setDisabled(false);
                                widget.down('#btnAcknowledge').setTooltip('');
                            }
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        hideable: false,
                        width: 150,
                        widget: {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'fa fa-forward',
                                    text: 'Forward',
                                    itemId: 'btnForward',
                                    handler: 'onForward'
                                }
                            ]
                        },
                        onWidgetAttach: function(col, widget, rec) {
                            var faxQueue = this.getView().up().up().down('#CDAGFAXQueueList').getValue();

                            widget.down('#btnForward').setDisabled(false);
                            widget.down('#btnForward').setTooltip('');

                            if (rec.data.AcknowledgedDate != '' && rec.data.AcknowledgedDate != undefined){
                                widget.down('#btnForward').setDisabled(true);
                                widget.down('#btnForward').setTooltip('Acknowledged');
                            }
                            else if (faxQueue == '7') {
                                widget.down('#btnForward').setText('Forward');
                            }
                        }
                    }
                ]
            }
        }
    ]

});

