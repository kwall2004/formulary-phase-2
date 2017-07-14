Ext.define('Atlas.member.view.MemLocksPharmacy', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memlockspharmacy',
    controller: 'memlockspharmacycontroller',
    viewModel: 'memlocks',
    width: 1200,
    height: 650,
    masterRecord: null,
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        frame: true
    },

    items:[
        {
            flex: 1,
            xtype: 'form',
            itemId:'formPharmacy',
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            defaults: {
                frame: true,
                labelWidth:140,
                xtype:'textfield',
                width:250
            },
            items:[
                {
                    fieldLabel:'Recipient Id',
                    name:'recipientId',
                    bind: {
                        value:'{masterRecord.recipientID}',
                        disabled: true
                    }

                },
                {
                    fieldLabel:'Member Name',
                    name:'memberName',
                    bind: {
                        value:'{masterRecord.MemberName}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'Address 1',
                    name:'address1',
                    bind: {
                        value:'{masterRecord.Home_Address1}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'Address 2',
                    name:'address2',
                    bind: {
                        value:'{masterRecord.Home_Address2}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'City',
                    name:'city',
                    bind: {
                        value:'{masterRecord.Home_City}',
                        disabled: true
                    }
                },
                {
                    fieldLabel:'State',
                    name:'state',
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
                    xtype:'combo',
                    fieldLabel:'Plan Group',
                    name:'plangroupId',
                    itemId:'cbxplangroupId',
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
                    xtype: 'providertypeahead',
                    fieldLabel: 'Pharmacy',
                    itemId: 'cbxPharmacy',
                    name:'newLockID',
                    displayField: 'ncpdpId',
                    emptyText: '[NCPDP or Pharmacy Name]',
                    valueField: 'ncpdpId',
                    matchFieldWidth: false
                },
                {
                    fieldLabel:'Current Pharmacy',
                    name:'currentLockID',disabled:true,
                    itemId:'txtNewPharmacy'
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
            autoScroll:true,
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items:[
                {
                    flex: 1,
                    xtype:'gridpanel',
                    title:'Fax / Attachments',
                    autoScroll:true,
                    itemId:'FaxGrid',
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
                            text: 'Fax/Attachment Date',
                            dataIndex: 'faxDate',
                            xtype: 'datecolumn',
                            renderer:function(value)
                           {
                               if(value && value!="") {
                                   var strDate = value,
                                       arrtime=value.split('T')[1].split('.')[0],
                                       arrDate = value.split('T')[0].split('-');
                                   if (arrDate.length == 3) {
                                       strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0] +" "+ arrtime;
                                   }
                                   strDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(strDate, 'm/d/Y  H:i:s');
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
                    ]}],
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'bottom',
                            items:[
                                '->',
                                {xtype:'button',text:'Fax Queue',iconCls:'fa fa-print',itemId:'btnFaxQueue', handler:'FaxQueue_Click'},
                                {xtype:'button',text:'Add Attachment',iconCls:'fa fa-paperclip',itemId:'btnAttachment', handler:'AddAttachment_Click'}
                            ]
                        }]
                },
                {
                    flex: 1,
                    margin: '0 0 10 0',
                    xtype:'panel',
                    title:'Notes History:',
                    items:[
                        {
                            xtype:'textarea',flex:1,readOnly:true,
                            itemId:'NotesHistory',
                            height:'100%',width:'100%',
                            margin: '0 0 10 0'
                        }
                    ]
                }]
        }
        ],
    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            {text:'Save', iconCls:'fa fa-save',itemId:'btnDetailSave', handler: 'onAddPharmacyLocks'},
            {text:'Cancel', iconCls:'fa fa-remove', handler: 'onCancelClick'}
        ]
    }]
});