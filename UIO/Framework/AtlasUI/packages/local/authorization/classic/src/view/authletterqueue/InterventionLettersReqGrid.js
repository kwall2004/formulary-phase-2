
/*
    Developer: Tremaine Grant
    Previous Developer: Tremaine Grant
    Date: 7/14/16
    Description: A view that displays the grid in the Denials/Appeals/Letter Queue 
    section of Intervention Letters Reqs in the Authorization package.
    Orgin: Merlin
*/
Ext.define('Atlas.authorization.view.authletterqueue.InterventionLettersReqGrid', {
    xtype: 'authorization.InterventionLettersReqGrid',
    itemId:'gridReqInterventionLetter',
    controller:'InterventionLettersReqGridController',
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
        },
        stores: {
            ReqInterventionLetterStore: {
                model: 'Atlas.authorization.model.ReqInterventionLetterQModel',
                autoLoad: true
            }
        }
    },
    bind:{
        store: '{ReqInterventionLetterStore}'
    },

    columns:[
        {
            xtype: 'widgetcolumn',
            hideable : false,
            width:40,
            widget: {
                hideable : false,
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
        {text:'ETC', dataIndex:'ETC'},
        {text:'Denied Date', dataIndex:'ApprovedDateTime',xtype: 'datecolumn',renderer: Ext.util.Format.dateRenderer('m/d/Y H:i:s')},
        {text:'Denied By', dataIndex:'ApprovedBy'},
        {text: 'Note Date',dataIndex: 'NoteDate',xtype: 'datecolumn'},
        {text:'Notes', dataIndex:'Notes'},
        {
            xtype: 'widgetcolumn',
            width:300,
            hideable: false,
            widget: {
                xtype: 'button',
                hideable : false,
                text:'No Intervention Letter Required',
                iconCls: 'fa fa-long-arrow-right',
                listeners:{
                    click: 'onCheckClick'
                }
            }
        }
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
