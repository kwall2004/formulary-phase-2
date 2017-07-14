Ext.define('Atlas.member.view.MemLocksPrescriber', {
    extend: 'Ext.form.Panel',
    xtype: 'member-memlocksprescriber',
    controller: 'memlocksprescribercontroller',
    masterRecord: null,
    viewModel: 'memlocks',
    width: 1200,
    height: 620,

    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },

    bodyPadding: 10,

    defaults: {
        frame: true,
        bodyPadding: 10
    },
    items:[

        {
            flex: 1,
            margin: '0 10 0 0',
            xtype: 'form',
            itemId:'formPrescriber',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            bodyPadding: 10,
            defaults: {
                frame: true,
                bodyPadding: 10,
                labelWidth:140,
                xtype:'textfield'
            },
            items:[
                {
                    fieldLabel:'Recipient Id',
                    bind: {
                        value:'{masterRecord.recipientID}',
                        disabled: true
                    }

                },
                {
                    fieldLabel:'Member Name',
                    bind: {
                        value:'{masterRecord.MemberName}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'Address 1',
                    bind: {
                        value:'{masterRecord.Home_Address1}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'Address 2',
                    bind: {
                        value:'{masterRecord.Home_Address2}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'City',
                    bind: {
                        value:'{masterRecord.Home_City}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'State',
                    bind: {
                        value:'{masterRecord.Home_State}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'Zip',
                    bind: {
                        value:'{masterRecord.home_zipCode}',
                        disabled: true
                    }
                },
                {
                    xtype:'combobox',
                    fieldLabel:'Plan Group',
                    itemId:'cbxplangroupId',
                    name:'plangroupId',
                    bind:
                    {
                        store: '{planGroupsStore}'
                    },
                    displayField: 'planGroupName',
                    valueField: 'planGroupId',
                    allowBlank:false,
                    queryMode: 'local',
                    forceSelection : true
                },
                {
                    fieldLabel:'Plan Contact',
                    name:'planContactName'
                },
                {
                    fieldLabel:'Plan Contact Title',
                    name:'planContactJobDesc'
                },
                {
                    fieldLabel:'Plan Contact Extn',
                    name:'planContactExtn',
                    allowBlank: false,
                    maskRe: /[0-9]/,
                    maxLength:5,
                    enforceMaxLength: 5
                },
                {
                    xtype: 'prescribertypeahead',
                    itemId: 'cbxPrescriber',
                    fieldLabel: 'Prescriber',
                    emptyText: '[NPI DEA PrescriberName Address]',
                    displayField: 'npi',
                    valueField: 'npi',
                    name:'newLockID'
                },
                {
                    fieldLabel:'Current Prescriber',
                    name:'currentLockID',disabled:true,
                    itemId:'txtNewPrescriber'
                },
                {
                    fieldLabel:'Office Contact',
                    name:'officeContact'
                },
                {
                    fieldLabel:'Office Contact Phone',
                    name:'officeContactPhone',
                    maskRe: /[0-9]/,
                    maxLength:12,
                    enforceMaxLength: 12
                },
                {
                    xtype:'combo',
                    fieldLabel:'Status',
                    name:'currentStatus',
                    itemId:'cbxcurrentStatus',
                    bind:
                    {
                        store:'{memberLockStatusStore}'
                    },
                    displayField:'name',
                    valueField:'value',
                    disabled:true
                },
                {
                    xtype:'combo',
                    fieldLabel:'Proposed Status',
                    itemId:'cbxStatusToBe',
                    name:'toBeStatus',
                    queryMode: 'local',
                    displayField:'name',
                    valueField:'value',
                    triggerAction: 'all',
                    forceSelection : true
                },
                {
                    xtype:'textarea',
                    fieldLabel:'Notes',
                    itemId:'txtNotes',
                    name:'notes',
                    allowBlank: false
                },
                {
                    xtype: 'hidden', itemId: 'hdnSystemId',name:'systemID'
                }
        ]
    },
    {
        flex: 2,
        margin: '0 10 0 0',
        xtype:'panel',
        scrollable:true,
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
        items:[
            {
                flex: 1,
                margin: '0 0 10 0',
                xtype:'gridpanel',
                title:'Fax / Attachments',
                itemId:'FaxGrid',
                scrollable:true,
                bind: {
                    store: '{FaxAndAttachmentsStore}'
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
                        drop: 'dropmenberLocks'
                    }
                },
                columns:[
                    {
                        xtype: 'actioncolumn',
                        dataIndex: 'DocumentID',
                        text: 'View',
                        hideable: false,
                        items: [{
                            // Use a URL in the icon config
                            iconCls: 'x-fa fa-paperclip',
                            // Use a URL in the icon config
                            tooltip: 'View',
                            handler: 'btnView_Click'

                        }]
                    },
                    {text:'Document ID', dataIndex: 'DocumentID', flex: 1,hidden:true},
                    {text:'Description',  dataIndex: 'DESCRIPTION',flex: 1},
                    {text:'Document Type' ,  dataIndex: 'inOut', flex: 1},
                    {
                        text: 'Fax/Attachement Date',
                        dataIndex: 'faxDate',
                        xtype: 'datecolumn',
                        renderer:function(value)
                        {
                            if(value && value!="") {
                                var strDate = '',
                                    arrtime=value.split('T')[1].split('.')[0],
                                    arrDate = value.split('T')[0].split('-');
                                if (arrDate.length == 3) {
                                    strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0] +" "+ arrtime;
                                }
                                return strDate;
                            }
                        },
                        flex: 1
                    },
                    {text:'Fax Number', dataIndex: 'FaxNumber', flex: 1,hidden:true},
                    {text:'Send By',dataIndex: 'SubmittedBy', flex: 1,hidden:true},
                    {
                        xtype: 'actioncolumn',
                        dataIndex: 'DocumentID',
                        text: 'Delete',
                        hideable: false,
                        items: [{
                            // Use a URL in the icon config
                            iconCls: 'x-fa fa-trash-o',
                            // Use a URL in the icon config
                            tooltip: 'Delete',
                            handler: 'btnDelete_Click'

                        }
                        ]}
                ],
            dockedItems:[{
                xtype:'toolbar',
                dock:'bottom',
                items:[
                    '->',
                    {xtype:'button',text:'Fax Queue',iconCls:'fa fa-print',itemId:'btnFaxQueue', handler:'FaxQueue_Click'},
                    {xtype:'button',text:'Add Attachment',iconCls:'fa fa-paperclip',itemId:'btnAttachment',handler:'AddAttachment_Click'}
                ]
            }]
        },
            {
                xtype:'panel',
                title:'Notes History:',
                flex: 1,
                margin: '0 0 10 0',
                items:[
                    {
                        flex: 1,
                        margin: '0 0 10 0',readOnly:true,
                        xtype:'textarea',height:'100%',width:'100%',
                        itemId:'NotesHistory'
                    }
                ]
            }]
    }],
    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            {text:'Save', iconCls:'fa fa-save',itemId:'btnDetailSave', handler: 'onAddPrescriberLocks'},
            {text:'Cancel', iconCls:'fa fa-remove', handler: 'onCancelClick'}
        ]
    }]
});