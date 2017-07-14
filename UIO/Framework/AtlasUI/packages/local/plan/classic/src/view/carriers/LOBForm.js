Ext.define('Atlas.plan.view.carriers.LOBForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-carriers-lobform',
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
            fieldLabel: 'LOB ID',
            name: 'carrierLOBId',
            reference: 'carrierLOBId',
            allowBlank: false,
            disabled:true,
            maskRe:/\d/

        }, {
            fieldLabel: 'LOB Name',
            name: 'lobName',
            reference: 'carrierlobName',
            allowBlank: false
        }

    ]
});