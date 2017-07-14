/**
 * Created by j2487 on 9/30/2016.
 * Developer: Jagman Bhullar
 */
Ext.define('Atlas.member.view.MemberCOBC', {
    extend: 'Ext.panel.Panel',
    title: 'COBC',
    controller: 'membercobc',
    viewModel: {
        data: {
            hasNoResponseRequired: true
        },
        stores: {
            prescribersstore: {
                model: 'Atlas.common.model.Prescriber'
            },
            membercoveragehistorystore: {
                model: 'Atlas.member.model.MemberCoverage'
            },
            cobcstatusstore: {
                type: 'clonestore',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'COBCStatus'
                    },
                    url: 'shared/{0}/listitems'
                },
                sorters: [
                    {
                        property: 'value',
                        direction: 'ASC'
                    }
                ]
            },
            cobcmemberinfostore: {
                model: 'Atlas.member.model.COBCMemberModel'
            },
            cobcmemberinfostore1: {
                model: 'Atlas.member.model.COBCMemberModel',
                remoteSort: true,
                sorters: [{
                    property: 'LetterSentDate',
                    direction: 'ASC'
                }]
            },

            cobcletterdetailstore: {
                model: 'Atlas.member.model.MemberCOBCLetterDetail'
            },
            cobchistorystore: {
                model: 'Atlas.member.model.MemberCOBCoverHist',
                sorters: [
                    {
                        property: 'pbmCreateDate',
                        direction: 'DESC'
                    }]
            },
            cobcexpandstore: {
                model: 'Atlas.member.model.MemberCOBCoverHist',
                autoLoad: false
            },
            logicalstore: {
                type: 'clonestore',
                model: 'Atlas.common.model.shared.ListModel',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'YesNo'
                    },
                    url: 'shared/{0}/listitems'
                }
            },
            memberdetailstore: {
                model: 'Atlas.member.model.MemberDetails'

            },
            notestore: {
                model: 'Atlas.common.model.Notes'
            }
        }
    },
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'numberfield',
                    itemId: 'txtMemID',
                    fieldLabel: 'Member',
                    emptyText: '[MeridianRx ID]',
                    minValue: 0,
                    allowExponential: false,
                    hideTrigger: true,
                    enableKeyEvents: true,
                    listeners: {
                        'keypress': {
                            fn: 'MemberSearch'
                        }
                    }
                },
                '-',
                {
                    xtype: 'button',
                    text: 'Advanced Search',
                    iconCls: 'fa fa-search',
                    handler: 'createAdvSearchWindow'
                }, '-',
                , {xtype: 'displayfield', itemId: 'lblStatus'}
                /* {xtype: 'displayfield', itemId: 'lblKey'}
                 */
            ]
        },
        {
            dock: 'left',
            xtype: 'panel',
            width: 350,
            split: true,
            collapsible: true,
            collapseDirection: 'left',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    width: '100%',
                    iconCls: 'fa fa-user',
                    title: 'Member',
                    layout: 'vbox',
                    defaultType: 'displayfield',
                    items: [
                        {
                            fieldLabel: 'Status',
                            bind: {
                                value: '{masterrecord.enrollmentStatus}'
                            },
                            itemId: 'status'
                        },
                        {
                            fieldLabel: 'ID',
                            bind: '{masterrecord.recipientID}'
                        },
                        {
                            fieldLabel: 'Name',
                            bind: '{masterrecord.MemberName}',
                            flex:1
                        },
                        {
                            fieldLabel: 'LOB',
                            itemId: 'lob'
                        },
                        {
                            fieldLabel: 'Phone',
                            bind: '{masterrecord.homePhone}'
                        },
                        {
                            fieldLabel: 'DOB',
                            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                            bind: '{masterrecord.birthDate}'
                        },
                        {
                            fieldLabel: 'Gender',
                            bind: '{masterrecord.gender}'
                        }
                    ]

                },
                {
                    xtype: 'fieldset',
                    collapsible: true,
                    width: '100%',
                    iconCls: 'fa fa-user',
                    title: 'PCP',
                    layout: 'vbox',
                    defaultType: 'displayfield',
                    items: [
                        {
                            fieldLabel: 'NPI',
                            itemId: 'npi'
                        },
                        {
                            fieldLabel: 'Name',
                            itemId: 'pcpname'
                        },
                        {
                            fieldLabel: 'Phone',
                            itemId: 'pcpphone'
                        },
                        {
                            fieldLabel: 'Fax',
                            itemId: 'pcpfax'
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
                            iconCls: 'fa fa-user',
                            tooltip: 'View Member',
                            handler: 'onMemberClick'
                        },
                        {
                            iconCls: 'fa fa-tag',
                            tooltip: 'View PCP',
                            handler: 'onPCPClick'
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            layout: 'hbox',
            xtype: 'container',
            width: '100%',
            items: [
                {
                    xtype: 'container',
                    flex: 4,
                    layout: 'vbox',
                    height: '100%',
                    items: [
                        {
                            xtype: 'grid',
                            width: '100%',
                            height: '50%',
                            title: 'COBC Letter Details',
                            scrollable: true,
                            bind: {store: '{cobcletterdetailstore}'},
                            selModel: {
                                selType: 'rowmodel', // rowmodel is the default selection model
                                mode: 'SINGLE'
                            },
                            viewConfig: {
                                listeners: {
                                    expandbody: 'expand'
                                }
                            },
                            listeners: {
                                /*  rowclick: 'onRowClick',*/
                                rowdblclick: 'onRowDblClick'
                            }, itemId: 'outerGrid',
                            columns: [
                                {
                                    text: 'Letter Type',
                                    dataIndex: 'LetterTypeDesc',
                                    flex: 1
                                },
                                {
                                    text: 'Status',
                                    dataIndex: 'COBCStatusDesc',
                                    flex: 1
                                },
                                {
                                    text: 'Letter Create Date',
                                    dataIndex: 'LetterGeneratedDate',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")'
                                },
                                {
                                    text: 'Letter Sent Date',
                                    dataIndex: 'LetterSentDate',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")'
                                },
                                {
                                    text: 'Elapsed Days (Letter)',
                                    dataIndex: 'LetterSentElapsedDays',
                                    flex: 1
                                },
                                {
                                    text: 'ECRS Sent Date',
                                    dataIndex: 'ecrssentdate',
                                    flex: 1,
                                    formatter: 'date("m/d/Y")'
                                },
                                {
                                    text: 'Elapsed Days (ECRS)',
                                    dataIndex: 'ECRSSentElapsedDays',
                                    flex: 1
                                },
                                {
                                    text: 'COBC Record Id',
                                    dataIndex: 'cobcrecordid',
                                    hidden: true,
                                    flex: 1
                                },
                                {
                                    text: 'View',
                                    hideable: false,
                                    xtype: 'actioncolumn',
                                    flex: 1,
                                    dataIndex: 'DocID',
                                    items: [{
                                        iconCls: 'x-fa fa-paperclip',
                                        tooltip: 'View Attachment',
                                        handler: 'onViewClick'
                                    }],
                                    renderer: function (value, meta, record) {
                                        this.items[0].disabled = record.get('DocID') == '0';
                                    }
                                }

                            ],
                            plugins: [
                                {
                                    ptype: 'rowwidget',
                                    selectRowOnExpand: true,
                                    expandOnlyOne: true,
                                    widget: {
                                        xtype: 'grid',
                                        title: 'Coverage Details',
                                        bind: {store: '{cobcexpandstore}'},
                                        itemId: 'innerGrid',
                                        columns: [
                                            {
                                                text: 'COBC Record Id',
                                                hidden: true,
                                                dataIndex: 'cobcrecordid',
                                                flex: 1
                                            },
                                            {
                                                text: 'Coverage Type',
                                                dataIndex: 'RecType',
                                                flex: 1,
                                                renderer:'cmbCoverage_Type_Render'
                                            },
                                            {
                                                text: 'HICN',
                                                dataIndex: 'HICNRRB',
                                                flex: 1
                                            },
                                            {
                                                text: 'Loaded Date',
                                                dataIndex: 'pbmCreateDate',
                                                flex: 1,
                                                formatter: 'date("m/d/Y")'
                                            },
                                            {
                                                text: 'Insurance Company',
                                                dataIndex: 'InsurerName',
                                                flex: 1
                                            },
                                            {
                                                text: 'Address',
                                                dataIndex: 'InsurerFullAddress',
                                                flex: 1
                                            },
                                            {
                                                text: 'Policy #',
                                                dataIndex: 'Policy',
                                                flex: 1
                                            },
                                            {
                                                text: 'Rx Id',
                                                dataIndex: 'RxBin',
                                                hidden: true,
                                                flex: 1
                                            },
                                            {
                                                text: 'Rx Group',
                                                dataIndex: 'RxBin',
                                                hidden: true,
                                                flex: 1
                                            },
                                            {
                                                text: 'Rx Bin',
                                                dataIndex: 'RxBin',
                                                flex: 1
                                            },
                                            {
                                                text: 'Eff. Date',
                                                dataIndex: 'EffDate',
                                                flex: 1,
                                                formatter: 'date("m/d/Y")'
                                            },
                                            {
                                                text: 'Term. Date',
                                                dataIndex: 'TermDate',
                                                flex: 1,
                                                formatter: 'date("m/d/Y")'
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                hideable: false,
                                                text: 'Block/Unblock',
                                                flex: 1,
                                                items: [{
                                                    tooltip: 'Block/Override Primary Insurance',
                                                    iconCls: 'x-fa fa-times-circle-o',
                                                    handler: 'onBlockClick'
                                                }]
                                            },
                                            {
                                                text: 'Status',
                                                dataIndex: 'COBCStatusDesc',
                                                hidden: true,
                                                flex: 1
                                            }
                                        ],
                                        listeners: {
                                            rowdblclick: 'onExpandedRowDblClick'

                                        }

                                    }
                                }

                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true
                                }
                            ]
                        },
                        {
                            xtype: 'grid',
                            width: '100%',
                            title: 'COBC History',
                            reference: 'COBCHistoryGrid',
                            scrollable: true,
                            height: '50%',
                            bind: {store: '{cobchistorystore}'},
                            columns: [
                                {
                                    text: 'MSP Reason',
                                    dataIndex: 'MSP',
                                    flex: 1
                                },
                                {
                                    text: 'Coverage Code',
                                    dataIndex: 'Coverage',
                                    flex: 1
                                },
                                {
                                    text: 'Coverage Type',
                                    dataIndex: 'RecType',
                                    flex: 1,
                                    renderer: 'cmbCoverage_Type_Render'
                                },
                                {
                                    text: 'HICN',
                                    dataIndex: 'HICNRRB',
                                    flex: 1
                                },
                                {
                                    text: 'Loaded Date',
                                    dataIndex: 'pbmCreateDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'Insurance Company',
                                    dataIndex: 'InsurerName',
                                    flex: 1
                                },
                                {
                                    text: 'Address',
                                    dataIndex: 'InsurerFullAddress',
                                    flex: 1
                                },
                                {
                                    text: 'Policy #',
                                    dataIndex: 'Policy',
                                    flex: 1
                                },
                                {
                                    text: 'Rx ID',
                                    hidden: true,
                                    dataIndex: 'RxId',
                                    flex: 1
                                },
                                {
                                    text: 'Rx Group',
                                    hidden: true,
                                    dataIndex: 'RxGrp',
                                    flex: 1
                                },
                                {
                                    text: 'Rx Bin',
                                    dataIndex: 'RxBin'
                                },
                                {
                                    text: 'Eff. Date',
                                    dataIndex: 'EffDate',
                                    xtype: 'datecolumn',
                                    format: 'm/d/Y',
                                    flex: 1
                                },
                                {
                                    text: 'Term. Date',
                                    dataIndex: 'TermDate',
                                    formatter: 'date("m/d/Y")',
                                    flex: 1
                                },
                                {
                                    text: 'Status',
                                    dataIndex: 'COBCStatusDesc',
                                    flex: 1
                                },
                                {
                                    text: 'COBC Record Id',
                                    dataIndex: 'cobcrecordid',
                                    hidden: true,
                                    flex: 1
                                }
                            ],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    dock: 'bottom',
                                    displayInfo: true,
                                    bind: {store: '{cobchistorystore}'},
                                    pageSize: 5
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'window',
                    reference: 'AdvSearchCOBC',
                    title: 'Advanced Search',
                    iconCls: 'x-fa fa-search',
                    width: 1200,
                    height: 550,
                    layout: 'border',
                    itemId: 'winSearch',
                    modal: true,
                    closeAction: 'hide',
                    items: [
                        {
                            region: 'north',
                            xtype: 'form',
                            layout: 'column',
                            defaultButton: 'search',
                            defaults: {
                                xtype: 'container',
                                layout: 'anchor',
                                margin: 5,
                                defaultType: 'textfield',
                                defaults: {
                                    anchor: '70%'
                                }
                            },

                            items: [
                                {
                                    xtype: 'membertypeahead',
                                    columnWidth: 0.45,
                                    fieldLabel: 'Member',
                                    itemId: 'cbxMember',
                                    labelWidth: 70
                                },
                                {

                                    xtype: 'combobox',
                                    columnWidth: 0.45,
                                    fieldLabel: 'COBC Status',
                                    bind: {
                                        store: '{cobcstatusstore}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value',
                                    itemId: 'cbxCOBCStatus',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'button',
                                    columnWidth: 0.1,
                                    anchor: '50%',
                                    text: 'Search',
                                    iconCls: 'x-fa fa-search',
                                    reference: 'search',
                                    handler: 'AdvancedSearch'
                                }
                            ]
                        },
                        {
                            region: 'center',
                            xtype: 'grid',
                            bind: {store: '{cobcmemberinfostore1}'},
                            listeners: {
                                rowdblclick: 'loadCOBCDetails'
                            },
                            columns: [
                                {
                                    text: 'MeridianRx ID',
                                    flex: 1,
                                    dataIndex: 'RecipientId'
                                },
                                {
                                    text: 'Member Name',
                                    flex: 1,
                                    dataIndex: 'MemberName'
                                },
                                {
                                    text: 'Member Status',
                                    flex: 1,
                                    dataIndex: 'memberStatus'
                                },
                                {
                                    text: 'Letter Type',
                                    flex: 1,
                                    dataIndex: 'LetterTypeDescr'
                                },
                                {
                                    text: 'COBC Status',
                                    flex: 1,
                                    dataIndex: 'CobStatusDesc'
                                },
                                {
                                    text: 'Letter Sent Date',
                                    flex: 1,
                                    dataIndex: 'LetterSentDate',
                                    formatter: 'date("m/d/Y")'
                                },
                                {
                                    text: 'Elapsed Days (Letter)',
                                    flex: 1, dataIndex: 'LetterSentElapsedDays'
                                },
                                {
                                    text: 'ECRS Sent Date',
                                    flex: 1,
                                    dataIndex: 'ECRSSentDate',
                                    formatter: 'date("m/d/Y")'
                                },
                                {
                                    text: 'Elapsed Days (ECRS)',
                                    flex: 1,
                                    dataIndex: 'ECRSSentElapsedDays'
                                },
                                {
                                    text: 'System ID',
                                    dataIndex: 'systemId',
                                    hidden: true
                                },
                                {
                                    text: 'SSN',
                                    dataIndex: 'SSN',
                                    hidden: true
                                },
                                {
                                    text: 'Member DOB',
                                    dataIndex: 'MemberDOB',
                                    hidden: true
                                },
                                {
                                    text: 'Gender',
                                    dataIndex: 'MemberGender',
                                    hidden: true
                                },
                                {
                                    text: 'HICN/RRB',
                                    dataIndex: 'HICNRRB',
                                    hidden: true
                                }

                            ],
                            bbar: {
                                xtype: 'pagingtoolbar',
                                itemId: 'ptbar',
                                bind: {store: '{cobcmemberinfostore1}'},
                                displayInfo: true,
                                hideRefresh: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'window',
                    reference: 'UpdateLetterStatus',
                    title: 'Update COBC Letter Status:',
                    iconCls: 'x-fa fa-sticky-note-o',
                    modal: true,
                    closeAction: 'hide',
                    closable: true,
                    scrollable: true,
                    resizable: false,
                    width: 500,
                    height: 420,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    bodyPadding: 10,
                    defaults: {
                        frame: true,
                        bodyPadding: 10
                    },
                    items: [
                        {
                            flex: 1,
                            margin: '0 0 10 0',
                            xtype: 'form',
                            name: 'updateLetterStatusForm',
                            frame: true,
                            bodyPadding: 10,
                            scrollable: true,
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 150,
                                msgTarget: 'side'
                            },
                            defaultType: 'displayfield',
                            defaults: {
                                anchor: '90%'
                            },
                            items: [
                                {
                                    fieldLabel: 'Letter Type',
                                    labelWidth: 160,
                                    name: 'letterType',
                                    bind: '{letterrecord.LetterTypeDesc}'
                                },
                                {
                                    fieldLabel: 'Letter Created Date',
                                    labelWidth: 160,
                                    name: 'letterCreatedDate',
                                    bind: '{letterrecord.LetterGeneratedDate:date("m/d/Y")}'
                                },
                                {
                                    fieldLabel: 'Letter Sent Date',
                                    labelWidth: 160,
                                    name: 'letterSentDate',
                                    bind: '{letterrecord.LetterSentDate:date("m/d/Y")}'
                                },
                                {
                                    fieldLabel: 'Elapsed days (Letter)',
                                    labelWidth: 160,
                                    name: 'elapsedDaysLetter',
                                    bind: '{letterrecord.LetterSentElapsedDays}'
                                },
                                {
                                    fieldLabel: 'ECRS Sent Date',
                                    labelWidth: 160,
                                    name: 'eCRSSentDate',
                                    bind: '{letterrecord.ecrssentdate:date("m/d/Y")}'

                                },
                                {
                                    fieldLabel: 'Elapsed days (ECRS)',
                                    labelWidth: 160,
                                    name: 'elapsedDaysECRS',
                                    bind: '{letterrecord.ECRSSentElapsedDays}'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'COBC Status',
                                    name: 'cobcStatus',
                                    bind: {
                                        store: '{cobcstatusstore}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value',
                                    listeners: {
                                        select: function (combo, record, eOpts) {
                                            var saveBtn = this.up().down('[name=saveCOBCLetterDetails]');

                                            // if 'COBC Letter Generated' Or  Created COBC Record
                                            if (record.data.value == 2 || record.data.value == 1) {
                                                Ext.Msg.alert('Message', 'This is a system driven status, which can not be selected.');
                                                combo.setValue(7); // default to No Response Required
                                                return;

                                            }
                                            // if ECRS Update Complete  OR  No Response Required
                                            if (record.data.value != 6 || record.data.value != 7) {
                                                saveBtn.disabled = false;
                                            }


                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        layout: 'anchor'
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Notes',
                                            flex: 1,
                                            name: 'updatenotes',
                                            allowBlank: false,
                                            itemId: 'updatenotes'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'x-fa fa-file-text',
                                            tooltip: 'Notes History',
                                            handler: 'onUpdateNotesHistoryClick'
                                        }]
                                }
                            ],
                            bbar: [
                                '->',
                                {
                                    text: 'Save',
                                    //disabled: true,
                                    itemId: 'saveStatus',
                                    //formBind: true,
                                    /* bind: {
                                     disabled: '{hasNoResponseRequired}'
                                     },*/
                                    name: 'saveCOBCLetterDetails',
                                    handler: 'SaveCOBCLetterDetails'
                                },
                                {
                                    text: 'Close',
                                    handler: function (btn) {
                                        btn.up('window').close();
                                    }
                                }]
                        }
                    ]

                },
                {
                    xtype: 'window',
                    reference: 'BlockOverrideWindow',
                    title: 'Block/Override Primary Insurance',
                    iconCls: 'x-fa fa-sticky-note-o',
                    modal: true,
                    closeAction: 'hide',
                    closable: true,
                    scrollable: true,
                    resizable: false,
                    width: 500,
                    height: 420,
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    bodyPadding: 10,
                    defaults: {
                        frame: true,
                        bodyPadding: 10
                    },
                    items: [
                        {
                            flex: 1,
                            margin: '0 0 10 0',
                            xtype: 'form',
                            name: 'blockOverrideForm',
                            frame: true,
                            bodyPadding: 10,
                            scrollable: true,
                            fieldDefaults: {
                                labelAlign: 'left',
                                labelWidth: 150,
                                msgTarget: 'side'
                            },
                            defaultType: 'displayfield',
                            defaults: {
                                anchor: '90%'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    name: 'blockPrimaryInsurance',
                                    fieldLabel: 'Block Primary Insurance',
                                    bind: {
                                        store: '{logicalstore}'
                                    },
                                    displayField: 'name',
                                    valueField: 'value',
                                    listeners: {
                                        select: function (combo, record, eOpts) {
                                            var dateField = this.up().down('[name=blockOverrideDate]');
                                            if (record.data.value == 'No') {
                                                dateField.setValue('');
                                                dateField.disabled = true;
                                            }
                                            else dateField.disabled = false;

                                        }
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'blockOverrideDate',
                                    format: 'm/d/Y',
                                    fieldLabel: 'Block Override Date',
                                    bind: '{memberDetailData.overridedthrough:date("m/d/Y")}'
                                },
                                {
                                    fieldLabel: 'Coverage Type',
                                    labelWidth: 160,
                                    name: 'coverageType',
                                    bind: '{coverageDetails.RecType}',
                                    renderer:'cmbCoverage_Type_Render'
                                },
                                {
                                    fieldLabel: 'Alt. Ins. ID',
                                    labelWidth: 160,
                                    name: 'altInsID',
                                    bind: '{coverageDetails.HICNRRB}'
                                },
                                {
                                    fieldLabel: 'Alt. Ins. Name',
                                    labelWidth: 160,
                                    name: 'altInsName',
                                    bind: '{coverageDetails.InsurerName}'
                                },
                                {
                                    fieldLabel: 'Alt. Ins. Eff. Date',
                                    labelWidth: 160,
                                    name: 'altInsEffDate',
                                    bind: '{coverageDetails.EffDate:date("m/d/Y")}'
                                },
                                {
                                    fieldLabel: 'Alt. Ins. Term Date',
                                    labelWidth: 160,
                                    name: 'altInsTermDate',
                                    format: 'n/j/Y',
                                    bind: '{coverageDetails.TermDate:date("m/d/Y")}'
                                },
                                {
                                    xtype: 'container',
                                    defaults: {
                                        layout: 'anchor'
                                    },
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            fieldLabel: 'Notes',
                                            name: 'notes',
                                            flex: 1,
                                            allowBlank: false,
                                            itemId: 'blocknotes'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'fa fa-file-text',
                                            tooltip: 'Notes History',
                                            handler: 'onBlockNotesHistoryClick'
                                        }
                                    ]
                                }
                            ],
                            bbar: [
                                '->',
                                {
                                    text: 'Save',
                                    disabled: true,
                                    formBind: true,
                                    handler: 'SaveBlock'

                                },
                                {
                                    text: 'Close',
                                    handler: function (btn) {
                                        btn.up('window').close();
                                    }
                                }]
                        }
                    ]

                },
                {
                    xtype: 'window',
                    modal: true,
                    closeAction: 'hide',
                    reference: 'winCOBCNotesHistory',
                    title: 'Notes History',
                    iconCls: 'x-fa fa-sticky-note-o',
                    layout: 'fit',
                    itemId: 'winNotes',
                    width: 480,
                    height: 400,
                    items: [
                        {
                            xtype: 'textarea',
                            editable: false,
                            itemId: 'txtNotes'
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Close',
                                    handler: 'winNotesClose'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
