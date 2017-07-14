/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/18/2016
* Origin: MERLIN - Case Management
* Description: Specialty Care section for the 
* COC Meeting Template accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.SpecialtyCare', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateSpecialtyCare',
    
    items: [{
        xtype: 'grid',
        title: 'Specialty Care Doctors',
        frame: true,

        columns: [{
            dataIndex: 'doctorName',
            text: 'Doctor Name'
        },{
            dataIndex: 'specialty',
            text: 'Specialty'
        }]
    },{
        fieldLabel: 'Specialty Care Issues'
    },{
        fieldLabel: 'Specialty Care Plan'
    }]
});
