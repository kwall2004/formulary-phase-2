/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.HRMPvdrAwarenessLetters', {
    extend: 'Ext.form.FieldSet',
    xtype: 'HRMPvdrAwarenessLetters',
    itemId: 'fsTemplate',
    //title: 'HRM Provider Awareness Letters Template',
    title: 'Letter Template',
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fix'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        width:'50%'
    },
    items: [
        {fieldLabel: 'Alternative Medication', itemId: 'Freetext1', allowBlank:false, name: 'Freetext1'},
        {fieldLabel: 'Alternative Medication 2', itemId: 'Freetext2', name: 'Freetext2'}
    ]
});