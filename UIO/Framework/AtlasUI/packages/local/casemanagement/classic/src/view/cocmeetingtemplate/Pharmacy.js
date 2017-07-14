/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/15/2016
* Origin: MERLIN - Case Management
* Description: Pharmacy section for the 
* COC Meeting Template accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.Pharmacy', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplatePharmacy',

    items: [{
        xtype: 'grid',
        frame: true,
        title: 'Current Prescriptions',

        columns: [{
            dataIndex: 'prescriptions',
            text: ' Name'
        },{
            dataIndex: 'scripts',
            text: 'Scripts'
        },{
            dataIndex: 'cost',
            text: 'Cost'        
        }]        
    },{
        xtype: 'textareafield',
        fieldLabel: 'Pharmacy Issues'
    },{
        xtype: 'textareafield',
        fieldLabel: 'Pharmacy Plan'
    }]
});
