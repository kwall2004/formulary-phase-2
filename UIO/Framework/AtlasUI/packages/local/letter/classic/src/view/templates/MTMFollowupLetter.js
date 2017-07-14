/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.MTMFollowupLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'MTMFollowupLetter',
    itemId: 'fsTemplate',
    title: 'MTM Followup Letter Template',
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
        labelWidth: 160,
        width: '50%'
    },
    items: [
        {
            xtype: 'textarea',
            fieldLabel: 'Pharmacist Suggestions',
            itemId: 'Freetext1',
            name: 'Freetext1',
            allowBlank: false,
            height: 120
        },
        {
            fieldLabel: 'Pharmacist Title',
            itemId: 'Freetext3',
            allowBlank: false,
            name: 'Freetext3'
        },
        {
            xtype: 'hiddenfield',
            itemId: 'Freetext4',
            isFormField: false,
            name: 'Freetext4'
        },
        {
            xtype: 'hiddenfield',
            itemId: 'Freetext5',
            isFormField: false,
            name: 'Freetext5'
        }
    ]
});