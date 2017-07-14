/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.DefaultLetterTemplate', {
    extend: 'Ext.form.FieldSet',
    xtype: 'DefaultLetterTemplate',
    title: '',
    iconCls: 'icon-contactlog,8',
    itemId: 'fsTemplate',
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        allowBlank: false
    },
    items: [
        { fieldLabel: 'No Template Available', itemId: 'Freetext1',name: 'Freetext1',hidden:true }
    ]
});