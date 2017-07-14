Ext.define('Atlas.portals.view.registration.RxMemberRegistration', {
    extend: 'Ext.window.Window',
    xtype: 'rxmemberregistration',

    controller: 'rxmemberregistrationcontroller',
    viewModel: {
        stores: {
            listItems: {
                model: 'Atlas.portals.rxmember.model.CarriersPortal'
            }
        }
    },

    title: 'Member Registration',
    height: 500,
    width: 420,
    padding: 5,
    layout: 'card',
    modal: true,
    items: [
        {
        cls: 'card-panel',
        id: 'card-0',
        html: '<p>Welcome to the Member Registration!</p><p>Following information is required to register</p><ul><li>First and Last Name</li><li>Email Address</li><li>MeridianRx Member ID</li><li>Health Plan</li><li>Birth Date</li></ul>'
    },{
        id: 'card-1',
        cls: 'card-panel',
        xtype: 'form',
        padding: 5,
        reference: 'registrationForm',
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            labelWidth: 150,
            padding: 5
        },
        items: [
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
                vtype: 'email',
                name: 'emailAddress',
                fieldLabel: 'Email Address',
                allowBlank: false,
                flex: 1
            },
            {
                xtype: 'textfield',
                name: 'memberid',
                fieldLabel: 'Member ID',
                allowBlank: false,
                flex: 1
            },
            {
                xtype: 'combo',
                reference: 'planList',
                name: 'planList',
                fieldLabel: 'Select Plan',
                allowBlank: false,
                flex: 1,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'value',
                listeners: {
                    beforerender: 'getListItems'
                }
            },
            {
                xtype: 'datefield',
                fieldLabel: 'Birth Date',
                allowBlank: false,
                reference: 'DOB',
                name: 'DOB',
                format: 'm/d/Y',
                msgTarget: 'side',
                emptyText: 'Please select dob'
            },
            {
                xtype: 'textfield',
                name: 'userName',
                fieldLabel: 'User Name',
                allowBlank: false,
                flex: 1
            },
            {
                xtype: 'textfield',
                inputType: 'password',
                name: 'password',
                fieldLabel: 'New Password',
                allowBlank: false,
                flex: 1
            },
            {
                xtype: 'textfield',
                inputType: 'password',
                name: 'confirmPassword',
                fieldLabel: 'Confirm New Password',
                allowBlank: false,
                flex: 1
            },
            // {
            //     xtype: 'button',
            //     id: 'clear',
            //     flex: 2,
            //     text: 'Clear',
            //     handler: 'clearForm'
            // },
            {
                xtype: 'container',
                layout: 'hbox',
                padding: 0,

                items: [{
                    xtype: 'container',
                    flex: 1
                },{
                    xtype: 'button',
                    id: 'save',
                    text: 'Save',
                    handler: 'registerUser',
                    iconCls: 'x-fa fa-save'
                }]
            }
        ]
    }
    // ,
    //     {
    //     id: 'card-2',
    //     html: '<p>Congratulations! Your account has been successfully created.</p><p>You are Registered Now.Please use your Username and Password to Login.</p>'
    // }
    ],
    bbar: [
        '->',
        {
            id: 'move-prev',
            text: 'Prev',
            iconCls: 'x-fa fa-arrow-left',
            handler: function(btn) {
                var panel = btn.up("panel");
                var direction = "prev";
                var layout = panel.getLayout();
                layout[direction]();
                Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('move-next').setDisabled(!layout.getNext());
            },
            disabled: true
        },
        {
            id: 'move-next',
            text: 'Next',
            iconCls: 'x-fa fa-arrow-right',
            handler: function(btn) {
                var panel = btn.up("panel");
                var direction = "next";
                var layout = panel.getLayout();
                layout[direction]();
                Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
                Ext.getCmp('move-next').setDisabled(!layout.getNext());
            }
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'registrationStatus'
                }
            ]
        },
        {
            xtype: 'label',
            dock: 'top',
            cls: 'login-label',
            reference: 'regSuccessMsg'
        }
    ]
});
