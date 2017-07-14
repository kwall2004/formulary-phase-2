// k3279 - Kevin Tabasan - 02/07/2017

Ext.define('Atlas.portals.view.provider.admin.UserPreferences', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userhpprovider',
    viewModel: 'userhpprovider',
    controller: 'userhpprovider',
    scrollable: true,

	dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: ['->',{
            text: 'Save Preferences',
            handler: 'onSaveClick'
        },{
            text: 'Change Password',
            handler: 'onChangePasswordClick'
        },{
            text: 'Change Secret Questions',
            handler: 'onChangeSecretQAClick'
        },{
            text: 'Clear',
            handler: 'onClearClick'
        },{
            text: 'Cancel',
            handler: 'onCancelClick'
        },'->']
    }],

    items: [{
        xtype: 'fieldset',
        hidden: true,
        title: 'Default Report Output',
        layout: 'hbox',

        items: [{
            xtype: 'radiofield',
            name: 'radioOutput',
            reference: 'outputScreen',
            fieldLabel: 'Output to Screen'
        },{
            xtype: 'radiofield',
            name: 'radioOutput',
            reference: 'outputPDF',
            fieldLabel: 'Output to PDF'
        }]
    },{
        xtype: 'form',
        title: 'General Information',
        cls: 'card-panel',
        reference: 'userInformationForm',

        defaults: {
            xtype: 'textfield',
            labelWidth: 124,
            width: 350
        },

        items: [{
            fieldLabel: 'Username',
            bind: '{userPrefs.username}',
            readOnly: true
        },{
            fieldLabel: 'Provider ID',
            bind: '{userPrefs.providerGroupID}',
            readOnly: true
        },{
            fieldLabel: 'Provider Group',
            bind: '{userPrefs.providerGroupDesc}',
            readOnly: true
        }, {
            fieldLabel: 'First Name',
            name: 'firstName',
            bind: '{userPrefs.firstName}',
            allowBlank: false
        },{
            fieldLabel: 'Last Name',
            name: 'lastName',
            bind: '{userPrefs.lastName}',
            allowBlank: false
        },{
            fieldLabel: 'Address 1',
            name: 'address1',
            bind: '{userPrefs.address1}'
        },{
            fieldLabel: 'Address 2',
            name: 'address2',
            bind: '{userPrefs.address2}'
        },{
            fieldLabel: 'City',
            name: 'city',
            bind: '{userPrefs.city}'
        },{
            xtype: 'container',
            layout: 'hbox',
            width: '100%',

            items: [{
                xtype: 'combobox',
                name: 'state',
                fieldLabel: 'State',
                labelWidth: 124,
                width: 350,
                editable: false,
                selectOnFocus: false,
                reference: 'stateCombo',
                bind: {
                    store: '{statesParsed}',
                    value: '{userPrefs.state}'
                },
                displayField: 'value',
                valueField: 'value',
                flex: 1
            },{
                xtype: 'textfield',
                fieldLabel: 'Zip',
                labelWidth: 40,
                width: 280,
                name: 'zip',
                bind: '{userPrefs.zip}',
                flex: 1
            }]
        },{
            fieldLabel: 'Email',
            name: 'email',
            bind: '{userPrefs.email}',
            allowBlank: false
        },{
            xtype: 'container',
            layout: 'hbox',
            width: '100%',

            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Home',
                    labelWidth: 124,
                    width: 350,
                    name: 'home',
                    bind: '{userPrefs.homePhone}',
                    flex: 1,
                    vtype: 'phone',
                    plugins: {
                        ptype: 'phonenumberformatter'
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    labelWidth: 40,
                    width: 280,
                    name: 'fax',
                    bind: '{userPrefs.fax}',
                    flex: 1,
                    vtype: 'phone',
                    plugins: {
                        ptype: 'phonenumberformatter'
                    }
                }
            ]
        },{
            xtype: 'container',
            layout: 'hbox',
            width: '100%',

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Work',
                labelWidth: 124,
                width: 350,
                name: 'work',
                bind: '{userPrefs.phone}',
                allowBlank: false,
                flex: 1,
                vtype: 'phone',
                plugins: {
                    ptype: 'phonenumberformatter'
                }
            },{
                xtype: 'textfield',
                fieldLabel: 'Cell',
                labelWidth: 40,
                width: 280,
                name: 'cell',
                bind: '{userPrefs.cell}',
                flex: 1,
                vtype: 'phone',
                plugins: {
                    ptype: 'phonenumberformatter'
                }
            }]
        },{
            fieldLabel: 'Extension',
            name: 'extension',
            bind: '{userPrefs.extension}'
        }]
    }]
});