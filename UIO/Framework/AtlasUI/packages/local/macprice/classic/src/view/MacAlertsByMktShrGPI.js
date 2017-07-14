
Ext.define('Atlas.macprice.view.MacAlertsByMktShrGPI', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MacAlertsByMktShrGPI',
    xtype: 'macprice-MacAlertsByMktShrGPI',
    itemId: 'MacAlertsByMktShrGPI',
    title: 'Alerts by Market Share by GPI',

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
                        queryMode: 'local',
                        name: 'AlertStatus',
                        value: '0',
                        displayField: 'ListDescription',
                        valueField: 'ListItem'
                    },'-',
                    {
                        xtype: 'combo',
                        fieldLabel: 'Market Share Period',
                        itemId: 'Period',
                        bind: {
                            store: '{MacAlertMktShrPeriod}'
                        },
                        queryMode: 'local',
                        name: 'Period',
                        displayField: 'name',
                        valueField: 'value'
                    },
                    {
                        xtype: 'numberfield',
                        fieldLabel: 'Top',
                        itemId: 'topN',
                        labelWidth: 30,
                        width: 100,
                        name: 'topN',
                        minValue: 0,
                        hideTrigger: true
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'btnSearch',
                        text: 'Show Alerts',
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