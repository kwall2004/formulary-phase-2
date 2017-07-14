Ext.define('Atlas.portals.view.registration.MemberMHPRegistration', {
    extend: 'Ext.window.Window',
    xtype: 'membermhpregistrationwindow',

    controller: 'membermhpregistrationview',
    viewModel: {
        stores: {
            listItems: {
                model: 'Atlas.portals.hpmember.model.MemberMHPRegistrationModel'
            },
            portalmemberfuncs: {
                model: 'Atlas.portals.hpmember.model.PortalMemberFuncs'
            }
        }
    },

    title: 'Register New User',
    width: 500,
    layout: 'center',
    modal: true,
    items: [
        {
            xtype: 'container',
            frame: false,
            border: 0,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldDefaults: {
                msgTarget: 'side'
            },
            width: 350,
            items: [
                {
                    xtype: 'form',
                    reference: 'registrationForm',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        labelWidth: 145
                    },

                    items: [
                        {
                            xtype: 'combo',
                            reference: 'stateCombo',
                            name: 'stateSelect',
                            fieldLabel: 'Select State',
                            allowBlank: false,
                            flex: 1,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                beforerender: 'getStates',
                                change: 'hidePlan'
                            }
                        },
                        {
                            xtype: 'combo',
                            reference: 'planList',
                            name: 'planSelect',
                            fieldLabel: 'Select Plan',
                            allowBlank: false,
                            flex: 1,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                beforerender: 'getListItems'
                            },
                            bind: {
                                hidden: '{hiddenForIL}',
                                disabled: '{hiddenForIL}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            name: 'memberId',
                            fieldLabel: 'Member ID',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            reference: 'fourSSN',
                            name: 'fourSSN',
							fieldLabel: 'Last 4 digit SSN#',
                            allowBlank: false,                            
                            flex: 1,
                            bind: {
                                hidden: '{hiddenForIL}',
                                disabled: '{hiddenForIL}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'dateOfBirth',
                            fieldLabel: 'Date of Birth',
                            format: 'm/d/Y',
                            submitFormat: 'm/d/Y',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'firstName',
                            fieldLabel: 'First Name',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'lastName',
                            fieldLabel: 'Last Name',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Phone',
                            allowBlank: false,
                            flex: 1
                        }
                    ]
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
                    text: 'Clear',
                    handler: 'clearForm'
                },
                {
                    text: 'Register',
                    handler: 'registerUser'
                }
            ]
        },
        {
            xtype: 'container',
            dock: 'bottom',
            html: 'I certify that I am the person identified above or the person\'s authorized representative.',
            padding: '0 0 0 10'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'registrationStatus',
                    flex: 1
                }
            ]
        },
        {
            xtype: 'label',
            dock: 'top',
            padding: '0 0 0 7',
            cls: 'login-label',
            reference: 'regSuccessMsg'
        }
    ]
});