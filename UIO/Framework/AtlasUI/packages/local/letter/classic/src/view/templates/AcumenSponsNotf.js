/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.AcumenSponsNotf', {
    extend: 'Ext.form.FieldSet',
    xtype: 'AcumenSponsNotf',
    itemId: 'fsTemplate',
    title: 'Acumen Sponsor Notification Letter Template',
    region: 'center',
    autoScroll:true,
    layout: {
        type: 'vbox',
        align: 'fix'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        labelAlign: 'left',
        labelWidth: 150,
        width: '90%'
    },
    items: [
        {fieldLabel: 'Successor Sponsor', itemId: 'Freetext1', name: 'Freetext1', allowBlank: false},
        {fieldLabel: 'Enrolled In', itemId: 'Freetext2', name: 'Freetext2', allowBlank: false},
        {
            fieldLabel: 'Effective Date',
            itemId: 'Freetext3',
            name: 'Freetext3',
            allowBlank: false,
            xtype: 'datefield',
            format: 'm/d/Y'
        },
        {fieldLabel: 'Dosage', itemId: 'Freetext4', name: 'Freetext4', allowBlank: false},
        {fieldLabel: 'Drug Name', itemId: 'Freetext5', name: 'Freetext5', allowBlank: false},
        {
            fieldLabel: 'Days',
            itemId: 'Freetext6',
            name: 'Freetext6',
            allowNegative: false,
            allowDecimals: false,
            minValue: 0,
            maxValue: '9999',
            allowBlank: false,
            xtype: 'numberfield'
        },
        {
            xtype: 'combo',
            itemId: 'Freetext7',
            name: 'Freetext7',
            fieldLabel: 'Records Included',
            queryMode: 'local',
            multiSelect: true,
            forceSelection: true,
            valueField: 'ListItem',
            displayField: 'ListDescription',
            allowBlank: false,
            triggerAction: 'all',
            store: {
                fields: ['ListItem', 'ListDescription'],
                data: [
                    {
                        'ListItem': 'clinical threshold and/or prescription pattern that triggered case management',
                        'ListDescription': 'clinical threshold and/or prescription pattern that triggered case management'
                    },
                    {
                        'ListItem': 'copies of medical records',
                        'ListDescription': 'copies of medical records'
                    },
                    {
                        'ListItem': 'beneficiary drug utilization history',
                        'ListDescription': 'beneficiary drug utilization history'
                    },
                    {
                        'ListItem': 'correspondence with prescribers and the beneficiary',
                        'ListDescription': 'correspondence with prescribers and the beneficiary'
                    },
                    {
                        'ListItem': 'notes documenting telephone conversations',
                        'ListDescription': 'notes documenting telephone conversations'
                    },
                    {
                        'ListItem': 'documentation of the decision arrived at through case management',
                        'ListDescription': 'documentation of the decision arrived at through case management'
                    },
                    {
                        'ListItem': 'description of the beneficiary-specific POS edit that was implemented',
                        'ListDescription': 'description of the beneficiary-specific POS edit that was implemented'
                    }
                ]
            },
            listConfig: {
                getInnerTpl: function () {
                    return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {ListItem} </div>';
                }
            }
        },
        {fieldLabel: 'Case Manager', itemId: 'Freetext8', name: 'Freetext8', allowBlank: false},
        {
            fieldLabel: 'Phone Number',
            itemId: 'Freetext9',
            name: 'Freetext9',
            maskRe: /[0-9]/,
            maxLength: 14,
            enforceMaxLength: 14,
            minLength: 14,
            enableKeyEvents: true,
            allowBlank: false,
            listeners: {
                keyup: function (e) {
                    var val = e.rawValue;
                    this.setValue(Atlas.common.Util.formatPhone(val));
                }
            }
        }
    ]
});