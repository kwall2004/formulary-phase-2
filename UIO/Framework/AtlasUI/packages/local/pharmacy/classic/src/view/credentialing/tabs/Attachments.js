/**
 * This Class represents the Attachments Tab of the Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.Attachments', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-attachments',
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
                            drop: function(node, data, dropRec, dropPosition) {
                                var vc =  Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').up('panel').up('panel').controller,
                                    vm =  Ext.ComponentQuery.query('#FaxHistoryGridPanel')[0].up('panel').up('panel').up('panel').up('panel').viewModel;
                                vc.attachFax(vm.data.selCredType, vm.data.selCredValue, data.records[0].data.DocumentID, 'Credentialing Fax');
                            }
                        }
                    },
                    bind: {
                        store: '{credfaxattachment}'
                    },
                    columns: [
                        {
                            text: 'View',
                            //dataIndex: 'name',
                            xtype: 'actioncolumn',
                            width: 60,
                            items: [{
                                iconCls: 'x-fa fa-paperclip',
                                tooltip: 'View Attachment',
                                handler: function (grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    var gridPanel = grid.up('panel'),
                                        vc = gridPanel.up('panel').up('panel').up('panel').up('panel').controller,
                                        vm = gridPanel.up('panel').up('panel').up('panel').up('panel').viewModel;
                                    vc.getDocumentDetails(rec.data.DocumentID);
                                }
                                //handler: function(grid, rowIndex) {
                                //    var gridPanel = grid.up('panel'),
                                //        accordionPanel = gridPanel.up('panel'),
                                //        topPanel = accordionPanel.up('panel'),
                                //        vc = topPanel.controller,
                                //        vm = topPanel.viewModel;
                                //    vc.onAcknowledgeClick(grid, rowIndex, vm.data.addOnsReceivedPnl);
                                //}
                            }]
                        },
                        {text: 'Doc ID', dataIndex: 'DocumentID',flex: 1},
                        {text: 'Description', dataIndex: 'DESCRIPTION', flex: 3},
                        {text: 'Document Type', dataIndex: 'inOut', flex: 2},
                        {
                            text: 'Fax/Attachment Date',
                            xtype: 'datecolumn',
                            flex: 1,
                            dataIndex: 'faxDate',
                            format: 'm/d/Y H:i:s',
                            filter: {type: 'date'}
                        },
                        {text: 'Fax Number', dataIndex: 'FaxNumber', hidden: true},
                        {text: 'Send By', dataIndex: 'SubmittedBy', hidden: true},
                        {
                            text: 'Delete',
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
                                                    //var credID=parent.Ext.getCmp('hiddenInitialCredID').getValue();
                                                    //Ext.net.DirectMethods.DeleteAttachment('CredLogID',credID,record.data.DocumentID);
                                                    var gridPanel = grid.up('panel'),
                                                        vc = gridPanel.up('panel').up('panel').up('panel').up('panel').controller,
                                                        vm = gridPanel.up('panel').up('panel').up('panel').up('panel').viewModel;
                                                    vc.deleteAttachment(vm.data.selCredType, vm.data.selCredValue, rec.data.DocumentID);
                                                }
                                            }
                                        })

                                    }
                                }
                            }]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Missing Info fax Queue',
                    handler: 'doMissingInfoFaxQueue'
                },
                {
                    text: 'Fax Queue',
                    handler: 'doFaxQueue'
                },
                {
                    text: 'Add Attachment',
                    bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                    handler: 'showCredAddAttachmentPopUp'
                }
            ]
        }
    ]
});