/**
 * Created by j2487 on 9/28/2016.
 * Developer: Jagman Bhullar
 * 'View' of Member-->Menu-->DMR screen
 */
Ext.define('Atlas.member.view.MemberDMR', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memberdmr',
    title:'DMR',
    controller:'memberdmr',
    viewModel: 'membermemberdmr',
    listeners: {
        afterrender: 'showDmrFaxQueue'
    },
    hiddenValues: {
        faxDocumentID: null,
        faxSysID: null
    },
    dockedItems:[
        {
            xtype: 'toolbar',
            dock:'top',
            items:[
                {
                    xtype:'button',
                    text:'View Member DMR',
                    iconCls:'fa fa-search',
                    handler:'createViewMemberDMRWindow'
                },
                '-',
                {xtype: 'label', text: 'Time Received:'},
                '-',
                {xtype: 'label',text: 'User:'},
                {xtype: 'datefield'},
                {xtype: 'timefield', format: 'g:i:s', emptyText: 'HH:MM:SS'},
                {xtype: 'combobox', displayField: 'display', valueField: 'val', value: 'AM', bind: {
                    store: {
                        fields: [
                            'display',
                            'val'
                        ],

                        data: [{
                            'display':'AM',
                            'val': 'AM'
                        }, {
                            'display':'PM',
                            'val':'PM'
                        }]
                    }
                }},
                '-',
                {xtype: 'label', text: 'System:'},
                '->',
                {xtype:'button',text:'Add DMR',iconCls:'fa fa-plus-circle'},
                '-',
                {xtype:'button',text:'Fax Q',iconCls:'fa fa-edit', listeners: {click: 'showDmrFaxQueue'}}]
        },
        {
            xtype:'toolbar',
            dock:'bottom',
            items:[
                '->',
                { xtype:'combobox', fieldLabel: 'DMR Status', id:'cbxDMRStatus', bind: {store: '{getListItemByUser}'}, queryMode: 'local', displayField: 'name', valueField: 'id'},'-',
                {xtype:'button',text:'Save DMR Request',iconCls:'fa fa-save'}
            ]
        }],
      items:[
        {
            xtype:'container',
            layout:'vbox',
            height:'100%',
            width:'100%',
            items:[
                {
                    xtype:'panel',
                    layout:'hbox',
                    height:'40%',
                    width:'100%',
                    scrollable:true,
                    items:[
                        {
                            xtype:'panel',
                            title:'Member/Drug Information',
                            flex:2,
                            layout:'vbox',
                            items:[
                                {
                                    //xtype:'container',
                                    xtype: 'fieldset',
                                    layout:'vbox',
                                    items:[
                                        {
                                           xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'datefield',fieldLabel:'DMR Received Date',flex:1,value:new Date(),allowBlank:false},
                                                {xtype:'datefield',fieldLabel:'Date of Service',flex:1,allowBlank:false /*validateBlank:true*/},
                                                {xtype:'displayfield',fieldLabel:'Eligibility',flex:1}
                                            ]
                                        },
                                        {
                                            xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'textfield',fieldLabel:'Contact Person',flex:1, allowBlank:false,id:'dmrContactPerson'},
                                                {xtype:'textfield',fieldLabel:'Relationship to Patient',flex:1,allowBlank:false},
                                                {columnWidth:0.3}
                                            ]
                                        },
                                        {
                                            xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'combobox',fieldLabel:'Residence',flex:1,allowBlank:false},
                                                {xtype:'combobox',fieldLabel:'Plan Group',flex:1,allowBlank:false},
                                                {xtype:'button',text:'Fax Attached',iconCls:'fa fa-paperclip', id: 'dmrFaxAttached', flex:1, disabled: true},
                                                {xtype: 'displayfield', value: '', id: 'confirmDmrFaxAttached'}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    //xtype:'container',
                                    xtype: 'fieldset',
                                    layout:'vbox',
                                    border: 1,
                                    items:[
                                        {xtype:'textfield', fieldLabel:'Claim Id'},
                                        {
                                            xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'textfield',fieldLabel:'NDC#/LN',flex:1,allowBlank:false},
                                                {xtype:'textfield',fieldLabel:'Quantity',flex:1},
                                                {xtype:'textfield',fieldLabel:'Days Supply',flex:1},
                                                {xtype:'textfield',fieldLabel:'Amount Paid',flex:1}
                                            ]
                                        },
                                        {
                                            xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'displayfield',fieldLabel:'Drug Name',flex:1},
                                                {xtype:'displayfield',fieldLabel:'On Formulary',flex:1},
                                                {xtype:'displayfield',fieldLabel:'Quantity Limit',flex:1}
                                            ]
                                        },
                                        {
                                            xtype:'fieldcontainer',
                                            layout:'hbox',
                                            items:[
                                                {xtype:'displayfield',fieldLabel:'PA Required',flex:1},
                                                {xtype:'displayfield',fieldLabel:'Step Therapy Required',flex:1},
                                                {xtype:'displayfield',fieldLabel:'Pard D Excluded',flex:1},
                                                {xtype:'displayfield',fieldLabel:'Non Matched NDC',flex:1}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'panel',
                            title:'Reason for Request',
                            flex:1,
                            items:[
                                {
                                    xtype:'fieldcontainer',
                                    layout:'vbox',
                                    defaultType:'radiofield',
                                    items:[
                                        {boxLabel:'ID Card not available'},
                                        {boxLabel:'Out of network Pharmacy'},
                                        {boxLabel:'Emergency'},
                                        {boxLabel:'Eligibility Issue'},
                                        {boxLabel:'Pharmacy unable to process claim'},
                                        {boxLabel:'Non-Exchange claim during delinquency'},
                                        {boxLabel:'Other'}
                                    ]

                                }
                            ]
                        }
                    ]
                },
                {
                    xtype:'panel',
                    layout:'hbox',
                    height:'20%',
                    width:'100%',
                    title:'Physician Information',
                    scrollable:true,
                    items:[
                        { xtype:'textfield',fieldLabel:'NPI#',flex:0,labelWidth:'10%',allowBlank:false},
                        { xtype:'displayfield',fieldLabel:'Non Matched NDC',flex:2,labelWidth:'40%'},
                        { xtype:'displayfield',fieldLabel:'Sanctioned Physician',flex:2,labelWidth:'40%'}
                    ]
                },
                {
                    xtype:'panel',
                    title:'Pharmacy Information',
                    height:'20%',
                    width:'100%',
                    layout:'vbox',
                    items:[
                        {
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            items:[
                                { xtype:'textfield',fieldLabel:'NCPDP#',flex:1,labelWidth:'20%',allowBlank:false},
                                { xtype:'displayfield',fieldLabel:'Pharmacy Name',flex:2,labelWidth:'40%'},
                                { xtype:'displayfield',fieldLabel:'Excluded Pharmacy',flex:2,labelWidth:'40%'},
                                { xtype:'textfield',fieldLabel:'Prescription#',flex:3,labelWidth:'20%',allowBlank:false}
                            ]
                        }, {
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            items:[
                                { xtype:'combobox',grow: true,growMin: 330, editable: false, fieldLabel:'Pharmacy Service Type',flex:1,labelWidth:'20%',allowBlank:false, bind: {store: '{pharmacyServiceType}'}, displayField: 'name', valueField: 'value', listeners: {expand: 'pharmacyServiceTypeSelect'}},
                                { xtype:'textfield',fieldLabel:'Subclarification Code',flex:2,labelWidth:'40%',disabled:true}
                            ]
                        }, {
                            xtype:'fieldcontainer',
                            layout:'hbox',
                            items:[
                                { xtype:'displayfield',fieldLabel:'Pharmacy Address',flex:1,labelWidth:'20%'}
                            ]
                        }
                    ]
                },
                {
                   xtype:'panel',
                    layout:'hbox',
                    height:'40%',
                    width:'100%',
                    items:[
                        {
                            xtype:'panel',
                            layout:'vbox',
                            title:'Notes',
                            flex:2,
                            items:[
                                {xtype:'textarea',fieldLabel:'Enter Notes',width:'30%'},
                                {xtype:'textarea',fieldLabel:'Notes History',width:'30%'}
                            ]
                        },
                        {
                            xtype:'panel',
                            title:'Payment Information',
                            layout:'vbox',
                            flex:1,
                            items:[
                                 { xtype:'displayfield',fieldLabel:'Check#'},
                                 { xtype:'displayfield',fieldLabel:'Check Date'},
                                {xtype:'displayfield',fieldLabel:'Check Amount'}

                            ]
                        }
                    ]


                }
            ]
        }
    ]
});
/*View Member DMR Window*/
var win;
win = Ext.create('Ext.window.Window', {
    title: 'DMR Records',
    height: '40%',
    width: '40%',
    layout: 'fit',
    modal: true,
    closable: true,
    scrollable:true,
    items:[{
        xtype:'grid',
        columns: [
        {text: 'LOB',dataIndex:'LOB'},
        {text: 'Status'},
        {text: 'Hs Remaining'},
        {text: 'DMR Rec Date'},
        {text: 'Check Date'},
        {text: 'NDC'},
        {text: 'Date of Service'},
        {text: 'Amount Paid'},
        {text: 'NPI'},
        {text: 'Prescriber Name'},
        {text: 'NCPDP'},
        {text: 'Pharmacy Name'},
        {text: 'Check #'},
        {text: 'Check Amount'},
        {text: 'Carrier'},
        {text: 'Account'},
        {text: 'System Id'}
    ]}]
});