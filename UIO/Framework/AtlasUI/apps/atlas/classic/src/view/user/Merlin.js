Ext.define('Atlas.view.user.Merlin',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.usermerlin',
    controller: 'usermerlin',
    items:[
        {
            title: 'My Dashboard Items',
            bodyPadding: 20,
            reference:'dashboarditems',
            items:[],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text: 'Apply',
                        handler: 'onDashboardApply'
                    }

                ]
            }]
        },
        {
            title: 'My Profile',
            xtype: 'form',
            defaults: {
                labelWidth: 160,
                flex: 1,
                xtype: 'textfield',
                minWidth: 240
            },
            bodyPadding: 20,
            items: [
                {
                    fieldLabel: 'First Name',
                    name: 'firstname',
                    bind: '{user.firstname}',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Middle Name',
                    bind: '{user.middlename}',
                    name: 'middlename'
                },
                {
                    fieldLabel: 'Last Name',
                    bind: '{user.lastname}',
                    name: 'lastname',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Email',
                    bind: '{user.email.ContactInfo}',
                    name: 'email',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Work Phone',
                    bind: '{user.workphone.ContactInfo}',
                    name: 'workphone.ContactInfo'
                },
                {
                    fieldLabel: 'Extension',
                    bind: '{user.Ext.ContactInfo}',
                    name: 'Ext.ContactInfo'
                },
                {
                    fieldLabel: 'Home Phone',
                    bind: '{user.home.ContactInfo}',
                    name: 'home.ContactInfo'
                },
                {
                    fieldLabel: 'Cell Phone',
                    bind: '{user.cell.ContactInfo}',
                    name: 'cell.ContactInfo'
                },
                {
                    fieldLabel: 'Fax',
                    bind: '{user.fax.ContactInfo}',
                    name: 'fax.ContactInfo'
                }

            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
                        text: 'Change Password',
                        handler: 'onChangePassword'
                    },
                    '->',
                    {
                        text: 'Update',
                        handler: 'onUpdate'
                    }

                ]
            }]
        }
    ]
});