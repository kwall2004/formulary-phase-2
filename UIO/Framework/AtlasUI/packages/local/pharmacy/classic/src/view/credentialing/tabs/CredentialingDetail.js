/**
 * This Class represents the Credentialing Detail Tab of the Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.CredentialingDetail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pharmacy-credentialingdetail',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            title: 'General Information',
            reference: 'credGeneralInfoFormRef',
            flex: 1,
            layout: 'fit',
            bodyPadding: '20 0 0 20',
            items: [
                {
                    xtype: 'fieldset',
                    //title : 'Detail',
                    //collapsible : true,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'top'
                    },
                    defaults: {
                        width: 400,
                        labelWidth: 170,
                        padding: 5
                    },
                    scrollable: true,
                    items: [
                        {
                            xtype: 'hidden',
                            name: 'RelationshipID'
                        },
                        {
                            xtype: 'hidden',
                            name: 'systemID'
                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Log ID',
                            itemId: 'txtLogID',
                            name: 'CredLogID',
                            disabled: true
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Cred Type',
                            itemId: 'cbxCredType',
                            allowBlank: false,
                            name: 'CredType',
                            bind: {
                                store: '{credtypelist}'
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Application Type',
                            itemId: 'cbxApplicationType',
                            allowBlank: false,
                            name: 'ApplicationSource',
                            bind: {
                                store: '{applicationtypelist}'
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Cred Start Date',
                            itemId: 'dtCreateDate',
                            allowBlank: false,
                            format: 'm/d/Y',
                            name: 'CredCreateDate'
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Cred Completed Date',
                            itemId: 'dtCompleteDate',
                            format: 'm/d/Y',
                            fieldLabel: 'Cred Completed Date',
                            name: 'CredCompleteDate',
                            enableKeyEvents: true,
                            listeners: {
                                'blur': {
                                    fn: 'setReCredDate'
                                }
                            }
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Cred Result',
                            itemId: 'cbxCredResult',
                            name: 'CredResult',
                            bind: {
                                store: '{credresultlist}'
                            },
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            forceSelection: true,
                            listeners: {
                                'select': {
                                    fn: 'setReCredDate'
                                }
                            }
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Expected Re-Cred Date',
                            itemId: 'dtExpectedReCredDate',
                            format: 'm/d/Y',
                            name: 'expectedReCredDate',
                            enableKeyEvents: true,
                            listeners: {
                                'blur': {
                                    fn: 'setReCredFileRcvDate'
                                }
                            }
                        }, {
                            xtype: 'datefield',
                            fieldLabel: 'Re-Cred File Received Date',
                            itemId: 'dtReCredFileReceivedDate',
                            format: 'm/d/Y',
                            name: 'ReCredFileReceivedDate'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Created By',
                            itemId: 'txtCreateBy',
                            name: 'CreatedBy',
                            disabled: true
                        }, {
                            xtype: 'textarea',
                            fieldLabel: 'Comments',
                            itemId: 'txtComments',
                            height: '600',
                            name: 'Comments'
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Credentialing Letters',
                            itemId: 'btnCredLetters',
                            bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                            handler: 'showCredDetailCredLettersWin'
                        },
                        '->',
                        {
                            text: 'Save',
                            itemId: 'btSaveCredentialInfo',
                            bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                            handler: 'doSaveCredDetailTab'
                        },
                        {
                            text: 'Cancel',
                            itemId: 'btCancelContractInfo',
                            bind: {disabled: '{!(hasNCPDPID || hasRID)}'},
                            handler: 'doCancelCredDetailTab'
                        },
                        {
                            text: 'Print Verification Sheet',
                            handler: 'doCredDetailPrintVerification'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            title: 'Credentialing To Do List',
            flex: 1,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    reference: 'pharmaCredTodoGridRef',
                    margin: 20,
                    bind: {
                        store: '{credentailtodo}'
                    },
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 2,
                            autoCancel: false
                        }
                    ],
                    listeners: {
                        beforeedit: 'gdToDolist_beforeedit'
                    },
                    columns: [
                        /*{
                            text: ' ',
                            flex: 1,
                            renderer: 'columnToDorender',
                            dataIndex: 'systemId'
                        },*/
                        {
                            text: 'To Do', flex: 1, dataIndex: 'taskDesc'
                            , renderer: 'columnToDorender'
                        },
                        {
                            text: 'Completed Date', flex: 1, dataIndex: 'completeDate',// xtype: 'datecolumn',format: Ext.Date.format('m/d/Y'), filter: {type: 'date'},
                            renderer: 'columnToDorender',
                            editor: {
                                xtype: 'datefield',
                                itemId: 'dtCompletedDate',
                                //format: 'n/j/Y',
                                name: 'dtCompletedDate',
                                enableKeyEvents: true,
                                listeners: {
                                    change: 'BlurDtCompletedDate'
                                }

                            }
                        },
                        {
                            text: 'Completed By',
                            flex: 1,
                            renderer: 'columnToDorender',
                            dataIndex: 'userName'
                        }
                    ]
                    // ,viewConfig: {
                    //     listeners: {
                    //         refresh: function(view) {
                    //
                    //             // get all grid view nodes
                    //             var nodes = view.getNodes();
                    //
                    //             for (var i = 0; i < nodes.length; i++) {
                    //
                    //                 var node = nodes[i];
                    //
                    //                 // get node record
                    //                 var record = view.getRecord(node);
                    //
                    //                 // get color from record data
                    //                 var color ='red'; //record.get('color');
                    //
                    //                 // get all td elements
                    //                 var cells = Ext.get(node).query('td');
                    //                 debugger;
                    //
                    //                 // set bacground color to all row td elements
                    //                 for(var j = 0; j < cells.length; j++) {
                    //                     console.log(cells[j]);
                    //                     Ext.fly(cells[j]).setStyle('background-color', color);
                    //                 }
                    //             }
                    //         }
                    //     }
                    // }
                }
            ]
        }
    ]
});