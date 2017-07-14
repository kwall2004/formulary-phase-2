/*
 Developer: Tremaine Grant
 Description: A view that displays the grid in the all grievnaces popup window.

 */

Ext.define('Atlas.grievances.view.grievances.ViewAllGrievancesGrid', {
    extend: 'Ext.window.Window',
    xtype: 'grievances-ViewAllGrievancesGrid',
    title: 'Grievances',
    viewModel: 'viewallgrievancesviewmodel',
    controller: 'ViewAllGrievancesController',
    width: 900,
    height: 700,
    modal: true,
    //scrollable:true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            flex: 1,
            height: 700,
            itemId: 'gpGrievance',
            tbar: [
                {
                    xtype: 'exporttoexcelbutton',
                    iconCls: 'fa fa-file-excel-o'
                }
            ],
            //flex: 10,
            columns: [
                {text: 'System Id', dataIndex: 'SystemID', hidden: true},
                {text: 'GrievanceID', dataIndex: 'GrievanceID', hidden: true},
                {
                    text: 'Incident Date',
                    dataIndex: 'IncidentDate',
                    width: 100,
                    //xtype: 'datecolumn',
                    //format: 'm-d-Y',
                    //filter: {type: 'date'}
                    renderer : function(value){
                        if(value != undefined && value != ''){
                            var arr = value.split('-');
                            return arr[1] + '/' + arr[2] + '/' + arr[0];
                        }
                    }
                },
                {text: 'NotificationMethod', dataIndex: 'NotificationMethod', hidden: true},
                {
                    text: 'Reporting By',
                    dataIndex: 'initiatedByID',
                    renderer: 'InitiatedBy_Renderer'
                },
                {
                    text: 'Reporting By Name',
                    dataIndex: 'InitiatorFullName',
                    renderer: 'InitiatorFullName_Renderer'
                },
                {
                    text: 'Reporting On',
                    dataIndex: 'ReportingOnId',
                    renderer: 'ReportingOn_Renderer'
                },
                {text: 'Category', dataIndex: 'CategoryDesc'},
                {text: 'Type', dataIndex: 'TypeDesc'},
                {text: 'Level', dataIndex: 'Level', hidden : true,renderer:'levelRenderer'},
                {text: 'Assgn. To', dataIndex: 'AssignedTo'},
                {
                    text: 'Days Open',
                    dataIndex: 'DaysOpen',
                    renderer: 'DaysOpen_Renderer'
                },
                {text: 'Resolution', dataIndex: 'Resolution', hidden: true},
                {text: 'Disposition', dataIndex: 'Disposition', hidden: true},
                {
                    text: 'Status',
                    dataIndex: 'Stat',
                    renderer: 'Status_Renderer'
                }
            ],
            plugins: [
                {
                    ptype: 'gridexporter'
                }
            ],

            listeners: {
                itemclick: 'gpGrievance_ItemClick'
            },
            bind: '{StoreGrievances}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{StoreGrievances}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 24
                }
            ]
        }
    ]
});

/*Ext.define('Atlas.grievances.view.grievances.ViewAllGrievancesGrid', {
 xtype: 'ViewAllGrievancesGrid',
 extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
 /!*viewModel:{
 type: 'common-shared-editgridmodel',
 data:{
 //note: this needs to move to controller with user permissions
 userpermissions: {
 create: true,
 update: true,
 export: true,
 save: true
 }
 },
 stores:{
 ViewAllGrievances:{
 data:[{
 indicationDate: 'blah',
 reportBy: 'blah,',
 reportingByName: 'blah',
 reportingOn:'blah',
 category:'blah',
 type:'blah',
 assignTo:'blah',
 daysOpen:'blah',
 status:'blah'
 }]
 }
 }
 },*!/
 bind:{
 store: '{ViewAllGrievances}'
 },
 columns:[
 {text:'Indication Date', dataIndex:'indicationDate'},
 {text:'Report By', dataIndex:'reportBy'},
 {text:'Reporting By Name', dataIndex:'reportingByName'},
 {text:'Reporting On', dataIndex:'reportingOn'},
 {text:'Category', dataIndex:'category'},
 {text:'Type', dataIndex:'type'},
 {text:'Assign To', dataIndex:'assignTo'},
 {text:'Days Open', dataIndex:'daysOpen'},
 {text:'Status', dataIndex:'status'}
 ],
 dockedItems: [{
 dock:'bottom',
 xtype: 'pagingtoolbar',
 pageSize:26
 }]
 });*/
