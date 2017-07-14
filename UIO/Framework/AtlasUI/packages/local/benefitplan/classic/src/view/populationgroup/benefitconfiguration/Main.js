/**
 * Created by l6630 on 10/13/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.Main', {
        extend: 'Ext.form.Panel',
        title: 'Population Group Benefit Configuration',
        alias : 'widget.benefitconfigurationview',
        controller: 'populationgroupbenefitconfiguration',
        viewModel: 'populationgroupbenefitconfiguration',
        atlasId: 0,
        autoScroll: true,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    items: [{
        xtype: 'container',
        reference : 'pageViewRef',
        items: [
            {
                xtype: 'benefitpackagedetails'
            },
            {
                xtype: 'panel',
                reference: 'medicalPlanSection'
            },
            {
                xtype: 'panel',
                reference: 'pharmacyPlanSection'
            }
        ]
    }
    ],
    bbar: [
        { text: 'Savings Account', handler: 'onSavingsAccountClick', bind:{disabled: '{!cansavings}'}},
        { text: 'Workflow History',  handler: 'onWorkflowHistoryClick' },
        { text: 'Publish for Claims Testing', handler: 'onbtnPFCTClick'},
        { text: 'Submit for Approval' , handler: 'onSubmitForApprovalClick', bind:{hidden: '{!popGrpPBPStatusIsDraft}'}},
        { text: 'Make Changes' , handler: 'onMakeChangesClick', bind:{hidden: '{popGrpPBPStatusIsDraft}'}},
        '->',
        { text: 'Cancel', handler : 'onCancel'},
        { text: 'Save', handler : 'onSave', bind: {disabled: '{!validforms || editingmedrow > 0 || editingpharmrow > 0 || onstatuscheck}' } }
    ]
});