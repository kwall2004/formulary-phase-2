/**
 * This Class represents the NTIS info Tab within the Pharmacy Information tab of Pharmacy Credentialing Module
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.pharmacy.NtisInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.pharmacy-ntisinfo',
    reference: 'ntisInfoFormRef',
    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'top'
    },
    items: [
        {
            xtype: 'panel',
            flex: 1,
            overflowY: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: 20,
            defaults: {
                width: '90%',
                labelWidth: 140,
                padding: 5,
                disabled: true
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'NTIS DEA Number',
                    name: 'NTISDeaNum'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'DEA Exp. Date [NTIS]',
                    name: 'NTISDeaExp',
                    format : 'm/d/Y'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Business Acct. Code',
                    name: 'NTISBusActCode'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Business Acct. Subcode',
                    name: 'NTISBusActSubCode'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Drug Schedule',
                    name: 'NTISDrugSchedule'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Name',
                    name: 'NTISName'
                }
            ]
        },
        {
            xtype: 'panel',
            flex: 1,
            overflowY: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            padding: 20,
            defaults: {
                width: '90%',
                labelWidth: 120,
                padding: 5,
                disabled: true
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: "Add'l Company Info",
                    name: 'NTISAddlCompanyInfo'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Address 1',
                    name: 'NTISAddress1'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'Address 2',
                    name: 'NTISAddress2'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'City',
                    name: 'NTISCity'
                },

                {
                    xtype: 'textfield',
                    fieldLabel: 'State',
                    name: 'NTISState'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Zip Code',
                    name: 'NTISZip'
                }
            ]
        }

    ]
});