/*
 Last Developer: Ankit Kumar
 Previous Developers: [Ankit Kumar]
 Origin: Merlin - MAC and Custom price
 Date: 7/26/2016
 Description: This toolbar appears at the top of Mac Setup.
 */
Ext.define('Atlas.macprice.view.CustomPriceHeader', {
    extend: 'Ext.tab.Panel',
    xtype: 'macprice-CustomPriceHeader',

    title: 'Custom Price Setup',
    controller: 'CustomPriceHeaderController',
    viewModel: 'CustomPriceHeaderModel',

    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combo',
                itemId: 'cbxPriceList',
                fieldLabel: 'Custom Price List',
                labelWidth: 125,
                emptyText: ' Custom Price List',
                matchFieldWidth: false,
                width: 450,
                bind: {
                    store: '{CustomPriceList}'
                },
                tpl: Ext.create('Ext.XTemplate',
                    '</Html>'
                    + '<tpl for=".">'
                    + '<tpl if="xindex == 1">'
                    + '<table style="width: 330px;">'
                    + '<tr>'
                    + '<th style="font-weight: bold; padding: 3px;">Custom Price List Name</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Version</th>'
                    + '<th style="font-weight: bold; padding: 3px;">Status</th>'
                    + '</tr>'
                    + '</tpl>'
                    + '<tr class="x-boundlist-item">'
                    + '<td style="padding: 3px;">{customPriceName}</td>'
                    + '<td style="padding: 3px;">{customPriceListVersion}</td>'
                    + '<td style="padding: 3px;">{priceStatusFormat}</td>'
                    + '</tr>'
                    + '<tpl if="xindex==0">'
                    + '</table>'
                    + '</tpl>'
                    + '</tpl>'
                    + '</Html>'),

                listeners: {
                    select: 'onCustomPriceListChange'
                },
                pageSize: 10,
                forceSelection: true,
                queryMode: 'local',
                name: 'custompricelist',
                displayField: 'customPriceName',
                valueField: 'systemID'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Custom price List',
                bind: {
                    value: '{masterrecord.customPriceName}'
                }
            }
            , '-',
            {
                xtype: 'displayfield',
                fieldLabel: 'Version',
                labelWidth: 50,
                bind: {
                    value: '{masterrecord.customPriceListVersion}'
                }
            }, '-',
            {
                xtype: 'displayfield',
                fieldLabel: 'Status',
                labelWidth: 50,
                bind: {
                    value: '{masterrecord.priceStatusFormat}'
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