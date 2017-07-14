
Ext.define('Atlas.macprice.view.MacSetup', {
    extend: 'Ext.tab.Panel',
    xtype: 'macprice-MacSetup',
    title: 'Mac Setup',
    controller: 'MacSetupController',
    viewModel: 'MacSetupModel',

    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'displayfield',
                fieldLabel: 'MAC List',
                labelWidth: 60
            },
            {
                xtype: 'combo',
                itemId: 'cbxMacList',
                emptyText: ' MAC List',
                queryMode: 'local',
                width: 350,
                bind: {
                    store: '{maclist}'
                },
                tpl: Ext.create('Ext.XTemplate',
                    '</Html>'
                    + '<tpl for=".">'
                    + '<tpl if="xindex == 1">'
                    + '<table style="width: 330px;">'
                    + '<tr>'
                    + '<th style="font-weight: bold; padding: 3px;">MAC List Name</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Data Source</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Version</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Status</th>'
                    + '</tr>'
                    + '</tpl>'
                    + '<tr class="x-boundlist-item">'
                    + '<td style="padding: 3px;">{MACListName}</td>'
                    + '<td style="padding: 3px;">{DataSource}</td>'
                    + '<td style="padding: 3px;">{MACListVersion}</td>'
                    + '<td style="padding: 3px;">{Stat}</td>'
                    + '</tr>'
                    + '<tpl if="xindex==0">'
                    + '</table>'
                    + '</tpl>'
                    + '</tpl>'
                    + '</Html>'),

                listeners: {
                    select: 'onMacListChange'
                },
                pageSize: 10,
                forceSelection: true,
                reference: 'maclistcombo',
                name: 'maclist',
                displayField: 'MACListName',
                valueField: 'systemID'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'MAC List Name',
                bind: {
                    value: '{masterrecord.MACListName}'
                }
            }
            , '-',
            {
                xtype: 'displayfield',
                fieldLabel: 'Data Source',
                labelWidth: 80,
                bind: {
                    value: '{masterrecord.DataSource}'
                }
            }
            , '-',
            {
                xtype: 'displayfield',
                fieldLabel: 'Ver',
                labelWidth: 30,
                bind: {
                    value: '{masterrecord.MACListVersion}'
                }
            }
            , '-',
            {
                xtype: 'displayfield',
                fieldLabel: 'Status',
                labelWidth: 50,
                bind: {
                    value: '{masterrecord.Stat}'
                }
            },
            '->',
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }
        ]
    },

    defaults: {
        closable: true
    }

});