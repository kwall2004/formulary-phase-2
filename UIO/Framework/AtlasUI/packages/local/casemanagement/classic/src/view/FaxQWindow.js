/**
 * Created by s6627 on 11/27/2016.
 */
/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.FaxQWindow', {
    extend: 'Ext.Window',
    xtype: 'casemanagementFaxQWindow',
    itemId: 'winFaxQWindow',
    title: 'Fax Queue',
    width: 940,
    height: 500,
    scrollable: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Filter Fax Q',
            collapsible: false,
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'combobox',
                        itemId: 'cbxFax',
                        displayField: 'text',
                        valueField: 'value',
                        store: {
                            data: [{"text": 'New Faxes', "value": '1', "selected": true},
                                {"text": 'Acknowledged Faxes', "value": '2'}]
                        },
                        listeners: {
                            select: 'cbxFax_Select'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Rcvd between',
                        itemId: 'faxReceivedDate',
                        format: 'm/d/Y'
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'dtTo',
                        format: 'm/d/Y',
                        disabled: true
                    },
                    {
                        xtype: 'button',
                        text: 'Search',
                        handler: 'OnSearchClick'
                    },
                    {
                        xtype: 'button',
                        text: 'Reset',
                        handler: 'onReset'
                    }
                ]
            }]
        },
        {
            region: 'center',
            xtype: 'grid',
            layout:'fit',
            height:380,
            autoScroll:true,
            itemId: 'FaxQGridPanel',
            bind: '{FaxQStore}',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    dragGroup: 'faxDDGroup',
                    dropGroup: 'faxDDGroup',
                    enableDrop: false
                }
            },
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {

                        text: 'ID(*Filter)',
                        dataIndex: 'DocumentID'
                    },
                    {
                        text: 'Date Rcvd.',
                        dataIndex: 'RecieptDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'

                    },
                    {
                        text: 'Time Rcvd.',
                        dataIndex: 'RecieptTime'

                    },
                    {
                        xtype: 'actioncolumn',
                        dataIndex: 'DocumentID',
                        text: 'View',
                        items: [{
                            // Use a URL in the icon config
                            iconCls: 'x-fa fa-paperclip',
                            // Use a URL in the icon config
                            tooltip: 'View',
                            handler: 'btnView_Click'

                        }]
                    },
                    {
                        xtype: 'actioncolumn',
                        dataIndex: 'DocumentID',
                        text: 'Acknowledge',
                        items: [{
                            // Use a URL in the icon config
                            iconCls: 'x-fa fa-plus-square',
                            // Use a URL in the icon config
                            tooltip: 'Click to flag this fax as acknowledged.',
                            handler: 'btnAcknowledge_Click',
                            isDisabled : function(view, rowIndex, colIndex, item, record) {
                                if (record.data.AcknowledgedDate) {
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            }

                        }]
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{FaxQStore}',
                displayInfo: true,
                hideRefresh: true
            }

        }
    ]
});