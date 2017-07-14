
/*
    Last Developer: Tremaine Grant
    Previous Developer: Tremaine Grant
    Date: 7/14/16
    Description: A view that displays the grid in the Denials/Appeals/Letter Queue 
    section of Medicare Letter Reqs in the Authorization package.
    Orgin: Merlin
                  
*/

Ext.define('Atlas.authorization.view.authletterqueue.MedicareLettersReqsGrid', {
    xtype: 'authorization.MedicareLettersReqsGrid',
    itemId:'gridMedicareRequiredLetter',
    controller:'MedicareLettersReqsGridController',
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
        store: '{MedicareRequiredLetterStore}'
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
            text: 'Assign To', dataIndex: 'assignTo',
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
        {text:'Auth ID', dataIndex:'AuthId'},
        {text:'PA Type', dataIndex:'PAType'},
        {text:'Name', dataIndex:'MemberName'},
        {text:'Account', dataIndex:'AccountName'},
        {text:'LOB', dataIndex:'LOBName'},
        {text:'GCN', dataIndex:'GCN'},
        {text:'GPI Code', dataIndex:'GPICode'},
        {text:'Medication', dataIndex:'DrugName'},

        {text:'Hours Remaining', dataIndex:'HrsRemaining', renderer:function (value, metaData, record, row, col, store, gridView){
            var item = record.data.HrsRemaining;
            item = (item == '') ? '' : item;
            if (item.indexOf('-') > -1) {
                var cDisplay = item.indexOf('.') > -1 ? item.replace(".", ":") : item;
                return '<SPAN style="COLOR: red">' + cDisplay + '</SPAN>'
            }
            else if (item.indexOf('Error') > -1){
                return '';
            }
            else {
                if (item.indexOf('AOR') > -1){item='999.00'}
                return '<SPAN style="COLOR: green">' + item + '</SPAN>';
            }
        }},
        {text:'Denied Date', dataIndex:'deniedDate',xtype: 'datecolumn'},
        {text:'Denied By', dataIndex:'deniedBy'},
        {text:'Decision', dataIndex:'AuthStatus'},
        {text:'Carrier', dataIndex:'CarrierName', hidden : true},
        {text:'Appeal Type', dataIndex:'AppealType'},
        {text:'Appeal Urgency Type', dataIndex:'AppealUrgencyTypeDesc'},
        {text:'Appeal Due Date',dataIndex:'appealDueDate',xtype: 'datecolumn'},
        {text:'Approved Date',dataIndex:'ApprovedDateTime',xtype: 'datecolumn', renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')},
        {text:'Approved By', dataIndex:'ApprovedBy'},
        {text:'Note Date',dataIndex: 'NoteDate',xtype: 'datecolumn'},
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
       pageSize:20,
         displayInfo: true
     }]
});
