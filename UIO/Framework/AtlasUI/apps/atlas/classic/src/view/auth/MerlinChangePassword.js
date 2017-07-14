/**
 * Created by mkorivi on 1/25/2017.
 */
Ext.define('Atlas.view.auth.MerlinChangePassword', {
    extend: 'Ext.window.Window',
    title: 'Change Password',
    width: 350,
    height: 350,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    controller: 'auth-merlinchangepassword',
    viewModel: {
        data: {
            start: null
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Cancel',
                    reference: 'cancelButton',
                    handler: 'onCancel'
                },
                '->',
                {
                    text: 'Change',
                    reference: 'change',
                    handler: 'doChange'
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
    defaultButton: 'resetButton',
    items: [
        {
            xtype: 'form',
            defaults: {
                anchor: '90%',
                xtype: 'textfield',
                labelWidth: 200
            },
            items: [
                {
                    fieldLabel: 'Username',
                    reference: 'username',  // component's name in the ViewModel
                    publishes: 'value', // value is not published by default
                    name: 'un',
                    allowBlank: false,
                    emptyText: 'username',
                    bind: '{username}'
                },
                {
                    fieldLabel: 'Old Password',
                    name: 'oldPassword',
                    itemId: 'oldPassword',
                    inputType: 'password',
                    allowBlank: false

                },
                {
                    fieldLabel: 'New Password',
                    name: 'newPassword',
                    allowBlank: false,
                    itemId: 'newPassword',
                    inputType: 'password',
                    vtype:'loginPassword',
                    listeners: {
                        blur: function(field) {
                            if (field.isValid()) {
                                var oldPassword = this.up().getComponent('oldPassword');
                                if (oldPassword.value) {
                                    if (field.value == oldPassword.value) {
                                        field.markInvalid('Old and New passwords should not be same.');
                                        return;

                                    }

                                }
                            }
                        }
                    }

                }
                ,
                {
                    fieldLabel: 'Confirm New Password',
                    name: 'confirmPassword',
                    allowBlank: false,
                    inputType: 'password',
                    itemId: 'confirmPassword',
                    vtype:'loginPassword',
                    listeners: {
                        blur: function(field) {
                            var x = field.isValid();
                            if (x) {

                                var confirmPassword = this.up().getComponent('newPassword');
                                if (confirmPassword.value) {
                                    if (field.value !== confirmPassword.value) {
                                        field.markInvalid('New and Confirm New passwords should be same.');
                                        return;

                                    }

                                }
                            }
                        }
                    }

                }
            ]
        }
    ]

});