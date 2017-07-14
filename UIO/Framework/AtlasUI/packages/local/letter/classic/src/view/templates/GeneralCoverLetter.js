/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.GeneralCoverLetter', {
    extend: 'Ext.form.FieldSet',    // If panel changes, Freetext1 needs to be changed too
    xtype: 'GeneralCoverLetter',
    itemId: 'fsTemplate',
    title: 'General Cover Letter Template',
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fix'
    },

    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 200,
        width: '50%'
    },
    items: [
        {
            fieldLabel: 'Cover Letter Type',
            xtype: 'combobox',
            itemId: 'Freetext1',
            name: 'Freetext1',
            //emptyText: '[Select Cover Letter Type]',
            displayField: 'name',
            valueField: 'value',
            dataIndex: 'value',
            matchFieldWidth: true,
            queryMode: 'local',
            allowBlank: false,
            bind: {
                store: '{generalcoverlettertypedata}',
                value: '{vmGeneralCoverLetter.freetext1}'
            },
            listeners: {
                change: function (combobox) {
                    var me = this;
                    if (me.up('panel') != undefined && me.up('panel').down('#Freetext2') != undefined) {
                        me.up('panel').down('#Freetext2').setValue(combobox.getDisplayValue());
                    }
                }
            }
        },
        {
            fieldLabel: 'Selected Cover Letter Type',
            itemId: 'Freetext2',
            name: 'Freetext2',
            allowBlank: false
        },
        {xtype: 'hiddenfield', itemId: 'Freetext3', name: 'Freetext3'},
        {xtype: 'hiddenfield', itemId: 'Freetext4', name: 'Freetext4'},
        {xtype: 'hiddenfield', itemId: 'Freetext5', name: 'Freetext5'}
    ]
});