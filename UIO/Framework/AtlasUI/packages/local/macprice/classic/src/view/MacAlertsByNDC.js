
Ext.define('Atlas.macprice.view.MacAlertsByNDC', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MacAlertsByNDC',
    xtype: 'macprice-MacAlertsByNDC',
    itemId: 'MacAlertsByNDC',
    title: 'Alerts By NDC (No Grouping)',

    tabConfig: {
        listeners: {
            activate: 'onTabChange'
        }
    },
    dockedItems: {
        items:[
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
                        xtype: 'drugtypeahead',
                        fieldLabel: 'NDC',
                        labelWidth: 30,
                        width: 250,
                        itemId: 'cbxDrug',
                        emptyText: ' [e.g. Nexium]',
                        displayField: 'BN',
                        valueField: 'NDC'
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