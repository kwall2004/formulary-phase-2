/**
 * Created by mkorivi on 11/7/2016.
 */

Ext.define('Atlas.casemanagement.view.CaseQueues', {
    extend: 'Ext.form.Panel',
    xtype: 'CaseQueues',
    title: 'Case Management Queue',
    layout: 'accordion',
    controller: 'casequeues',
    viewModel: 'CaseQueuesViewModel',
    requires: [
        'Ext.layout.container.Accordion',
        'Ext.grid.*',
        'Atlas.common.VTypes'
    ],
    items: [{
        title:'My Cases Overdue',
        itemId:'MyCasesOverdue',
        xtype:'Casemanagement.MyCasesOverdueGrid'
    },{
        title:'My Cases Due Today',
        itemId:'MyCasesDueToday',
        xtype:'Casemanagement.MyCasesDueTodayGrid'
    },{
        title:'All Cases Overdue',
        itemId:'AllCasesOverdue',
        xtype: 'Casemanagement.AllCasesOverdueGrid'
    },{
        title:'All Cases Due Today',
        itemId:'AllCasesDueToday',
        xtype:'Casemanagement.AllCasesDueTodayGrid'
    },{
        title:'MTM Invitation Call Queue',
        itemId:'MTMInvitationCallQueue',
        xtype:'Casemanagement.MTMInvitationCallGrid'
    },{
        title:'MTM CMR Queue',
        itemId:'MTMCMRQueue',
        xtype:'Casemanagement.MTMCMRGrid'
    },{
        title:'MTM TMR Queue',
        itemId:'MTMTMRQueue',
        xtype:'Casemanagement.MTMTMRGrid'
    }, {
        title:'Open MAP Cases',
        itemId:'OpenMAPCases',
        xtype:'Casemanagement.OpenMAPCasesGrid'
        }]
});
