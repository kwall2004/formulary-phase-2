/**
 * This Class represents the State License Add Poppup of the Credentialing Pharmacy Tab
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.StateLicenseAddWin', {
    extend: 'Ext.window.Window',
    title: 'State Licenses',
    width: 500,
    items: [
        {
            xtype: 'form',
            reference: 'stateLicAddFormRef',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'top'
            },
            defaults: {
                width: 380,
                labelWidth: 150,
                padding: 5
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'State',
                    reference: 'cbStateCode',
                    name: 'LicenseStateCode',
                    bind: {
                        store: '{stateslist}'
                    },
                    allowBlank : false,
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'value'
                },

                {
                    xtype: 'datefield',
                    fieldLabel: 'Expiration Date',
                    name: 'stateLicenseExpDate',
                    format:'m/d/Y'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Verification Date',
                    format: 'm/d/Y',
                    name: 'stateLicenseVerfDate'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'License Number',
                    name: 'stateLicenseNumber'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'OIG Action',
                    name: 'OIGAction',
                    bind: {
                       // store: '{yesnona}'
                        store:['Yes','No']
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'OIG  Date',
                    format: 'm/d/Y',
                    name: 'OIGDate'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'SAM Action',
                    name: 'SAMAction',
                    bind: {
                        store:['Yes','No']
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'SAM  Date',
                    name: 'SAMDate',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Delete  Date',
                    name: 'deleteDate',
                    format: 'm/d/Y'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'State License Desc Action',
                    name: 'stateLicenseDisAction'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    handler: 'doSaveStateLicense'
                },
                {
                    text: 'Cancel',
                    handler: function (btn) {
                        btn.up('window').close()
                    }
                }
            ]
        }
    ]
});