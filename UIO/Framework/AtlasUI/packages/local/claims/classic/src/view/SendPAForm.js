/**
 * Created by T4317 on 11/9/2016.
 */
Ext.define('Atlas.claims.view.SendPAForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'sendpaForm',
    //Use object notation. This is needed because at the creation time we specify viewmodel config with parent
    //This way the content will be merged, rather than overwritten
    controller: 'sendpacontroller',
    layout: 'vbox',
    align: 'stretch',
    width: '100%',
    height: '100%',
    listeners: {
        boxready: 'onBoxReady'
    },
    items: [{
        xtype: 'form',
        itemId: 'faxForm',
        width: '100%',
        height: '100%',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'prescribertypeahead',
            fieldLabel: 'Prescriber',
            width: '98%',
            labelWidth: 150,
            emptyText: '[e.g. Dr. Smith]',
            itemId: 'cbxPrescriber',
            displayField: 'fullname',
            valueField: 'npi',
            allowBlank: false,
            forceSelection: true
        }, {
            xtype: 'drugtypeahead',
            itemId: 'cbxMedication',
            fieldLabel: 'Medication',
            width: '98%',
            labelWidth: 150,
            emptyText: '[e.g. Nexium]',
            displayField: 'LN',
            valueField: 'NDC',
            allowBlank: false,
            forceSelection: true
        }, {
            xtype: 'container',
            layout: 'hbox',
            align: 'stretch',
            flex: 1,
            width: '98%',
            items: [{
                xtype: 'textfield',
                itemId: 'faxNumber1',
                labelWidth: 150,
                flex: 6.5,
                fieldLabel: 'Prescriber',
                maxLength: 3,
                minLength: 3,
                maskRe: /[0-9]/,
                allowBlank: false,
                enforceMaxLength: 3
            }, {
                xtype: 'textfield',
                itemId: 'faxNumber2',
                flex: 2,
                maxLength: 3,
                minLength: 3,
                maskRe: /[0-9]/,
                allowBlank: false,
                enforceMaxLength: 3
            }, {
                xtype: 'textfield',
                itemId: 'faxNumber3',
                flex: 2.5,
                maxLength: 4,
                minLength: 4,
                maskRe: /[0-9]/,
                allowBlank: false,
                enforceMaxLength: 4
            }]
        }, {
            xtype: 'textarea',
            itemId: 'message',
            labelWidth: 150,
            width: '98%',
            fieldLabel: 'Notes for Coverage Page'
        }],
        bbar: {
            xtype: 'toolbar',
            items: [
                '->',
                {
                    text: 'Preview',
                    handler: 'onPreview'
                }, {
                    text: 'Send Fax',
                    handler: 'onSendFax'
                }, {
                    text: 'Cancel',
                    handler: 'onCancel'
                }
            ]
        }
    }]
});