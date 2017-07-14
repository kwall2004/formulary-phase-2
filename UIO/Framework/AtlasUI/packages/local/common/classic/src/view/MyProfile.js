/**
 * Created by n6684 on 11/29/2016.
 */
// Revisited by @Sencha
Ext.define('Atlas.common.view.MyProfile', {
    extend: 'Ext.window.Window',
    xtype: 'common-myprofile',
    controller: 'myprofilecontroller',
    viewModel: 'myprofileviewmodel',
    width: 400,
    //minHeight: 300,
    modal: true,
    title: 'My Settings',
    layout: 'fit',

    items: [
        {
            xtype: 'tabpanel',
            items: [
                {
                    xtype: 'form',
                    reference: 'dashboard',
                    title: 'My Dashboard Items',
                    items: [
                        {
                            xtype: 'fieldset',
                            layout:'form',
                            title: 'Dashboard Items'
                        }
                    ],
                    bbar: [
                        '->',
                        {
                            text: 'Apply',
                            iconCls: 'x-fa fa-save',
                            handler: 'onDashboardChange'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    layout: 'form',
                    bodyPadding: 10,
                    reference: 'profile',
                    title: 'My Profile',
                    bbar: [
                        '->',
                        {
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            handler: 'onProfileSave'
                        },
                        {
                            text: 'Change Password',
                            iconCls: 'x-fa fa-save',
                            handler: 'onChangePassword'
                        }
                    ],
                    defaults: {
                        xtype: 'textfield',
                        allowBlank: false
                    },
                    items: [
                        {
                            fieldLabel: 'First Name',
                            name: 'firstname'
                        },
                        {
                            fieldLabel: 'Middle Name',
                            name: 'middlename'
                        },
                        {
                            fieldLabel: 'Last Name',
                            name: 'lastname'
                        },
                        {
                            fieldLabel: 'Email',
                            name: 'email.ContactInfo',
                            vtype: 'email'
                        },
                        {
                            fieldLabel: 'Work Phone',
                            name: 'workphone.ContactInfo',
                            vtype: 'phone'
                        },
                        {
                            fieldLabel: 'Extension',
                            name: 'Ext.ContactInfo',
                            maskRe: /[0-9]/
                        },
                        {
                            fieldLabel: 'Home Phone',
                            name: 'homephone.ContactInfo',
                            vtype: 'phone'
                        },
                        {
                            fieldLabel: 'Cell Phone',
                            name: 'cell.ContactInfo',
                            vtype: 'phone'
                        },
                        {
                            fieldLabel: 'Fax',
                            name: 'fax.ContactInfo',
                            vtype: 'fax'
                        }
                    ]
                }
            ]
        }
    ]
});
//Down from 163