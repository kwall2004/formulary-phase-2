Ext.define('Atlas.admin.view.EDIPartnerInfoForm', {
    extend: 'Ext.window.Window',
    xtype: 'admin-edipartnerinfoform',
    title: 'Add EDI Partner Info',
    controller: 'edipartnerinfoformcontroller',
    viewModel: 'admin_edipartnerinfoformviewmodel',
    defaults: {
        labelWidth: 200,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    width: 400,
    height: 475,
    modal: true,
    items: [
        {
            fieldLabel: 'Partner ID',
            itemId: 'txtpartnerid',
            bind: {value: '{paramRecord.partnerId}'},
            allowBlank: false,
            reference: 'reftxtpartnerid'
        }, {
            fieldLabel: 'Partner Name',
            itemId: 'txtpartnername',
            bind: {value: '{paramRecord.partnerName}'},
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'EDI Path',
            bind: {value: '{paramRecord.ediPath}'},
            itemId: 'txtediPath',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'IP Address',
            bind: {value: '{paramRecord.ipAddress}'},
            itemId: 'txtipAddress',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'EIN',
            bind: {value: '{paramRecord.ein}'},
            itemId: 'txtedi',
            emptyText: '',
            allowBlank: true
        },
        {
            xtype: 'combobox',
            autoLoadOnValue: true,
            itemId: 'txtidQualifier',
            fieldLabel: 'ISA Qualifier',
            emptyText: 'Select a qualifier',
            allowBlank: true,
            bind: {value: '{paramRecord.idQualifier}', store: '{storeQualifier}'},
            displayField: 'name',
            valueField: 'value'
        },
        {
            xtype: 'combobox',
            autoLoadOnValue: true,
            itemId: 'txtplanIdQualifier',
            fieldLabel: 'Plan Qualifier',
            emptyText: 'Select a qualifier',
            allowBlank: true,
            bind: {value: '{paramRecord.planIdQualifier}', store: '{storeQualifier}'},
            displayField: 'name',
            valueField: 'value'
        }
        , {
            fieldLabel: 'MRX ID',
            bind: {value: '{paramRecord.planSubmitterId}'},
            emptyText: '',
            allowBlank: true
        },
        {
            fieldLabel: 'Zip File',
            itemId: 'txtzipfile',
            xtype: 'checkbox',
            flex: 1,
            labelWidth: 210
        }, {
            fieldLabel: 'Input Directory',
            bind: {value: '{paramRecord.inputDir}'},
            itemId: 'txtinputDir',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'Export Directory',
            bind: {value: '{paramRecord.exportDir}'},
            itemId: 'txtexportDir',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'Group Key',
            bind: {value: '{paramRecord.pgpkeyname}'},
            itemId: 'txtgroupkey',
            emptyText: '',
            allowBlank: true
        }, {
            fieldLabel: 'Command',
            bind: {value: '{paramRecord.sendcmd}'},
            itemId: 'txtcommand',
            emptyText: '',
            allowBlank: true
        },
        {
            fieldLabel: 'Send Individual Files',
            itemId: 'chksendIndividualFile',
            xtype: 'checkbox',
            labelWidth: 210
        },
        {
            fieldLabel: 'Send Secure Email',
            xtype: 'checkbox',
            itemId: 'chksendSecureEmail',
            labelWidth: 210
        },
        {
            fieldLabel: 'Send Download Confirmation',
            xtype: 'checkbox',
            itemId: 'chksendDownloadConf',
            labelWidth: 210

        }
    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->',
            {
                xtype: 'button',
                text: 'Save',
                itemId: "btnSave",
                iconCls: 'fa fa-save',
                handler: 'btnSave'
            }, {
                xtype: 'button',
                text: 'Cancel',
                iconCls: 'fa fa-times',
                handler: 'btnCancel'
            }
        ]
    }

});