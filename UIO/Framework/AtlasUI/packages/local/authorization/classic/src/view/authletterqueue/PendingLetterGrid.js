
/*
    Developer: Tremaine Grant
    Previous Developer: Tremaine Grant
    Date: 7/14/16
    Description: A view that displays the grid in the Denials/Appeals/Letter Queue 
    section of Pending Letters in the Authorization package.
    Orgin: Merlin
                  
*/

Ext.define('Atlas.authorization.view.authletterqueue.PendingLettersGrid', {
    xtype: 'authorization.PendingLettersGrid',
    itemId:'gridPendingLetter',
    controller:'PendingLettersGridController',
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
        store: '{PendingLetterStore}'
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
                handler: 'onClick'
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
        {text:'Letter Type', dataIndex:'LetterType'},
        {text:'Letter Name', dataIndex:'LetterName'},
        {text:'Create User', dataIndex:'CreatedUser'},
        {text:'Created Date', dataIndex:'CreatedDate',xtype: 'datecolumn'},
        {text:'System ID', dataIndex:'SystemID' , hidden : true},
        {text:'Hours Remaining', dataIndex:'HoursRemaining', renderer:function (value, metaData, record, row, col, store, gridView){
            var item=record.data.HoursRemaining.toString();
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
                var strDate= Ext.Date.format(record.getData().NoteDate, 'm/d/Y');
                Ext.fly(item).set({'data-qtip': strDate  + ' - ' + record.getData().Notes});
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