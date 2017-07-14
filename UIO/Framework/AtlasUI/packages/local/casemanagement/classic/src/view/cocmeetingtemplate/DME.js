/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Case Management
* Description: DME section for the 
* COC Meeting Template accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.DME', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateDME',
    
    items: [{
        xtype: 'grid',
        title: 'DME Descriptives',
        frame: true,

        columns: [{
            dataIndex: 'type',
            text: 'Type'
        },{
            dataIndex: 'value',
            text: 'Value'
        }]        
    },{
        xtype: 'textareafield',
        fieldLabel: 'DME Needs'
    },{
        xtype: 'textareafield',
        fieldLabel: 'DME Plan'
    }]
});
