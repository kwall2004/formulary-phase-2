/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.TransitionLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'TransitionLetter',
    title: 'Transition Letter Template <span style="color: #ff0000">(These fields are required only for Medicare)</span>',
    itemId: 'fsTemplate',
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
            xtype: 'combobox',
            itemId: 'Freetext1',
            forceSelection:true,
            name: 'Freetext1',
            fieldLabel: 'Fill Type',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'ListDescription'],
                data : [
                    {"ListItem":"temporary", "ListDescription":"temporary"},
                    {"ListItem":"limited", "ListDescription":"limited"}
                ]
            }
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext2',
            name: 'Freetext2',
            forceSelection:true,
            fieldLabel: 'Enrollee Status',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: false,
            queryMode: 'local',
            store: {
            fields: ['ListItem', 'ListDescription'],
            data : [
                {"ListItem":"new enrollee", "ListDescription":"new enrollee"},
                {"ListItem":"current enrollee who has remained with our plan this year",
                    "ListDescription":"current enrollee who has remained with our plan this year"}
            ]
        }
        },
        {
            fieldLabel: 'Transition Type',
            xtype: 'combobox',
            itemId: 'Freetext3',
            name: 'Freetext3',
            //emptyText: '[Select Transition Type]',
            displayField: 'name',
            valueField: 'value',
            dataIndex: 'value',
            matchFieldWidth: true,
            multiSelect: true,
            forceSelection: true,
            editable: true,
            triggerAction: 'all',
            listConfig: {
                getInnerTpl: function() {
                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {name} </div>';
                }
            },
            queryMode: 'local',
            bind: {
                store: '{transitiontypedata}'
            }
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext4',
            name: 'Freetext4',
            fieldLabel: 'LTC Facility',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            forceSelection:true,
            dataIndex: 'ListItem',
            matchFieldWidth: false,
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'ListDescription'],
                data : [
                    {"ListItem":"Yes", "ListDescription":"Member resides in a LTC facility"},
                    {"ListItem":"No", "ListDescription":"Member does not reside in a LTC facility"}
                ]
            }
        },
        {
            itemId: 'Freetext5',
            name: 'Freetext5',
            fieldLabel: 'Year',
            maskRe: /[0-9]/,
            minLength: 4,
            maxLength: 4,
            enableKeyEvents: true,
            hideTrigger: true,
            keyNavEnabled: false,
            mouseWheelEnabled: false,
            enforceMaxLength: 4
        }
    ]
});