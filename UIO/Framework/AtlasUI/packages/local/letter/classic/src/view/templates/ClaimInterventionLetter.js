/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.ClaimInterventionLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'ClaimInterventionLetter',
    itemId: 'fsTemplate',
    title: 'Claim Intervention Letter Template',
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
        labelWidth: 150,
        width:'50%'
    },
    items: [
        {
            fieldLabel: 'Denied Service/GCN',
            itemId: 'Freetext1',
            name: 'Freetext1',
            allowBlank: false
        },
        {
            fieldLabel: 'Free Text',
            itemId: 'Freetext2',
            name: 'Freetext2',
            xtype:'textareafield',
            allowBlank: false
        },
        {
            fieldLabel: 'Year',
            itemId: 'Freetext3',
            name: 'Freetext3',
            xtype: 'numberfield',
            allowBlank: false,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enforceMaxLength: 4,
            enableKeyEvents: true,
            minLength: 4,
            listeners:{
                keyup:function(e) {
                    var val = e.rawValue;
                   this.setValue(val.substring(0, 4));
                }
            }
        },
        {
            fieldLabel: 'Rejection Message',
            itemId: 'Freetext4',
            name: 'Freetext4',
            allowBlank: false
        }
    ]
});