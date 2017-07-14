Ext.define('Atlas.plan.view.group.DURForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.plan-group-durform',
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
            name:'durType',
            fieldLabel: 'Dur Type',
            allowBlank: false,
            bind: {store: '{accounts}'},
            displayField:'text',
            valueField:'value'
        },
        {
            xtype: 'combobox',
            autoLoadOnValue: true,
            name:'durSeverityLevel',
            fieldLabel: 'Severtiy Level',
            allowBlank: false,
            bind: {store: '{accounts}'},
            displayField:'text',
            valueField:'value'
        },
        {
            xtype: 'combobox',
            autoLoadOnValue: true,
            name:'durAction',
            fieldLabel: 'Action',
            allowBlank: false,
            bind: {store: '{accounts}'},
            displayField:'text',
            valueField:'value'
        }

    ]
});