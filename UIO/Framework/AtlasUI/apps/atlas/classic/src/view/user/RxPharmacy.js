/**
 * Created by c4539 on 12/15/2016.
 */
Ext.define('Atlas.view.user.RxPharmacy', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userrxpharmacy',
    controller: 'user-rxpharmacy',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    reference: 'saveButton',
                    handler: 'onSave'
                },
                {
                    text: 'Change Password',
                    reference: 'changePassword',
                    handler: 'onChange'
                },
                {
                    text: 'Cancel',
                    reference: 'cancel',
                    handler: 'onCancel'
                }
            ]
        },
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
    defaultButton: 'saveButton',
    defaults: {
        xtype: 'textfield',
        anchor: '100%',
        msgTarget: 'side',
        labelWidth: 80
    },
    layout: 'anchor',
    bodyPadding: 20,
    items: [
        {
            fieldLabel: 'User Name',
            reference: 'username',
            name: 'UserName',
            publishes: 'value',
            emptyText: 'Username',
            readOnly: true,
            cls: 'x-item-disabled'
        },
        {
            fieldLabel: 'Email Address',
            name: 'Email',
            emptyText: 'Email Address',
            vtype: 'email',
            allowBlank: false
        },
        {
            fieldLabel: 'Phone',
            name: 'Phone',
            emptyText: 'Phone',
            enableKeyEvents: true,
            listeners: {
                keypress: 'formatPhone'
            }
        },
        {
            fieldLabel: 'Contact Name',
            name: 'ContactName',
            emptyText: 'Contact Name',
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                'keypress': 'onSubmitPress'
            }
        }
    ]
});