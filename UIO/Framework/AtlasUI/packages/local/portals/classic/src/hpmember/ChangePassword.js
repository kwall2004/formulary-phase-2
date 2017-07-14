/**
 * Created by T3852 on 10/27/2016.
 */
Ext.define('Atlas.portals.view.hpmember.ChangePassword', {
    extend: 'Ext.window.Window',
    height: 220,
    width: 490,
    layout: 'fit',
    modal: true,
    buttonAlign: 'left',
    closable: false,
    items: [
        {
            xtype: 'form',
            frame: false,
            border: 0,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 55
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    padding: 10,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'currentPassword',
                            fieldLabel: 'Current Password',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'newPassword',
                            fieldLabel: 'New Password',
                            inputType: 'password',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'retypePassword',
                            fieldLabel: 'Re-type Password',
                            inputType: 'password',
                            allowBlank: false,
                            flex: 1
                        }
                    ]
                }
            ]
        }
    ],
    buttons: [
        {
            text: 'Login',
            handler: function () {
                Ext.Msg.alert('This is not yet implemented.').show();
            }
        }
    ]
});