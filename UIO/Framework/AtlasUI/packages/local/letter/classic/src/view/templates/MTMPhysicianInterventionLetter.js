/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.MTMPhysicianInterventionLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'MTMPhysicianInterventionLetter',
    itemId: 'fsTemplate',
    title: 'MTM Physician Intervention Letter Template',
    autoScroll: true,
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fit'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 175,
        width:'50%'
    },
    items: [
        {
            xtype: 'prescribertypeahead',
            name: 'Freetext1',
            itemId: 'Freetext1',
            fieldLabel: 'Prescriber',
            reference:'prescId',
            allowBlank: false,
            emptyText:'[Prescriber Name]',
            listeners: {
                select: function(prescriber,b,c,d) {
                    prescriber.setValue(prescriber.lastSelection[0].data.fullname);
                }
            }
        },
        {
            fieldLabel: 'Pharmacist Name',
            itemId: 'Freetext2',
            allowBlank: false,
            name: 'Freetext2'
        },
        {
            fieldLabel: 'Pharmacist Title',
            itemId: 'Freetext3',
            allowBlank: false,
            name: 'Freetext3'
        },{
            fieldLabel: 'Pharmacist Phone',
            itemId: 'Freetext4',
            name: 'Freetext4',
            allowBlank: false,
            maxLength: 14,
            maskRe: /[0-9]/,
            enforceMaxLength: 10,
            minLength: 14,
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            }
        }
    ]
});