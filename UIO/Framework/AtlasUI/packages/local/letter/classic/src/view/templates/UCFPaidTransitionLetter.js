/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.UCFPaidTransitionLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'UCFPaidTransitionLetter',
    itemId: 'fsTemplate',
    title: 'UCF Paid Claim Letter Template',
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
            fieldLabel: 'MeridianRx Contact Phone',
            itemId: 'Freetext1',
            name: 'Freetext1',
            maxLength: 20,
            enforceMaxLength: 20,
            allowBlank:false,
            displayValue: '1-866-984-6462',
            value:'1-866-984-6462'
        }
    ]
});