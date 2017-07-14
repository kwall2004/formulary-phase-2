/**
 * Created by c4539 on 12/15/2016.
 */
Ext.define('Atlas.view.auth.RxPharmacyChangePassword', {
    extend: 'Ext.window.Window',
    title: 'Change Password',
    modal: true,
    width: 350,
    closable: false,
    controller: 'auth-rxpharmacychangepassword',

    items: {
        xtype: 'form',
        cls: 'card-panel',
        reference: 'passwordForm',
        layout: {
            type: 'vbox',
            align: 'stretch',
            flex: 1
        },
        bbar: {
            xtype: 'toolbar',
            items: [
                '->',
                {
                    xtype: 'button',
                    reference: 'submitButton',
                    text: 'Change',
                    handler: 'changePassword'
                },
                {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'cancelChange'
                }
            ]
        },
        items: [
            {
                xtype: 'textfield',
                reference: 'newPassword',
                name: 'newPassword',
                blankText: 'New Password cannot be blank.',
                allowBlank: false,
                inputType: 'password',
                fieldLabel: 'New Password',
                enableKeyEvents: true,
                labelWidth: 125
            },
            {
                xtype: 'textfield',
                reference: 'confirmPassword',
                name: 'confirmPassword',
                fieldLabel: 'Confirm Password',
                allowBlank: false,
                blankText: 'Confirm Password cannot be blank.',
                inputType: 'password',
                enableKeyEvents: true,
                labelWidth: 125,
                listeners: {
                    keypress: 'onConfirmPress'
                }
            }
        ]
    }
});