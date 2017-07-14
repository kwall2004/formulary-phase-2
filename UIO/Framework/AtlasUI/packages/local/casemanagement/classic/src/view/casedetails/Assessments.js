/**
 * Created by j2560 on 7/11/2016.
 */
Ext.define('Atlas.casemanagement.view.casedetails.Assessments', {
    extend: 'Ext.panel.Panel',
    xtype: 'casemanagementCasedetailsAssessments',
    title: 'Assessments',
    tbar: {
       // xtype: 'casedetailshome'
    },
    items: [{
        xtype: 'panel',
        title: 'Medications Questionnaire',
        defaults: {
            labelWidth: 300
        },
        items: [{
            xtype:'checkboxfield',
            fieldLabel: 'Have medications been prescribed which you did not obtain?'
        }, {
            xtype:'checkboxfield',
            fieldLabel: 'Do you have more than one physician prescribing your medication?'
        }]
    }, {
        xtype: 'panel',
        title: 'Assessment',
        defaults: {
            labelWidth: 300
        },
        items: [{
            xtype:'checkboxfield',
            fieldLabel: 'Have you been to see your physician?'
        }, {
            xtype:'checkboxfield',
            fieldLabel: 'Have you been to the ER?'
        }]
    }]
});