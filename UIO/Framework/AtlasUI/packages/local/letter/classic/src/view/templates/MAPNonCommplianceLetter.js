/*
 Developer: Tremaine Grant
 Description: A view shows the letter queue.

 */
Ext.define('Atlas.letter.view.templates.MAPNonCommplianceLetter', {
    extend: 'Ext.form.FieldSet',
    xtype: 'MAPNonComplianceLetter',
    itemId: 'fsTemplate',
    autoScroll: true,
    //title: 'MAP Non-Compliance Letter Template',
    title: 'MAP Non-Compliance Letter',
    region: 'center',
    layout: {
        type: 'vbox',
        align: 'fit'
    },
    defaults: {
        xtype: 'textfield',
        isFormField: true,
        allowBlank: false,
        labelAlign: 'left',
        labelWidth: 175,
        width: '50%'
    },
    items: [
        {
            fieldLabel: 'Fax Number',
            itemId: 'Freetext1',
            name: 'Freetext1',
            emptyText: 'xxx-xxx-xxxx',
            maskRe: /[0-9]/,
            maxLength: 12,
            enforceMaxLength: 12,
            minLength: 12,
            enableKeyEvents: true,
            listeners: {
                keyup: function (e) {
                    var val = e.rawValue;
                    this.setValue(Atlas.common.Util.formatfax(val));
                }
            }
        },
        {
            fieldLabel: 'Discontinue Drug',
            itemId: 'Freetext2',
            name: 'Freetext2'
        },
        {
            fieldLabel: 'Member Recevied Drug',
            itemId: 'Freetext3',
            name: 'Freetext3'
        },
        {
            fieldLabel: 'Pharmacist Title',
            itemId: 'Freetext4',
            name: 'Freetext4'
        },
        {
            fieldLabel: 'Pharmacist Name',
            itemId: 'Freetext5',
            name: 'Freetext5'
        },
        {
            fieldLabel: 'Pharmacist Phone Number',
            itemId: 'Freetext6',
            name: 'Freetext6',
            emptyText: '(xxx) xxx-xxxx',
            maskRe: /[0-9]/,
            maxLength: 14,
            enforceMaxLength: 14,
            minLength: 14,
            enableKeyEvents: true,
            listeners: {
                keyup: function (e) {
                    var val = e.rawValue;
                    this.setValue(Atlas.common.Util.formatPhone(val));
                }
            }

        }
    ]
});