
/*
    Developer: Tremaine Grant
    Previous Developer: Tremaine Grant
    Date: 7/14/16
    Description: A view that displays the grid in the Denials/Appeals/Letter Queue 
    section of Appeal Letter Reqs in the Authorization package.
    Orgin: Merlin
                  
*/
Ext.define('Atlas.authorization.view.authletterqueue.AppealLetterReqGrid', {
    xtype: 'authorization.AppealLetterReqGrid',
    itemId:'gridReqAppealLetter',
    controller: 'AppealLetterReqGridController',
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    viewModel:{
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                save: true
            }
        }
    },
    bind:{
        store: '{ReqAppealLetterStore}'
    },
    columns:[
        {
            xtype: 'widgetcolumn',
            hideable : false,
            width:40,
            widget: {
                xtype: 'button',
                text: '',
                iconCls: 'fa fa-long-arrow-right',
                handler:'onClick'
            }
        },
        {
            text: 'Assign To', dataIndex: 'AssignTo',
            editor :
            {
                xtype: 'combobox',
                allowBlank : false,
                displayField: 'userName',
                valueField: 'userName',
                bind:{
                    store: '{AssignToUserStore}'
                },
                listeners:{
                    select: 'assignToSelect'
                }

            }
        },
        {text:'Auth ID', dataIndex:'AuthID'},
        {text:'PA Type', dataIndex:'PAType'},
        {text:'Member Name', dataIndex:'MemberName'},
        {text:'Carrier', dataIndex:'CarrierName', hidden : true},
        {text:'Account', dataIndex:'AccountName'},
        {text:'LOB', dataIndex:'LOBName'},
        {text:'GCN', dataIndex:'GCN'},
        {text:'GPI Code', dataIndex:'GPICode'},
        {text:'Drug Name', dataIndex:'DrugName'},
        {text:'Decision', dataIndex:'AuthStatus'},
        {text:'Appeal Type', dataIndex:'AppealType'},
        {text:'Appeal Urgency Type', dataIndex:'AppealUrgencyTypeDesc'},
        {text:'Appeal Initiated On', dataIndex:'appealStartDate',hidden:true, xtype: 'datecolumn', format: 'm/d/Y H:i:s'},
        {text:'Appeal Due Date', dataIndex:'appealDueDate',xtype: 'datecolumn'},
        {text:'Appeal Decision Date', dataIndex:'AppealDecisionDate' ,hidden:true, xtype: 'datecolumn', format: 'm/d/Y H:i:s'},
        {text:'Hours Remainings', dataIndex:'HoursRemaining', renderer:function (value, metaData, record, row, col, store, gridView){
           var item=record.data.HoursRemaining;
            item= (item=='')?'0':item;
            if(item.indexOf('-') > -1){
                var cDisplay = item.indexOf('.') > -1 ? item.replace(".", ":") : item;
                return '<SPAN style="COLOR: red">'+cDisplay+'</SPAN>'
            }
            else {return '<SPAN style="COLOR: green">' + item + '</SPAN>';}
        }},
        {text: 'Note Date',dataIndex: 'NoteDate',xtype: 'datecolumn'},
        {text:'Notes', dataIndex:'Notes'}
     ],
    listeners:{
        itemmouseenter: function(view, record, item, index, e, options)
        {
            if (record.getData().Notes != '') {
                Ext.fly(item).set({'data-qtip': Ext.Date.format(record.getData().NoteDate, 'm/d/Y')  + ' - ' + record.getData().Notes});
            }
        }
    },
    plugins: {
        ptype: 'cellediting',
        clicksToEdit: 2,
        autoCancel: false
    },
     dockedItems: [{
       dock:'bottom',
       xtype: 'pagingtoolbar',
       pageSize:20
         ,displayInfo: true
     }]
});
