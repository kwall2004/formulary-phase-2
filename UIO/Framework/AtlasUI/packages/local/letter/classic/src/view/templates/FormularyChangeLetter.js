/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.FormularyChangeLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'FormularyChange',
    title: 'Formulary Change Letter Template',
    itemId: 'fsTemplate',
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
        labelWidth: 150,
        width: '50%'
    },
    items: [
        {
            xtype: 'datefield',
            fieldLabel: 'Effective Date',
            itemId: 'Freetext1',
            name: 'Freetext1',
            format: 'm/d/Y',
            allowBlank: false,
            width: '25%'
        },
        {
            fieldLabel: 'Name of Drug',
            itemId: 'Freetext2',
            name: 'Freetext2',
            allowBlank: false
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext3',
            name: 'Freetext3',
            fieldLabel: 'This Drug',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            queryMode: 'local',
            allowBlank: false,
            forceSelection: true,
            store: {
                fields: ['ListItem', 'ListDescription'],
                data: [
                    {
                        "ListItem": "is being removed from the formulary",
                        "ListDescription": "is being removed from the formulary"
                    },
                    {
                        "ListItem": "there has been a change to the preferred or tiered cost sharing status for",
                        "ListDescription": "there has been a change to the preferred or tiered cost sharing status for"
                    }
                ]
            }
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext4',
            name: 'Freetext4',
            fieldLabel: 'Change Type',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            allowBlank: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'ListDescription'],
                data: [
                    {
                        "ListItem": "removing",
                        "ListDescription": "removing"
                    },
                    {
                        "ListItem": "changing the tiering structure of",
                        "ListDescription": "changing the tiering structure of"
                    }
                ]
            }
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Change Reason',
            itemId: 'Freetext5',
            name: 'Freetext5',
            height: 120,
            allowBlank: false
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext6',
            name: 'Freetext6',
            fieldLabel: 'This Alternative Drug',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: true,
            queryMode: 'local',
            allowBlank: false,
            forceSelection: true,
            store: {
                fields: ['ListItem', 'ListDescription'],
                data: [
                    {
                        "ListItem": "is on our formulary ",
                        "ListDescription": "is on our formulary "
                    },
                    {
                        "ListItem": "is in the same drug tier",
                        "ListDescription": "is in the same drug tier"
                    }
                ]
            }
        },
        {
            fieldLabel: 'Alternative Drug(s)',
            xtype: 'textarea',
            itemId: 'Freetext7',
            name: 'Freetext7',
            height: 120,
            allowBlank: false
        },
        {
            fieldLabel: 'Expected Cost',
            itemId: 'Freetext8',
            name: 'Freetext8',
            allowBlank: false
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext9',
            name: 'Freetext9',
            fieldLabel: 'Exception Type',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: true,
            queryMode: 'local',
            allowBlank: false,
            forceSelection: true,
            store: {
                fields: ['ListItem', 'ListDescription'],
                data: [
                    {
                        "ListItem": "an exception to our formulary",
                        "ListDescription": "an exception to our formulary"
                    },
                    {
                        "ListItem": "a tiering exception",
                        "ListDescription": "a tiering exception"
                    }
                ]
            }
        },
        {
            fieldLabel: 'Exception Filling Process',
            xtype: 'textarea',
            itemId: 'Freetext10',
            name: 'Freetext10',
            height: 120,
            allowBlank: false
        }
    ]
});