/* ...  */
Ext.define('Atlas.letter.view.templates.HRMMbrAwarenessLetters', {
    extend: 'Ext.form.FieldSet',
    xtype: 'HRMMbrAwarenessLetters',
    itemId: 'fsTemplate',
    autoScroll: true,
    //title: 'HRM Member Awareness Letters Template',
    title: 'Letter Template',
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fit'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        width:'50%'
    },
    items: [
        {fieldLabel: 'Alternative Medication',  allowBlank:false,itemId: 'Freetext1', name: 'Freetext1'},
        {fieldLabel: 'Alternative Medication 2', itemId: 'Freetext2', name: 'Freetext2'},
        {fieldLabel: 'Side effect 1', itemId: 'Freetext3', allowBlank:false,name: 'Freetext3'},
        {fieldLabel: 'Side effect 2', itemId: 'Freetext4', name: 'Freetext4'}
    ]
});