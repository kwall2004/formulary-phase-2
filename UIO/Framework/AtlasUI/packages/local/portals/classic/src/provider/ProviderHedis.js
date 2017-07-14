/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Provider Main
 * Description: Gives users a place to view Provider Info
 */
Ext.define('Atlas.portals.view.provider.ProviderHedis',{
    extend: 'Ext.panel.Panel',
    xtype: 'portalsproviderhedis',
    title: 'HEDIS',

    controller: 'providerhedis',
    viewModel: {
        stores: {
            providerhedisdata: {
                model: 'Atlas.portals.hpmember.model.ProviderHedisData'
            },
            hedisdetail: {
                model: 'Atlas.portals.hpmember.model.HedisDetail'
            }
        }
    },

    items: [
        {
            xtype: 'grid',
            title: 'HEDIS Measures',
            height: 350,
            bind: '{providerhedisdata}',
            cls: 'card-panel',
            columns: [
                {
                    text: 'ID',
                    dataIndex: 'Measure',
                    width: 60
                },
                {
                    text: 'Measure',
                    dataIndex: 'measureDesc',
                    flex: 3
                },
                {
                    text: 'Members',
                    dataIndex: 'Members',
                    flex: 1
                },
                {
                    text: 'Bonus Paid YTD',
                    dataIndex: 'PaidYTD',
                    formatter: 'usMoney',
                    align: 'end',
                    flex: 1
                },
                {
                    text: 'Possible Bonus',
                    dataIndex: 'possibleBonus',
                    formatter: 'usMoney',
                    align: 'end',
                    flex: 1
                },
                {
                    xtype: 'actioncolumn',
                    dataIndex: 'Members',
                    flex: 1,
                    items: [{
                        xtype: 'button',
                        iconCls: '',
                        getClass: function (value, meta, record) {
                            if (value > 0) {
                                return 'x-fa fa-file-text';
                            } else {
                                return 'x-hidden';
                            }
                        },
                        handler: 'generatePdf'
                    }]
                }

            ],

            listeners: {
                select: 'hedisMeasureSelect'
            }
        },
        {
            xtype: 'grid',
            title: 'HEDIS Detail',
            height: 350,
            bind: '{hedisdetail}',
            cls: 'card-panel',
            emptyText: 'No Details for this measure.',
            columns: [
                {
                    text: 'Measure',
                    dataIndex: 'measureDesc',
                    flex: 1
                },
                {
                    text: 'Members',
                    dataIndex: 'Members',
                    flex: 1
                },
                {
                    text: 'Prior Year Hits',
                    dataIndex: 'priorYear',
                    flex: 1
                },
                {
                    text: 'YTD Hits',
                    dataIndex: 'YTDHits',
                    flex: 1
                },
                {
                    text: 'Percent',
                    dataIndex: 'Percent',
                    formatter: 'percent',
                    flex: 1
                },
                {
                    text: 'Bonus Paid YTD',
                    dataIndex: 'PaidYTD',
                    formatter: 'usMoney',
                    align: 'end',
                    flex: 1
                },
                {
                    text: 'Possible Bonus',
                    dataIndex: 'possibleBonus',
                    formatter: 'usMoney',
                    align: 'end',
                    flex: 1
                }

            ]
        }
    ]
});