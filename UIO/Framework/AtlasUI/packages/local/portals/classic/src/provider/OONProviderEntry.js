/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request - OON Entry
 * Description: Gives users a place to enter OON data
 */
Ext.define('Atlas.portals.view.provider.OONProviderEntry', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderOONEntry',
    controller: 'portalsProviderOONEntryController',

    bbar: ['->',{
        xtype:'button',
        text: 'OK',
        handler: 'onOkClick'
    }],

    items:[{
        xtype: 'form',
        cls: 'formPanel',
        padding: 5,
        reference: 'portalsProviderOONEntryForm',

        defaults: {
            labelWidth: 154
        },

        items:[{
            xtype:'textfield',
            fieldLabel: 'Provider Name',
            allowBlank: false,
            reference: 'OONProviderNameRef'
        },{
            xtype: 'numberfield',
            fieldLabel: 'NPI Number',
            reference: 'OONNPINumber',
            bind: '{OONProvider.npi}'
        },{
            xtype:'textfield',
            fieldLabel: 'Practice Name',
            reference: 'OONPracticeNameRef'
        },{
            xtype:'textfield',
            fieldLabel: 'Practice Address',
            allowBlank: false,
            reference: 'OONPracticeAddressRef',
            bind: '{OONProvider.Address1}'
        },{
            xtype:'textfield',
            fieldLabel: 'Practice Address#2',
            reference: 'OONPracticeAddress2Ref',
            bind: '{OONProvider.Address2}'
        },{
            xtype:'textfield',
            fieldLabel: 'City',
            allowBlank: false,
            reference: 'OONCityRef',
            bind: '{OONProvider.City}'
        },{
            xtype:'container',
            layout: 'hbox',

            defaults: {
                labelWidth: 75
            },

            items:[{
                xtype:'combo',
                fieldLabel: 'State',
                allowBlank: false,
                reference: 'stateCombo',
                bind: '{OONProvider.State}'
            },{
                xtype:'textfield',
                fieldLabel: 'Zip',
                allowBlank: false,
                reference: 'OONZipRef',
                bind: '{OONProvider.Zip}',
                minLength: 5
            }]
        },{
            xtype:'textfield',
            fieldLabel: 'Phone',
            labelWidth: 75,
            allowBlank: false,
            reference: 'OONPhoneRef',
            bind: '{OONProvider.Phone}'
        },{
            xtype:'textfield',
            fieldLabel: 'Fax',
            labelWidth: 75,
            reference: 'OONFaxRef',
            bind: '{OONProvider.Fax}'
        },{
            xtype:'combo',
            fieldLabel: 'Reason for OON Provider',
            allowBlank: false,
            reference: 'OONReasonRef',
            displayField: 'key',
            queryMode: 'local',
            valueField: 'value'
        }]
    }]
});