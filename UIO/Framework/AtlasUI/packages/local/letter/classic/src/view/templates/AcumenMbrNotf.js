/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.AcumenMbrNotf', {
    extend: 'Ext.form.FieldSet',
    xtype: 'AcumenMbrNotf',
    itemId: 'fsTemplate',
    title: 'Acumen Member Notification Letter Template',
    region: 'center',
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        width : '50%'
    },
    items: [
        {
            fieldLabel: 'Case Manager Name',
            itemId: 'Freetext1',
            name: 'Freetext1',
            allowBlank : false
        },
        {
            fieldLabel: 'Phone Number',
            itemId: 'Freetext2',
            name: 'Freetext2',
            allowBlank : false,
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }

        }
    ]
});