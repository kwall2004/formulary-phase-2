/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/15/2016
* Origin: MERLIN - Case Management
* Description: Quality of Care section for the 
* COC Meeting Template accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.QualityOfCare', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateQualityOfCare',

    items: [{
        xtype: 'grid',
        frame: true,

        title: 'HEDIS Profile',

        columns: [{
            dataIndex: 'service',
            text: 'Service'
        },{
            dataIndex: 'dueDate',
            text: 'Due Date'
        },{
            dataIndex: 'completed',
            text: 'Completed'
        },{
            dataIndex: 'dateCompleted',
            text: 'Date Completed'
        }]
    },{
        xtype: 'textareafield',
        fieldLabel: 'Issues'
    },{
        xtype: 'textareafield',
        fieldLabel: 'Plan'
    }]
});
