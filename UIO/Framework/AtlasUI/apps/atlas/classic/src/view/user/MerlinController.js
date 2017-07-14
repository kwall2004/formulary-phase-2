Ext.define('Atlas.view.user.MerlinController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usermerlin',

    listen: {
        controller: {
            '*': {
                updateResetStatus: 'updateStatus'
            }
        }
    },

    init: function(){
        this.loadDashboardItems();
    },

    loadDashboardItems: function(){

    },

    saveDashboardItems: function(){

    },

    updateStatus: function (btn, status) {
        var label = btn.up('window').down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    },

    onUpdate: function(btn){},

    onDashboardApply: function (btn) {},

    onChangePassword: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            user = vm.get('user'),
            win;

        win = Ext.create('Ext.window.Window', {
            title: 'Change Password',
            width: 350,
            height: 240,
            modal: true,
            autoShow: true,
            viewModel: {
                parent: vm //windows need to have the VM chain added to them
            },

            layout: 'fit',
            dockedItems: [
                {
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
                }
            ],
            items: [{
                xtype: 'form',
                bodyPadding: 20,
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth: 125,
                    msgTarget: 'side',
                    autoFitErrors: false
                },
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Cancel',
                            handler: function (btn) {
                                btn.up('window').close();
                            }
                        },
                        '->',
                        {
                            text: 'Change Password',
                            formBind: true,
                            handler: function (btn) {
                                var values = this.up('form').getValues();

                                Ext.Ajax.request({
                                    useDefaultXhrHeader: false,
                                    paramsAsJson: true,
                                    noCache: false,
                                    url: Atlas.apiURL + 'authentication/rx/changeuserpassword/update',
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    params: Ext.JSON.encode({
                                        ipcUserName: Atlas.user.username,
                                        ipcOldPassword: values.oldpass,
                                        ipcNewPassword: values.pass
                                    }),
                                    success: function (response, opts) {
                                        var obj = Ext.decode(response.responseText);

                                        if (obj.message[0].message === 'Success') {
                                                btn.up('window').close();
                                        } else {
                                            me.fireEvent('updateResetStatus', btn, obj.message[0].message);
                                        }
                                    }
                                });
                            }
                        }
                    ]
                }],
                defaults: {
                    width: 300,
                    inputType: 'password'
                },
                items: [
                    {
                        fieldLabel: 'Old Password',
                        name: 'oldpass'
                    },
                    {
                        fieldLabel: 'Password',
                        name: 'pass',
                        itemId: 'pass',
                        allowBlank: false,
                        listeners: {
                            validitychange: function (field) {
                                field.next().validate();
                            },
                            blur: function (field) {
                                field.next().validate();
                            }
                        }
                    }, {
                        fieldLabel: 'Confirm Password',
                        allowBlank: false,
                        name: 'pass-cfrm',
                        vtype: 'password',
                        initialPassField: 'pass' // id of the initial password field
                    }

                ]
            }]
        });
    }
});