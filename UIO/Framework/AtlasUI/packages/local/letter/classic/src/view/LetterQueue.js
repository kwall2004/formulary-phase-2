/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.LetterQueue', {
    extend: 'Ext.panel.Panel',
    xtype: 'LetterQueue',
    title: 'Letter Queue',
    layout: 'accordion',
    controller: 'letterqueuectrl',
    viewModel: 'letterqueuevm',
    defaults: {
        collapsible: true,
        itemId: 'aimsBatchesGrid',
        title: 'AIMS Batches (N/A)',
        bind: {
            title: '{vmAIMSBatches}'
        }
    },
    items: [
        {
            xtype: 'letter.RequiredLettersGrid',
            itemId: 'requiredLettersGrid',
            bind: {
                title: '{vmRequiredLetters}'
            }
        },
        {
            xtype: 'letter.PendingLettersGrid',
            itemId: 'pendingLettersGrid',
            bind: {
                title: '{vmPendingLetters}'
            }
        },
        {
            //scrollable: 'y',
            items: [
                {
                    region: 'north',
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Batch Sent Date/Time',
                            format: 'm/d/Y',
                            bind: '{vmBatchDate}'
                        },
                        {
                            xtype: 'textfield',
                            bind: '{vmBatchTime}',
                            enableKeyEvents: true,
                            flex: 3,
                            regex: /^(0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]$/,
                            listeners: {
                                'keyup': {
                                    fn: 'timeChange'
                                }
                            },
                            emptyText: 'HH:MM:SS',
                            allowBlank: 'false',
                            maskRe: /[0-9]/,
                            maxLength: 8,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'ListDescription',
                            valueField: 'ListItem',
                            dataIndex: 'ListItem',
                            queryMode: 'local',
                            bind: '{vmBatchToD}',
                            store: {
                                fields: ['ListItem', 'ListDescription'],
                                data: [
                                    {"ListItem": "AM", "ListDescription": "AM"},
                                    {"ListItem": "PM", "ListDescription": "PM"}
                                ]
                            }
                        },
                        {
                            iconCls: 'x-fa fa-floppy-o',
                            text: 'Save',
                            handler: 'onClickSave'
                        }
                    ]
                },
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    scrollable: true,
                    items: [
                        {
                            flex:1,
                            xtype: 'letter.AIMSBatchesGrid',
                            title: 'AIMS Batch Jobs',
                            scrollable: true
                        },
                        {
                            xtype: 'grid',
                            flex:1,
                            bind: {
                                store: '{aimsjobsdocsdata}',
                                title: '{vmAIMSBatchesDetailTitle}'
                            },
                            columns: [
                                {text: 'Letter Name', dataIndex: 'LetterName', flex: 1},
                                {text: 'MERLIN ID', dataIndex: 'RecipientID', flex: 1},
                                {text: 'Member Name', dataIndex: 'MemberName', flex: 1},
                                {xtype: 'datecolumn',text: 'Create Date',dataIndex: 'CreateDate',flex: 1},
                                {text: 'Created By', dataIndex: 'CreatedBy', flex: 1},
                                {text: 'Carrier', dataIndex: 'Carrier', flex: 1},
                                {text: 'Account', dataIndex: 'Account', flex: 1},
                                {text: 'LOB', dataIndex: 'LOB', flex: 1},
                                {
                                    xtype: 'datecolumn',
                                    text: 'Approved Date',
                                    dataIndex: 'ApprovedDate',
                                    flex: 1

                                },
                                {text: 'Approved By', dataIndex: 'ApprovedBy', flex: 1},
                                {xtype: 'datecolumn',text: 'MERLIN Sent Date',dataIndex: 'MerlinSentDate',
                                    flex: 1,renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
                                },
                                {text: 'MERLIN Sent By', dataIndex: 'SentBy', flex: 1},
                                {
                                    xtype: 'datecolumn',
                                    text: 'AIMS Date',
                                    dataIndex: 'AIMSDate',
                                    flex: 1,renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')
                                },
                                {text: 'PO Drop Off Date', xtype: 'datecolumn', dataIndex: 'POBoxDate', flex: 1}
                            ]
                        }
                    ],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'pagingtoolbar',
                        bind: {
                            store: '{aimsjobsdocsdata}'
                        },
                        displayInfo: true
                    }]
                }
            ]
        },
        {
            xtype: 'letter.ApprovedLettersGrid',
            itemId: 'approvedLettersGrid',
            bind: {
                title: '{vmApprovedTitle}'
            }
        }
    ]
});
