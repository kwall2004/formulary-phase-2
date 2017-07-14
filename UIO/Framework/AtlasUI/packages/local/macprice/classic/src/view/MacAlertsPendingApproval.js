
Ext.define('Atlas.macprice.view.MacAlertsPendingApproval', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MacAlertsPendingApproval',
    xtype: 'macprice-MacAlertsPendingApproval',
    itemId: 'MacAlertsPendingApproval',
    title: 'Alerts Pending Approval',

    tabConfig: {
        listeners: {
            activate: 'onTabChange'
        }
    },

    dockedItems: {
        items: [
            {
                dock: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'gpitypeahead',
                        fieldLabel: 'GPI',
                        labelWidth: 30,
                        width: 250,
                        itemId: 'cbxGPI',
                        emptyText: ' [e.g. Cycloserine]',
                        displayField: 'GPICode',
                        valueField: 'GPICode'
                    }
                ]
            }
        ]
    },

    items: [
        { xtype: 'MacAlertShared' }
    ]

});