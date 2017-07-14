Ext.define('Atlas.admin.view.EDIPartnerContactForm', {
    extend: 'Ext.window.Window',
    xtype:'admin-edipartnercontactform',
    title:'Add EDI Partner Info',
    controller: 'edipartnercontactformcontroller',
    viewModel: 'admin_edipartnercontactformviewmodel',
    defaults: {
        labelWidth: 100,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    width: 400,
    height: 200,
    modal: true,
    items: [
        {
            fieldLabel: 'Last Name',
            itemId:'txtlastname',
            allowBlank: true,
            bind: {value: '{paramRecord.FirstName}'}
        }, {
            fieldLabel: 'First Name',
            emptyText: '',
            itemId:'txtfirstname',
            allowBlank: true,
            bind: {value: '{paramRecord.LastName}'}
        },{
            fieldLabel: 'Phone',
            emptyText: '',
            itemId:'txtphoneno',
            allowBlank: true,
            bind: {value: '{paramRecord.Phone}'}
        },{
            fieldLabel: 'Email',
            emptyText: '',
            itemId:'txtemail',
            allowBlank: true,
            bind: {value: '{paramRecord.Email}'}
        }
    ],
    dockedItems: {
        dock: 'bottom',
        xtype: 'toolbar',
        items: ['->',
            {
                xtype: 'button',
                text : 'Update',
                itemId:"btnSave",
                iconCls: 'fa fa-save',
                handler:'btnSave'
            }, {
                xtype: 'button',
                text : 'Cancel',
                iconCls: 'fa fa-times',
                handler:'btnCancel'
            }
        ]
    }
});