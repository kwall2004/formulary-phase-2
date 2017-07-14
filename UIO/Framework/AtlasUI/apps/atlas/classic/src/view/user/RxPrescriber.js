Ext.define('Atlas.view.user.RxPrescriber',{
    extend: 'Ext.form.Panel',
    alias: 'widget.userrxprescriber',
    controller: 'user-rxprescriber',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Change Password',
                    reference: 'changeButton',
                    handler: 'onChange'
                },
                '->',
                {
                    text: 'Cancel',
                    reference: 'cancelButton',
                    handler: 'onCancel'
                },
                '->',
                {
                    text: 'Save',
                    reference: 'saveButton',
                    handler: 'onSave'
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'status'
                }
            ]
        }],
    defaultButton: 'saveButton',
    defaults: {
        xtype: 'textfield',
        disabled: true,
        anchor: '100%',
        msgTarget: 'side',
        labelWidth: 80
    },
    layout: 'anchor',
    bodyPadding: 20,
    items:[
        {
            fieldLabel: 'Username',
            reference: 'username',  // component's name in the ViewModel
            publishes: 'value', // value is not published by default
            name: 'UserName',
            emptyText: 'Username'
        },
        {
            fieldLabel: 'Name',
            name: 'FullName',
            emptyText: 'Name'
        },
        {
            fieldLabel: 'Email',
            name: 'Email',
            disabled: false,
            emptyText: 'Email Address'
        },
        {
            fieldLabel: 'NPI',
            name: 'NPI',
            emptyText: 'NPI Id'
        },
        {
            fieldLabel: 'DEA',
            name: 'DEA',
            emptyText: 'Dea'
        },
        {
            fieldLabel: 'Phone',
            name: 'Phone',
            emptyText: 'Phone'
        },
        {
            fieldLabel: 'Fax',
            name: 'Fax',
            emptyText: 'Fax'
        }
    ]
});
