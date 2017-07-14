Ext.define('Atlas.prescriber.view.detail.Fax', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.prescriber-fax',
    title: 'Fax & Attachments',
    controller: 'prescriber-fax',

    layout: 'fit',
    items: [
        {
            xtype: 'panel',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    title: 'Fax/Attachments',
                    itemId: 'FaxHistoryGridPanel',
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            containerScroll: true,
                            dragGroup: 'faxDDGroup',
                            dropGroup: 'faxDDGroup',
                            enableDrag: false
                        },
                        listeners: {
                            // drop: function(node, data, dropRec, dropPosition) {
                            //     var vc =  Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').up('panel').up('panel').controller,
                            //         vm =  Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').up('panel').up('panel').viewModel;
                            //     vc.attachFax(vm.data.selCredType, vm.data.selCredValue, data.records[0].data.DocumentID, 'Credentialing Fax');
                            // }
                        }
                    },
                    bind: {
                        store: '{faxandattachments}'
                    },
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            containerScroll: true,
                            dragGroup: 'faxDDGroup',
                            dropGroup: 'faxDDGroup',
                            enableDrag: false
                        },
                        listeners: {
                            drop: 'dropprescriberfax'
                        }
                    },
                    columns: {
                        // defaults: {
                        //     width: 150,
                        //     filter: {type: 'string'}
                        // },
                        items: [
                            {
                                xtype: 'actioncolumn',
                                hideable : false,
                                width: 50,
                                items: [{
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-paperclip',  // Use a URL in the icon config
                                    tooltip: 'View Attachment',
                                    handler: function (grid) {
                                        Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('DocumentID'));
                                    }
                                }]
                            },
                            {text: 'Document ID', dataIndex: 'DocumentID',flex: 1,hidden:true},
                            {text: 'Description', dataIndex: 'DESCRIPTION',flex: 3},
                            {text: 'Document Type', dataIndex: 'inOut',flex: 2},
                            {
                                text: 'Fax/Attachment Date',
                                dataIndex: 'faxDate',
                                xtype: 'datecolumn',
                                flex: 1,
                                format: 'm/d/Y H:i:s',
                                filter: {type: 'date'}
                            },
                            {text: 'Fax Number', dataIndex: 'FaxNumber', hidden: true},
                            {text: 'Send By', dataIndex: 'SubmittedBy', hidden: true},
                            {
                                text: 'Delete',
                                hideable : false,
                                xtype: 'actioncolumn',
                                flex: 1,
                                items: [{
                                    iconCls: 'x-fa fa-trash-o',
                                    tooltip: 'Delete Attachment',
                                    handler: function (grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        if (rec.data.inOut == 'Letter') {
                                            Ext.Msg.alert('PBM Message', 'Cannot remove the letter which already sent.');
                                        }
                                        else {
                                            Ext.Msg.show({
                                                title : 'Delete Attachment',
                                                msg: 'Are you sure you would like to remove this attachment?',
                                                buttons: Ext.Msg.YESNO,
                                                icon: Ext.Msg.QUESTION,
                                                fn: function (btn, text) {
                                                    if (btn == 'yes') {
                                                        var gridPanel = grid.up('panel'),
                                                            vc = Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').controller;
                                                        vc.deleteAttachment(rec.data.DocumentID);
                                                    }
                                                }
                                            })

                                        }
                                    }
                                }]
                            }
                        ]
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            displayInfo: 'false',
            items: [
                '->',
                {
                    xtype: 'button',
                    text: 'Fax Queue',
                    itemId: 'btnfaxQueue',
                    iconCls: 'fa fa-sticky-note-o',
                    handler: 'doFaxQueue'
                },
                {
                    xtype: 'button',
                    text: 'Add Attachment',
                    itemId: 'btnAddAttachment',
                    iconCls: 'x-fa fa-file',
                    handler: 'showPresAddAttachmentPopUp'
                }
            ]
        }
    ]
});