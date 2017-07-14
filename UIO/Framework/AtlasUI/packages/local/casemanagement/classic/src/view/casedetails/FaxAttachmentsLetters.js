/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.FaxAttachmentsLetters', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementFaxAttachmentsLetters',
    title: 'Fax/Attachments/Letters',
    viewModel: 'FaxAttachmentsViewModel',
    controller: 'FaxAttachmentsController',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            layout: 'fit',
            flex: 1,
            items: [
                {
                    title: 'Fax/Attachments',
                    xtype: 'grid',
                    itemId: 'FaxAttachmentsgrid',
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            containerScroll: true,
                            dragGroup: 'faxDDGroup',
                            dropGroup: 'faxDDGroup',
                            enableDrag: false
                        },
                        listeners: {
                            drop: 'dropcasedetailfax'
                        }
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },

                        items: [{
                            xtype: 'actioncolumn',
                            dataIndex: 'DocumentID',
                            text: 'View',
                            hideable:false,
                            items: [{
                                // Use a URL in the icon config
                                iconCls: 'x-fa fa-paperclip',
                                // Use a URL in the icon config
                                tooltip: 'View',
                                handler: 'btnView_Click'

                            }]
                        }, {
                            text: 'Description',
                            dataIndex: 'DESCRIPTION'
                        }, {
                            text: 'Document Type',
                            dataIndex: 'inOut'
                        }, {
                            text: 'Fax/Attachment Date',
                            dataIndex: 'faxDate',
                            xtype: 'datecolumn',
                            format: 'm/d/Y H:m:s'
                        },
                            {
                                xtype: 'actioncolumn',
                                dataIndex: 'DocumentID',
                                text: 'Delete',
                                hideable:false,
                                items: [{
                                    // Use a URL in the icon config
                                    iconCls: 'x-fa fa-trash-o',
                                    // Use a URL in the icon config
                                    tooltip: 'Delete',
                                    handler: 'btnDelete_Click'

                                }]
                            }]
                    },
                    bind: '{FaxHistoryStore}',
                    bbar:[ {
                        xtype: 'pagingtoolbar',
                        bind: '{FaxHistoryStore}',
                        displayInfo: true,
                        emptyMsg: "No data to display"
                    },
                    '->', {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus-square',
                    handler:'createLetter',
                    text: 'Create Letter'
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-floppy-o',
                    handler:'FaxQueue_Click',
                    text: 'Fax Queue'
                }, {
                    xtype: 'button',
                    iconCls: 'x-fa fa-file',
                    handler:'AddAttachment_Click',
                    text: 'Add Attachment'
                }]
                },
                {
                    xtype: 'hidden', itemId: 'hdnKeyType'
                },
                {
                    xtype: 'hidden', itemId: 'hdnKeyValue'
                }
            ]
        }]
});