/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.AcumenMbrAppUse', {
    extend: 'Ext.form.FieldSet',
    xtype: 'AcumenMbrAppUse',
    itemId: 'fsTemplate',
    title: 'Acumen Member Letter Template - Appropriate Use',
    region: 'center',
    margin: '5px',
    height: '100%',
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150
    },
    items: [
        { fieldLabel: 'Case Manager Name', itemId: 'Freetext1',name: 'Freetext1', allowBlank: false },
        { fieldLabel: 'Phone Number', itemId: 'Freetext2',name: 'Freetext2' ,   maxLength: 14, allowBlank: false,
            enforceMaxLength: 14,
            minLength: 14,
            enableKeyEvents: true,
            listeners:{
                keyup:function(e) {
                    var val = e.rawValue;
                    this.setValue(Atlas.common.Util.formatPhone(val));
                }
            }},
        { fieldLabel: 'CC', itemId: 'Freetext3',name: 'Freetext3', allowBlank: false },
        { fieldLabel: ' ',labelSeparator : "", itemId: 'Freetext4',name: 'Freetext4' },
        { fieldLabel: ' ', labelSeparator : "", itemId: 'Freetext5',name: 'Freetext5' },
        { fieldLabel: ' ', labelSeparator : "",itemId: 'Freetext6',name: 'Freetext6' }
    ]
});