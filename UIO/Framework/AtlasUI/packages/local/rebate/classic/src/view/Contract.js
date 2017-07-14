/**
 * Created by T4317 on 8/3/2016.
 */
Ext.define('Atlas.rebate.view.Contract', {
    extend: 'Ext.panel.Panel',
    xtype: 'rebatecontract',
    title: 'Rebate Contract',
    viewModel:'rebate',
    controller:'rebatecontract',
    fullscreen:true,
    layout:'border',
    items: [
        {
            region:'center',
            flex:1,
            layout:'hbox',
            xtype:'panel',
            items:[
                {
                title:'Manufacturer Information',itemId:'mfrInfo',
                flex:1,xtype:'panel',height:'100%',cls: 'card-panel',
                defaults : {
                    labelWidth : 125
                },
                items:[{
                    xtype:'displayfield',
                    fieldLabel:'Manufacturer ID',
                    bind:{
                        value:'{manufacturerRec.manufacturerID}'
                    }
                },{
                    xtype:'displayfield',
                    fieldLabel:'Manufacturer Name',
                    bind:{
                        value:'{manufacturerRec.Name}'
                    }
                },{
                    xtype:'displayfield',
                    fieldLabel:'Address',
                    bind:{
                        //value:'{manufacturerRec.address1} {manufacturerRec.address2}'
                        value:'{manufacturerRec.address1}'
                    }
                },
                    {
                        xtype:'displayfield',fieldLabel:'',margin:'0 0 0 106',labelWidth : 125,
                        bind:{
                            value:'{manufacturerRec.city} , {manufacturerRec.state} {manufacturerRec.zip}'
                        }
                    }
                ]
            },
                {
                title:'Manufacturer Rebate Contracts',
                flex:2,xtype:'gridpanel',height:'100%',itemId:'mfrGrid',cls: 'card-panel',
                selModel: {
                    selType: 'rowmodel', // rowmodel is the default selection model
                    mode: 'SINGLE' // Allows selection of multiple rows
                },
                bind:{store:'{rebatecontractstore}'},listeners:{rowclick:'onContractSelect'},
                columns:[
                    {text:'Contract ID',dataIndex:'contractID',flex:1},
                    {text:'Payment Cycle',dataIndex:'payCycle',flex:1},
                    {text:'Effective Date',dataIndex:'effDate',flex:1,
                        renderer: function(value, field){
                            if(value)
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                        }},
                    {text:'Termination Date',dataIndex:'termDate',flex:1,
                        renderer: function(value, field){
                            if(value)
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                        }},
                    {text:'Issue Date',dataIndex:'issueDate',flex:1,
                        renderer: function(value, field){
                            if(value)
                            return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                        }},
                    {text:'Contract Status',dataIndex:'contractStatus',flex:1}
                ]
            }
            ],
            dockedItems:[{
                dock:'top',
                xtype:'toolbar',
                ui:'footer',itemId:'mfrToolbar',
                items:[{
                    xtype:'combobox',
                    fieldLabel:'Manufacturer',
                    bind:{
                        store:'{manufacturerstore}'
                    },
                    displayField: 'Name',
                    valueField: 'manufacturerID',
                    listeners:{
                        select:'viewManufacturerInfo'
                    },
                    width: 400,
                    tpl: Ext.create('Ext.XTemplate',
                        '</Html>'
                        + '<tpl for=".">'
                        + '<tpl if="xindex == 1">'
                        + '<table style="width: 330px;">'
                        + '<tr>'
                        + '<th style="font-weight: bold; padding: 3px;">ID</th>'
                        + '<th style="font-weight: bold; padding: 3px;">Manufacturer Name</th>'
                        + '</tr>'
                        + '</tpl>'
                        + '<tr class="x-boundlist-item">'
                        + '<td style="padding: 3px;">{manufacturerID}</td>'
                        + '<td style="padding: 3px;">{Name}</td>'
                        + '</tr>'
                        + '<tpl if="xindex==0">'
                        + '</table>'
                        + '</tpl>'
                        + '</tpl>'
                        + '</Html>')
                },
                    '->', {
                        xtype:'button', text:'Add Contract' , itemId:'btnAddCon',disabled:true,iconCls: 'fa fa-plus-circle', handler:'AddContract'
                    },{
                        xtype:'button', text:'Delete Contract', itemId:'btnDelCon',disabled:true,iconCls: 'fa fa-minus-circle', handler:'DeleteContract'
                    }]
            }]
        },
        {
            region:'south',
            xtype:'tabpanel',flex:2,itemId:'contractTabs',
            items:[
                {
                    title:'Contract Terms',
                    xtype:'panel',itemId:'tabcontractTerms',
                    layout:'hbox',height:'100%',
                    items:[
                        {
                            xtype:'panel',flex:1,height:'100%',itemId:'panelContractDetail',disabled:true,
                            items:[
                                {
                                    xtype:'form',
                                    itemId:'formId',
                                    items:[
                                        {

                                            xtype:'fieldset',
                                            itemId:'formFieldSet',
                                            // listeners: {
                                            //     add: function(me, component, index) {
                                            //         //debugger;
                                            //         if( component.xtype != 'textfield' && component.xtype !='textarea' ) {
                                            //             component.on('change', 'handleFieldChanged');
                                            //         }
                                            //     }
                                            // },
                                            title:'Detail',
                                            layout:'form',
                                            collapsible : true,
                                            items:[
                                                {
                                                    xtype:'textfield',
                                                    fieldLabel:'Contract ID',itemId:'txtContractID',readOnly:true
                                                },{
                                                    xtype:'combobox',
                                                    allowBlank:false,
                                                    forceSelection: true,
                                                    fieldLabel:'Contract Status',
                                                    itemId:'cbxContractStatus',
                                                    bind:{
                                                        store:'{statusstore}'
                                                    },
                                                    displayField:'name',
                                                    valueField : 'value',
                                                    queryMode:'local',
                                                    emptyText : '[Select Contract Status]',
                                                    listeners:{
                                                        select:'onContractStatusChanged'
                                                    }
                                                },{
                                                    xtype:'datefield',
                                                    fieldLabel:'Effective Date',
                                                    itemId:'dtEffDate',
                                                    format : 'm/d/Y',
                                                    // renderer: function(value, field){
                                                    //     if(value)
                                                    //         return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                                                    // },
                                                    allowBlank:false,
                                                    listeners:{
                                                        select:'onContractStatusChanged'
                                                    }
                                                },{
                                                    xtype:'datefield',
                                                    fieldLabel:'Termination Date',
                                                    format : 'm/d/Y',
                                                    // renderer: function(value, field){
                                                    //     if(value)
                                                    //         return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                                                    // },
                                                    itemId:'dtTermDate',
                                                    listeners:{
                                                        select:'onContractStatusChanged'
                                                    }
                                                },{
                                                    xtype:'combobox',
                                                    forceSelection: true,
                                                    fieldLabel:'Payment Cycle',
                                                    itemId:'cbxPaymentCycle',
                                                    bind:{
                                                        store:'{paycyclestore}'
                                                    },
                                                    displayField:'name',
                                                    valueField : 'value',
                                                    queryMode:'local',
                                                    emptyText : '[Select Payment Cycle]',
                                                    listeners:{
                                                        select:'onContractStatusChanged'
                                                    }
                                                },{
                                                    xtype:'datefield',
                                                    fieldLabel:'Issue Date',
                                                    // renderer: function(value, field){
                                                    //     if(value)
                                                    //         return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                                                    // },
                                                    itemId:'dtIssueDate',
                                                    //value : new Date(),
                                                    format : 'm/d/Y',
                                                    listeners:{
                                                        select:'onContractStatusChanged',
                                                        render: function(c) {
                                                            c.setRawValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y'));
                                                        }

                                                    }
                                                },{
                                                    xtype:'textfield',
                                                    fieldLabel:'Issue By',itemId:'txtIssueBy',disabled: true
                                                },{
                                                    xtype:'textarea',
                                                    fieldLabel:'Contract Info',itemId:'txtContractInfo'
                                                    // listeners:{
                                                    //     blur  :'onContractInfoChanged'
                                                    // }
                                                },{
                                                    xtype:'combo',
                                                    bind:{
                                                        store:'{plangroupstore}',
                                                        value:'{selectedCoverdPlan}'
                                                    },
                                                    displayField:'planGroupName',
                                                    valueField:'planGroupId',
                                                    emptyText:'Select Plan Group',
                                                    fieldLabel:'Covered Plans',
                                                    itemId:'cbxCoveredPlans',
                                                    multiSelect:true,
                                                    editable: false,
                                                    mode: 'local',
                                                    selectOnFocus: false,
                                                    triggerAction: 'all',
                                                    listConfig: {
                                                        getInnerTpl: function() {
                                                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {planGroupName} </div>';
                                                        }
                                                    },
                                                    listeners:{
                                                        select:'onContractStatusChanged'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            dockedItems:[
                                {
                                    xtype:'statusbar',
                                    dock:'bottom',itemId:'formstatus',
                                    items:[
                                        '->',
                                        {xtype:'button',text:'Save',iconCls: 'fa fa-floppy-o',handler:'SaveContractDetails'},
                                        {xtype:'button',text:'Cancel',iconCls: 'fa fa-times-circle-o',handler:'cancelConract',itemId:'btnCancelContract'}
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'panel',
                            flex:1,layout:'vbox',height:'100%', cls: 'card-panel',
                            items:[
                                {
                                    title:'Notes',flex:1,width:'100%',itemId:'panelNotes',disabled:true,bind:{store:'{contractnotestore}'},
                                    xtype:'gridpanel',
                                    listeners:{rowClick:'onGridRowSelect',rowdblclick :'onRowDoubleClick'},
                                    columns:[
                                        {text:'Subject',flex:1,dataIndex:'Subject'},
                                        {text: 'Note',flex:1,dataIndex:'Note'},
                                        {text:'Create Date',flex:1,dataIndex:'CreateDate',
                                            renderer: function(value, record){
                                                if(value)
                                                {
                                                    var cd = Ext.util.Format.date(value, 'm/d/Y');
                                                    var concat = cd +' '+Ext.String.trim(record.record.data.CreateTime);
                                                    var dt = Ext.Date.parse(concat,'m/d/Y g:i:sa');
                                                    return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(dt.toString(),'m/d/Y');
                                                }
                                            }},
                                        {text:'Create By',flex:1,dataIndex:'CreateUser'},
                                        {text:'System ID',flex:1,dataIndex:'SystemID',hidden:true}
                                    ],
                                    dockedItems:[
                                        {
                                            xtype:'pagingtoolbar',
                                            dock:'bottom',
                                            displayInfo:true
                                        },
                                        {
                                            xtype:'toolbar',
                                            dock:'top',
                                            items:[
                                                {xtype:'button',text:'Add',handler:'AddNotes', iconCls: 'fa  fa-plus-circle'},'-',
                                                {xtype:'button',text:'Update',handler:'UpdateNotes',disabled:true,itemId:'btnUpdateNotes', iconCls: 'fa fa-pencil-square-o'},'-',
                                                {xtype:'button',text:'Delete',handler:'DeleteNotes',disabled:true,itemId:'btnDeleteNotes', iconCls: 'fa  fa-minus-circle'}
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype:'panel',title:'Line of Business',width:'100%',itemId:'panelLob',disabled:true, cls: 'card-panel',
                                    items:[{
                                        xtype: 'container',
                                        title: 'LOB',itemId:'lobfieldset'
                                    }]
                                }]
                        }]
                },
                {
                    title:'Rebate Files and Reports',itemId:'tabRebateFiles',disabled:true,
                    selModel: {
                        selType: 'rowmodel', // rowmodel is the default selection model
                        mode: 'MULTI' // Allows selection of multiple rows
                    },
                    xtype:'grid',
                    reference:'reportAttachmentsGrid',
                    bind:{store:'{attachmentandreportstore}'},
                    columns:[
                        {text:'Doc ID',hidden:true,flex:1,dataIndex:'DocumentID'},
                        {text:'Job Num',hidden:true,flex:1,dataIndex:'jNum'},
                        {
                            text:'View',flex:1,
                            xtype:'actioncolumn',
                            hideable:false,
                            items: [{
                                xtype:'button',
                                iconCls: 'x-fa fa-paperclip',  // Use a URL in the icon config
                                tooltip: 'View Attachment',
                                handler: function(grid, rowIndex, colIndex) {
                                    var documentModel = Ext.create('Atlas.common.model.DocumentURL');
                                    documentModel.getProxy().setExtraParam('pDocumentID', grid.eventPosition.record.get('DocumentID'));
                                    documentModel.load({
                                        failure: function(record, operation){
                                        },
                                        success: function(record, operation)
                                        {
                                        },
                                        callback: function(record, operation, success) {
                                            var obj = Ext.decode(operation.getResponse().responseText);
                                            window.open(obj.metadata.pURL);
                                        }
                                    });
                                }
                            }]
                        },
                        {
                            text:'Delete',flex:1,
                            hideable:false,
                            xtype:'actioncolumn',
                            items: [{
                                xtype:'button',
                                iconCls: 'x-fa fa-minus-circle',  // Use a URL in the icon config
                                tooltip: 'Delete Attachment',
                                handler:'DeleteJobAndAttachment'
                            }]
                        },
                        {text:'Type',flex:1,dataIndex:'RecordType'},
                        {text:'Status',flex:1,dataIndex:'StatusDescription'},
                        {text:'Description',flex:1,dataIndex:'DESCRIPTION'},
                        {text:'File Name',flex:1,dataIndex:'fileNameShort'},
                        {text:'Document Type',hidden:true,flex:1,dataIndex:'inOut'},
                        {text:'Attachment/Submit Date', dataIndex:'SubmittedDate',format:'m/d/Y H:i:s',xtype: 'datecolumn',flex:1},
                        {text:'Completion Date', dataIndex:'faxDate',format:'m/d/Y H:i:s',xtype: 'datecolumn',flex:1}
                    ],
                    bbar: {
                        xtype: 'pagingtoolbar',
                        bind: '{attachmentandreportstore}',
                        displayInfo: true,
                        hideRefresh: false
                    },
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            dock:'top',
                            items:[
                                {
                                     xtype:'segmentedbutton',
                                     items:[
                                        {xtype:'button',text:'Get Utilization Detail',handler:'getUtilizationDetail', iconCls : 'x-fa  fa-book'},
                                        {xtype:'button',text:'Get Invoice',handler:'getInvoice', iconCls : 'fa  fa-file-text'},
                                        {xtype:'button',text:'Get Covered Lives',handler:'getCoveredLives', iconCls : 'fa  fa-file-text-o'}
                                     ]
                                }
                                ,'->',
                                {xtype:'button',text:'Add Attachment',handler:'onAddAttachmentClick',itemId:'btnAddAttach', iconCls : 'x-fa fa-edit'}
                            ]
                        }]
                }
            ]}]
});