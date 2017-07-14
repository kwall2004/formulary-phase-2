Ext.define('Atlas.view.auth.HpMemberLogin', {
    extend: 'Ext.window.Window',
    title: '<img style="float: left;" src="resources/images/login_icon.png" width="32" height="32"/><div style="padding: 8px 0 0 40px;">Meridian Member Secured Services Login</div>',
    reference: 'loginWindow',
    width: 450,
    closable: false,
    onEsc: Ext.emptyFn,
    autoShow: true,
    modal: true,
    viewModel: {
        stores: {
            planstore: {
                proxy: {
                    type: 'memory'
                }
            }
        },
        data: {
            start: 'hpmember'
        }
    },
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    controller: 'auth-hpmemberlogin',
    dockedItems: [
        {
            xtype: 'toolbar',
            enableFocusableContainer: false,
            dock: 'bottom',
            items: [
                {
                    text: 'First Time Member?',
                    reference: 'registerButton',
                    handler: 'onRegister',
                    tabIndex: 6
                },
                '->',
                {
                    text: 'Forgot Password',
                    reference: 'forgotButton',
                    handler: 'onForgot',
                    tabIndex: 7
                },
                '->',
                {
                    text: 'Login',
                    reference: 'login',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    handler: 'onLogin',
                    tabIndex: 5
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
                    reference: 'status',
                    flex: 1
                }
            ]
        }],
    defaultButton: 'login',
    items: [
        {
            xtype: 'container',
            layout: 'center',

            items: [{
                xtype: 'form',
                defaults: {
                    xtype: 'textfield',
                    anchor: '100%',
                    msgTarget: 'side',
                    labelWidth: 100,
                    width: 300
                },
                layout: 'anchor',
                items: [
                    {
                        fieldLabel: 'Member ID',
                        reference: 'username',  // component's name in the ViewModel
                        publishes: 'value', // value is not published by default
                        name: 'un',
                        emptyText: 'member id',
                        tabIndex: 1,
                        listeners: {
                            afterrender: function(field) {
                                field.focus(true);
                            }
                        }
                    },
                    {
                        fieldLabel: 'Password',
                        name: 'pwd',
                        emptyText: 'password',
                        inputType: 'password',
                        tabIndex: 2
                    },
                    {
                        xtype: 'combo',
                        reference: 'stateCombo',
                        fieldLabel: 'State',
                        store: {
                            fields: ['name'],
                            data: [
                                {name: 'IL'},
                                {name: 'MI'}
                            ]
                        },
                        displayField: 'name',
                        valueField: 'name',
                        name: 'stateCombo',
                        listeners: {
                            change: 'hidePlanSelect'
                        },
                        tabIndex: 3
                    },
                    {
                        xtype: 'combo',
                        reference: 'planCombo',
                        fieldLabel: 'Plan',
                        hidden: true,
                        bind: {
                            store: '{planstore}'
                        },
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        name: 'planCombo',
                        listeners: {
                            select: 'showPlanCard'
                        },
                        tabIndex: 4
                    }
                ]
            }]
        },
        {
            xtype: 'toolbar',

            items: ['->',{
                xtype: 'container',
                padding: 10,
                reference: 'cardContainerRef',
                hidden: true
            },'->']
        },
        {
            xtype: 'container',
            padding: 10,
            reference: 'servicesNumContainer'
        }
    ]

});