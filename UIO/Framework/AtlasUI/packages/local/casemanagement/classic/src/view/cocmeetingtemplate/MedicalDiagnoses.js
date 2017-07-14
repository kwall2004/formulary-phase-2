/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/15/2016
* Origin: MERLIN - Case Management
* Description: Medical Diagnoses section for the 
* COC Meeting Template accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.MedicalDiagnoses', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateMedicalDiagnoses',

    items: [{
        xtype: 'grid',
        frame: true,

        columns: [{
            dataIndex: 'medicalIssues',
            text: 'Medical Issues'
        }]
    },{
        xtype: 'grid',
        frame: true,

        title: 'Top 10 Diagnoses',

        columns: [{
            dataIndex: 'code',
            text: 'Code'
        },{
            dataIndex: 'description',
            text: 'Description'
        },{
            dataIndex: 'claimCount',
            text: 'Claim Count'
        }]
    },{
        xtype: 'textareafield',
        title: 'Other Medical Diagnoses'
    }]
});
