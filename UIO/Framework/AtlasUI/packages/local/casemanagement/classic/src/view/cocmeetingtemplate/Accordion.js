/**
* Last Developer: Kevin Tabasan
* Previous Developer: Kevin Tabasan
* Last Worked On: 7/15/2016
* Origin: MERLIN - Case Management
* Description: Accordion for the COC Meeting Template Accordion
**/

Ext.define('Atlas.casemanagement.view.cocmeetingtemplate.Accordion', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCOCMeetingTemplateAccordion',
    layout: 'accordion',

    items: [{
        title: 'MEDICAL DIAGNOSES',

        items: [{
            xtype: 'COCMeetingTemplateMedicalDiagnoses'
        }]
    },{
        title: 'PCP',
        
        items: [{
            xtype: 'textareafield',
            fieldLabel: 'PCP Issues'
        },{
            xtype: 'textareafield',
            fieldLabel: 'PCP Plan'
        }]
    },{
        title: 'SPECIALTY CARE',
        
        items: [{
            xtype: 'COCMeetingTemplateSpecialtyCare'
        }]
    },{
        title: 'PHARMACY',
        
        items: [{
            xtype: 'COCMeetingTemplatePharmacy'
        }]
    },{
        title: 'BEHAVORIAL HEALTH',
        
        items: [{
            xtype: 'textareafield',
            fieldLabel: 'Behavorial Health Issues'
        },{
            xtype: 'textareafield',
            fieldLabel: 'Behavorial Health Plan'
        }]
    },{
        title: 'NUTRITION CARE',
        
        items: [{
            xtype: 'textareafield',
            fieldLabel: 'Nutrition Issues'
        },{
            xtype: 'textareafield',
            fieldLabel: 'Nutrition Plan'
        }]
    },{
        title: 'SOCIAL / COMMUNITY / TRANSPORTATION',
        
        items: [{
            xtype: 'textareafield',            
            fieldLabel: 'Issues'
        },{
            xtype: 'textareafield',
            fieldLabel: 'Care Plan'
        }]
    },{
        title: 'QUALITY OF CARE / HEDIS',
        
        items: [{
            xtype: 'COCMeetingTemplateQualityOfCare'
        }]
    },{
        title: 'LABORATORY INVESTIGATION / IMAGING',
        
        items: [{
            xtype: 'textareafield',
            fieldLabel: 'Issues'
        },{
            xtype: 'textareafield',
            fieldLabel: 'Care Plan'
        }]
    },{
        title: 'DME',
        items: [{
            xtype: 'COCMeetingTemplateDME'
        }]
    },{
        title: 'MEDICAL CARE PLAN',
        items: [{
            xtype: 'textareafield',            
            fieldLabel: 'Plan'
        }]
    }]
});