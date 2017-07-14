/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.AcumenPvdNotf', {
    extend: 'Ext.form.FieldSet',
    xtype: 'AcumenPvdNotf',
    itemId: 'fsTemplate',
    title: 'Acumen Provider Notification Letter Template',
    region: 'center',
    autoScroll:true,
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
        {
            xtype: 'prescribertypeahead',
            itemId: 'Freetext1',
            name: 'Freetext1',
            fieldLabel: 'Prescriber:',
            displayField: 'fullname',
            reference:'prescId',
            emptyText:'[Prescriber Name]',
            valueField: 'npi',
            allowBlank : false,
            forceSelection : true,
            listeners : {
                blur: 'freetext_blur'
            }
        },
        {
            xtype: 'drugtypeahead',
            itemId: 'Freetext2',
            name: 'Freetext2',
            fieldLabel: 'Medication 1:',
            emptyText: '[e.g. Nexium]',
            valueField:'NDC',
            displayField: 'LN',
            allowBlank : false,
            forceSelection : true,
            listeners : {
                blur: 'freetext_blur'
            }
        },
        {
            xtype: 'drugtypeahead',
            itemId: 'Freetext3',
            name: 'Freetext3',
            fieldLabel: 'Medication 2:',
            emptyText: '[e.g. Nexium]',
            valueField:'NDC',
            displayField: 'LN',
            allowBlank : false,
            forceSelection : true,
            listeners : {
                blur: 'freetext_blur'
            }
        },
        {
            xtype: 'drugtypeahead',
            itemId: 'Freetext4',
            name: 'Freetext4',
            fieldLabel: 'Medication 3:',
            emptyText: '[e.g. Nexium]',
            valueField:'NDC',
            displayField: 'LN',
            allowBlank : false,
            forceSelection : true,
            listeners : {
                blur: 'freetext_blur'
            }
        },
        {
            xtype: 'drugtypeahead',
            itemId: 'Freetext5',
            name: 'Freetext5',
            fieldLabel: 'Medication 4:',
            emptyText: '[e.g. Nexium]',
            valueField:'NDC',
            displayField: 'LN',
            allowBlank : false,
            forceSelection : true,
            listeners : {
                blur: 'freetext_blur'
            }
        },
        {fieldLabel: 'Physician Name', itemId: 'Freetext6', name: 'Freetext6',
            allowBlank : false},
        {
            fieldLabel: 'Phone Number',
            itemId: 'Freetext7',
            name: 'Freetext7',
            vtype: 'phone',
            plugins: {
                ptype: 'phonenumberformatter'
            },
            allowBlank : false
        }
    ]
});