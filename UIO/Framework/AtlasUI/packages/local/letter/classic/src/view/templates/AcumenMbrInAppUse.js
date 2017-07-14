/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.AcumenMbrInAppUse', {
    extend: 'Ext.form.FieldSet',
    xtype: 'AcumenMbrInAppUse',
    itemId: 'fsTemplate',
    title: 'Acumen Member Letter Template - Inappropriate Use',
    region: 'center',
    autoScroll:true,
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 160,
        width: '80%'
    },
    items: [
        {
            xtype: 'combobox',
            itemId: 'Freetext1',
            name: 'Freetext1',
            fieldLabel: 'Communication Type',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: false,
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'Value'],
                data : [
                    {'ListItem': 'After communicating with your doctors who have prescribed this pain medication',
                     'ListDescription': 'After communicating with your doctors who have prescribed this pain medication'},
                    {'ListItem': 'Because, after multiple attempts, we weren\'t able to reach the doctors who prescribed this pain medication',
                     'ListDescription': 'Because, after multiple attempts, we weren\'t able to reach the doctors who prescribed this pain medication'}
                ]
            }
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext2',
            name: 'Freetext2',
            fieldLabel: 'Appropriate Medication',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: false,
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'Value'],
                data : [
                    {'ListItem': 'Only the following',
                     'ListDescription': 'Only the following'},
                    {'ListItem': 'No',
                     'ListDescription': 'No'}
                ]
            }
        },
        {
            xtype: 'combobox',
            itemId: 'Freetext3',
            name: 'Freetext3',
            fieldLabel: 'Covered',
            displayField: 'ListDescription',
            valueField: 'ListItem',
            dataIndex: 'ListItem',
            matchFieldWidth: false,
            forceSelection: true,
            allowBlank: false,
            queryMode: 'local',
            store: {
                fields: ['ListItem', 'Value'],
                data : [
                    {'ListItem': 'Only the pain medication below',
                     'ListDescription': 'Only the pain medication below'},
                    {'ListItem': 'No pain medication',
                     'ListDescription': 'No pain medication'}
                ]
            }
        },
        { fieldLabel: 'Dosage', itemId: 'Freetext4',name: 'Freetext4', allowBlank: false },
        { fieldLabel: 'Drug Name', itemId: 'Freetext5',name: 'Freetext5', allowBlank: false },
        { fieldLabel: 'Days', itemId: 'Freetext6',name: 'Freetext6', allowBlank: false,maskRe: /[0-9]/ },
        { fieldLabel: 'Case Manager Name', itemId: 'Freetext7',name: 'Freetext7', allowBlank: false },
        { fieldLabel: 'Phone Number', itemId: 'Freetext8',name: 'Freetext8' ,  maxLength: 14, allowBlank: false,
            enforceMaxLength: 14,
            minLength: 14,
            enableKeyEvents: true,
            listeners:{
                keyup:function(e) {
                    var val = e.rawValue;
                    this.setValue(Atlas.common.Util.formatPhone(val));
                }
            } },
        { fieldLabel: 'CC', itemId: 'Freetext9',name: 'Freetext9', allowBlank: false },
        { fieldLabel: ' ',labelSeparator : "",  itemId: 'Freetext10',name: 'Freetext10' },
        { fieldLabel: ' ',labelSeparator : "",  itemId: 'Freetext11',name: 'Freetext11' },
        { fieldLabel: ' ',labelSeparator : "",  itemId: 'Freetext12',name: 'Freetext12' },
        { fieldLabel: 'CMS Account Manager', itemId: 'Freetext13',name: 'Freetext13', allowBlank: false },
        { fieldLabel: 'Physician Name', itemId: 'Freetext14',name: 'Freetext14', allowBlank: false }
    ]
});