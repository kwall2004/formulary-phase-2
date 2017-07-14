/*
    Developer: Tremaine Grant
    Previous Developer: Tremaine Grant
    Description: A view shows the authorization letter information of the member.
    Orgin: Merlin              
*/
Ext.define('Atlas.authorization.view.authletterqueue.AuthLetterQueue', {
    extend: 'Ext.panel.Panel',
    xtype: 'AuthorizationLetterQueue',
    title: 'Denials/Appeals/Letter Queue',
    controller : 'AuthLetterQueueController',
    viewModel: 'AuthLetterQueueViewModel',
    layout: 'accordion',

    items: [{
        title: 'Approval Letters Required <font style=color:red;> loading... </font>',
        xtype:'authorization.ApprovalLetterReqGrid'
    },{
        title:'Denial Letters Required <font style=color:red;> loading... </font>',
        xtype:'authorization.DenialLetterReqGrid'
    },{
        title:'Appeal Letters Required <font style=color:red;> loading... </font>',
        xtype: 'authorization.AppealLetterReqGrid'
    },{
        title:'Intervention Letters Required <font style=color:red;> loading... </font>',
        xtype:'authorization.InterventionLettersReqGrid'
    },{
        title:'Pending Appeal Decisions <font style=color:red;> loading... </font>',
        xtype:'authorization.PendingAppealDecisionGrid'
    },{
        title:'Pending Letters <font style=color:red;> loading... </font>',
        xtype:'authorization.PendingLettersGrid'
    }
    ,{
        title:'Approval Letters <font style=color:red;> loading... </font>',
        xtype:'authorization.ApprovalLettersGrid'
    }
    ,{
        title:'Medicare Letters Required <font style=color:red;> loading... </font>',
        xtype:'authorization.MedicareLettersReqsGrid'
    },{
        title:'Medicare Letters Pending <font style=color:red;> loading... </font>',
        xtype:'authorization.MedicareLettersPendingGrid'
    },{
        title:'Medicare Letters Approved <font style=color:red;> loading... </font>',
        xtype:'authorization.MedicareLettersApprovedGrid'
    }]
});
