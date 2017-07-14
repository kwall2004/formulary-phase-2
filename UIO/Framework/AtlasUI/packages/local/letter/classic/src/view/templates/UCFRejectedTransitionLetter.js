/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.UCFRejectedTransitionLetter', {
    extend: 'Ext.panel.Panel',
    xtype: 'UCFRejectedTransitionLetter',
    itemId: 'fsTemplate',
    title: 'UCF Rejected Claim Letter Template',
    autoScroll: true,
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fix'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 200,
        width:'50%'
    },
    items: [
        {
            fieldLabel: 'Reject Code',
            name: 'Freetext1',
            itemId: 'Freetext1',
            allowBlank:false

        },
        {
            fieldLabel: 'Reject Status',
            name: 'Freetext2',
            itemId: 'Freetext2',
            allowBlank:false
        },
        {
            fieldLabel: 'MeridianRx Contact Phone',
            name: 'Freetext3',
            itemId: 'Freetext3',
            displayValue: '1-866-984-6462',
            maxLength: 20,
            enforceMaxLength: 20,
            allowBlank:false
        },
        {
            fieldLabel: 'Year',
            name: 'Freetext4',
            itemId: 'Freetext4',
            allowBlank:false
        }
    ]
});