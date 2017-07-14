Ext.define('Atlas.plan.view.carriers.AccountForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-carriers-accountform',
    defaults: {
        labelWidth: 160,
            flex: 1,
            xtype: 'textfield',
            minWidth: 240
    },
    bbar:[
        '->',

        {
            xtype: 'button',
            iconCls: 'x-fa fa-floppy-o',
            handler: 'onSaveClick',
            reference: 'btnSave',
            alignment: 'right',
            text: 'Save'
        },
        {
            xtype: 'button',
            iconCls: 'x-fa fa-ban',
            handler: 'onCancelClick',
            reference: 'btnCancel',
            alignment: 'right',
            text: 'Cancel'
        }
    ],
    items: [
        {
            fieldLabel: 'Carrier ID',
            xtype: 'displayfield',
            reference: 'carrierId',
            bind: '{carriercombo.selection.carrierId}',
            allowBlank: false
        }, {
            fieldLabel: 'Carrier Name',
            xtype: 'displayfield',
            reference: 'carrierName',
            bind: '{carriercombo.selection.carrierName}',
            emptyText: 'enter a name for this carrier',
            allowBlank: false
        }, {
            fieldLabel: 'Account Number',
            name: 'carrierAcctNumber',
            reference: 'carrierAcctNumber',
            allowBlank: false,
            disabled:true
        }, {
            fieldLabel: 'Account Name',
            name: 'accountName',
            reference: 'carrieraccountName',
            allowBlank: false
        }

    ]
});