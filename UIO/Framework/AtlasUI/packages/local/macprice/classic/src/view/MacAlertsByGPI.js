
Ext.define('Atlas.macprice.view.MacAlertsByGPI', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MacAlertsByGPI',
    xtype: 'macprice-MacAlertsByGPI',
    itemId: 'MacAlertsByGPI',
    title: 'Alerts by GPI',

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
                        xtype: 'combo',
                        fieldLabel: 'Alert Status',
                        labelWidth: 60,
                        itemId: 'AlertStatus',
                        bind: {
                            store: '{AlertStatus}'
                        },
                        listeners: {
                            select: 'onAlertStatusChange'
                        },
                        queryMode: 'local',
                        name: 'AlertStatus',
                        value: '0',
                        displayField: 'ListDescription',
                        valueField: 'ListItem'
                    },'-',
                    {
                        xtype: 'gpitypeahead',
                        fieldLabel: 'GPI',
                        labelWidth: 30,
                        width: 250,
                        itemId: 'cbxGPI',
                        emptyText: ' [e.g. Cycloserine]',
                        displayField: 'GPICode',
                        valueField: 'GPICode'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Start Date',
                        format: 'm/d/Y',
                        labelWidth: 60,
                        itemId:'StartDate'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'End Date',
                        format: 'm/d/Y',
                        labelWidth: 60,
                        itemId:'EndDate'
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'btnSearch',
                        text: 'Search',
                        iconCls: 'x-fa fa-search',
                        handler: 'onSearch'
                    }
                ]
            }
        ]

    },

    items: [
        { xtype: 'MacAlertShared' }
    ]

});