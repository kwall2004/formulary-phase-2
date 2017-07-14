Ext.define('Atlas.plan.view.group.PAListForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-group-palistform',
    defaults: {
        labelWidth: 160,
        flex: 1,
        xtype: 'textfield',
        minWidth: 240
    },
    items: [
        {
            xtype: 'combobox',
            autoLoadOnValue: true,
            name:'paName',
            fieldLabel: 'PA Name',
            emptyText: 'Select an PA Name',
            allowBlank: false,
            bind: {store: '{accounts}'},
            displayField:'text',
            valueField:'value'
        },
         {
            fieldLabel: 'Std Response',
            xtype: 'displayfield',
            name: 'standardResponse',
            allowBlank: false
        }, {
            fieldLabel: 'Approval Criteria',
            name: 'approvalCriteria',
            allowBlank: false
        }, {
            fieldLabel: 'Progress Prog Name',
            name: 'approvalCriteria',
            allowBlank: false
        }

    ]
});