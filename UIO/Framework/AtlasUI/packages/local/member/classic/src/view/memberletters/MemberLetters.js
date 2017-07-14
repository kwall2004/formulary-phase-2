/*
 Last Developer: Jagman Bhullar
 Previous Developer: Tremaine Grant
 Description: A view shows the member letters.

 */
Ext.define('Atlas.member.view.memberletters.MemberLetters', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-memberletters-memberletters',
    title: 'Member Letters',
    fullscreen:true,
    layout: 'fit',
    controller:'memberletters',
    // model: 'Atlas.member.model.MemberLettersModel',
    viewModel:
    {
        stores: {
            memberlettersstore: {
                // model: 'Atlas.member.model.MemberLettersModel'
                type:'member-memberletters'
            },
            memberplanstore:{
                model:'Atlas.member.model.MemberPlanGroups',
                session:true,
                remoteSort:true,
                remoteFilter:true
            }
        }
    },
    items:[{
        xtype:'grid',flex:1,
        bind: {
            store: '{memberlettersstore}'
        },
        listeners:{
          rowdblclick:'onRowDoubleClick'
        },
        columns:[
            {
                xtype:'actioncolumn',
                width:50,
                hideable:false,
                items: [{
                    xtype: 'button',
                    iconCls: 'x-fa fa-paperclip',  // Use a URL in the icon config
                    tooltip: 'View Attachment',
                    handler: function (grid, rowIndex, colIndex) {

                        Atlas.common.utility.Utilities.viewDocument(grid.eventPosition.record.get('DocumentID'));

                    }
                }]
            },
            {text:'Letter Name', dataIndex:'letterName',flex:1},
            {text:'Create Date', dataIndex:'createDate',format:'m/d/Y',xtype: 'datecolumn',flex:1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                // debugger;
                    if(value!="" && value !=null)
                    {
                        var date=new Date(value);
                        date.setDate(date.getDate() + 1);
                        return Ext.Date.format(date, 'm/d/Y')
                    }
                }
            },
            {text:'Created By', dataIndex:'createdBy',flex:1},
            {text:'Carrier', dataIndex:'carrier',flex:1},
            {text:'Account', dataIndex:'account',flex:1},
            {text:'LOB', dataIndex:'lob',flex:1},
            { text:'Approved Date', dataIndex:'approvedDate',flex:1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                // debugger;
                    if(value!="" && value !=null)
                    {
                        var date=new Date(value);
                        date.setDate(date.getDate() + 1);
                        return Ext.Date.format(date, 'm/d/Y')
                    }
                }
            },
            {text:'Approved By', dataIndex:'approvedBy',flex:1},
            {text:'Sent Date', dataIndex:'SentDate',format:'m/d/Y H:i:s',xtype: 'datecolumn',flex:1},
            {text:'AIMS Date', dataIndex:'POBoxDropDate',format:'m/d/Y H:i:s',xtype: 'datecolumn',flex:1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                    // debugger;
                    if(value!="" && value !=null)
                    {
                        var date=new Date(value);
                        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(date, 'm/d/Y H:i:s')
                    }
                }
            },
            {text:'PO Box Drop Date', dataIndex:'POBoxDropDate02',format:'m/d/Y H:i:s',xtype: 'datecolumn',flex:1,
                renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                    // debugger;
                    if(value!="" && value !=null)
                    {
                        var date=new Date(value);
                        return Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(date, 'm/d/Y H:i:s')
                    }
                }},
            {text:'Sent By', dataIndex:'sentBy',flex:1},
            {text:'Letter ID',dataIndex:'LetterID',hidden:true,flex:1},
            {text:'Auth ID',dataIndex:'authID',hidden:true,flex:1},
            {text: 'Document ID',dataIndex:'DocumentID',hidden:true,flex:1},
            {text: 'Letter Type',dataIndex:'letterType',hidden:true,flex:1},
            {text: 'Letter Category',dataIndex:'LetterCategory',hidden:true,flex:1},
            {text: 'System ID',dataIndex:'systemID',hidden:true,flex:1}
        ],
        dockedItems: [
            {
                dock:'bottom',
                xtype: 'pagingtoolbar',
                pageSize:24,
                bind: {
                    store: '{memberlettersstore}'
                },
                displayInfo:true,
                items:[
                    {
                        xtype:'button',
                        text:'Send PA Form',
                        handler:'openSendFaxDialog'
                    },'-']
            }]
    }]
});