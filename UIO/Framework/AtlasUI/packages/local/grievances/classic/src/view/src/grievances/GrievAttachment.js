/*
    Developer: Tremaine Grant
    Description: A view that shows a form to upload supplimentary attachements to a grievance report.
                  
*/
Ext.define('Atlas.grievances.view.grievances.GrievAttachment', {
     extend: 'Ext.panel.Panel',
     xtype: 'GrievAttachment',
     layout:'hbox',
     defaults:{
         flex:1,
         border:true
     },
     items: [
         {
             defaults:{
                 xtype: 'textfield'
             },
             items:[
                 {
                     fieldLabel: 'Description'
                 },
                 {
                     fieldLabel: 'File'
                 }
             ]
         },
         {
             xtype:'grid',
             columns:[
                 {header:'File Name', dataIndex:''},
                 {header: 'Description', dataIndex:''}
             ]
         }
     ]
});