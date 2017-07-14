Ext.define('Atlas.view.AtlasResetPassword', {
    extend: 'Ext.form.Panel',
    xtype: 'atlaspasswordreset',
    defaults: {
        anchor: '90%',
        xtype: 'textfield',
        labelWidth: 120
    },
    items: [
        {
            fieldLabel: 'Username',
            reference: 'username',  // component's name in the ViewModel
            publishes: 'value', // value is not published by default
            name: 'un',
            allowBlank: false,
            emptyText: 'username'
        },
        {
            fieldLabel: 'Email Id',
            name: 'email',
            allowBlank: false,
            emptyText: 'ex: john@doe.com'
        }
    ]

});