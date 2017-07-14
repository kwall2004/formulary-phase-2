/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.ExcludedProviderLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'ExcludedProviderLetter',
    itemId: 'fsTemplate',
    title: 'Excluded Provider Letter Template',
    iconCls: 'icon-contactlog,8',
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
        labelWidth: 200,
        width:'50%'
    },
    items: [
        {
            xtype: 'datefield',
            fieldLabel: 'Effective Date of OIG Exclusion',
            itemId: 'Freetext1',
            name: 'Freetext1',
            format : 'm/d/Y',
            allowBlank : false
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Exclusion Type',
            itemId: 'Freetext2',
            name: 'Freetext2',
          //  emptyText: '[Select Exclusion Type]',
            displayField: 'name',
            valueField: 'id',
            dataIndex: 'id',
            matchFieldWidth: true,
            queryMode: 'local',
            allowBlank : false,
            store: {
                fields: [
                    'name', 'id'
                ],
                data: [
                    {"id": "", "name": ""},
                    {"id": "dispensed", "name": "dispensed"},
                    {"id": "prescribed", "name": "prescribed"}
                ]
            },
            listeners : {
                change : 'cbxExclusionChange'
            }
        },
        {
            fieldLabel: 'Prescriber/Pharmacy Name',
            itemId: 'Freetext3',
            name: 'Freetext3',
            allowBlank : false
        },{
            fieldLabel: 'Year',
            itemId: 'Freetext4',
            name: 'Freetext4',
            allowBlank : false,
            maskRe: /[0-9]/,
            minLength: 4,
            maxLength: 4,
            enforceMaxLength: 4
        }
    ]
});