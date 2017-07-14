/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.MTMInvitationLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'MTMInvitationLetter',
    title: 'MTM Invitation Letter',
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
        width: '50%'
    },
    items: [
        {
            fieldLabel: 'Pharmacist Title',
            itemId: 'Freetext1',
            name: 'Freetext1',
            allowBlank: false
        },
        {
            fieldLabel: 'Pharmacist Phone',
            itemId: 'Freetext2',
            name: 'Freetext2',
            allowBlank: false,
            maskRe: /[0-9]/,
            maxLength: 14,
            enforceMaxLength: 14,
            minLength: 14,
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }
        }
    ]
});