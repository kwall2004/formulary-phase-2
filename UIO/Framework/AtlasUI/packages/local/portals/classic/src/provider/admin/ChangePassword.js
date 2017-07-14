// k3279 - Kevin Tabasan - 12/28/2016

Ext.define('Atlas.portals.view.provider.admin.ChangePassword', {
    extend: 'Ext.window.Window',
    xtype: 'providerchangepassword',
    controller: 'providerchangepassword',
    title: 'Change Password',
    closable: false,
    modal: true,
    width: 500,
    height: 400,
    onEsc: Ext.emptyFn, // prevent esc from closing window
    defaultButton: 'changePasswordButton',

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: ['->',{
            text: 'Change Password',
            handler: 'onChangePasswordClick',
            reference: 'changePasswordButton'
        },{
            text: 'Clear',
            handler: 'onClearClick'
        },{
            text: 'Cancel',
            handler: 'onCancelClick',
            bind: {
                hidden: '{hideCancelButton}'
            }
        },'->']
    }],

    items: [{
        xtype: 'form',
        cls: 'formPanel',
        reference: 'changePasswordForm',
        margin: 10,

        defaults: {
            xtype: 'textfield'
        },

        items: [{
            fieldLabel: 'Old Password',
            name: 'oldPassword',
            allowBlank: false,
            labelWidth: 169,
            inputType: 'password'
        },{
            fieldLabel: 'New Password',
            name: 'newPassword',
            allowBlank: false,
            labelWidth: 169,
            inputType: 'password'
        },{
            fieldLabel: 'Confirm New Password',
            name: 'confirmPassword',
            allowBlank: false,
            inputType: 'password'
        },{
            xtype: 'container',
            html: '<div style="padding: 20px 0 0 7px">Below are the requirements for a complex password:<br>' +
            '<ol>' +
            '<li>Password cannot contain your account name, first name, or last name</li>' +
            '<li>Password must be at least eight characters in length</li>' +
            '<li>Password must contain at least 1 character from all of these 4 categories' +
            '<ol type="a">' +
            '<li>Uppercase characters (A-Z)</li>' +
            '<li>Lowercase characters (a-z)</li>' +
            '<li>Base 10 digits (0-9)</li>' +
            '<li>Non-alphabetic characters (!, $, %, etc)</li>' +
            '</ol>' +
            '</li>' +
            '<li>Password cannot match any of your previous 6 passwords</li>' +
            '</ol>' +
            '</div>'
        }]
    }]
});