/**
 * Created by rsalekin on 11/25/2016.
 */
Ext.define('Atlas.pharmacy.view.PharmacyExclusionRulesWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-pharmacyexclusionrules',
    name: 'pharmacyexclusionrules',
    iconCls: 'x-fa fa-pencil-square-o',
    title: 'Pharmacy Exclusion Rules',
    viewModel: 'pharmacyexclusionrules',
    controller: 'pharmacyexclusionrules',
    width: 900,
    height: 750,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            flex: 1,
            width: '100%',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'displayfield',
                    value: 'Pharmacy exclusion rules will be applied every month when NCPDP data refresh occurs. Pharmacies will be excluded from selected contract by below rules you set up.',
                    width: '100%'
                }
            ]
        },
        {
            xtype: 'form',
            flex: 9,
            width: '100%',
            height: '100%',
            layout: 'hbox',
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpIncludedStates',
                    flex: 4.6,
                    width: '100%',
                    height: '100%',
                    overflowY: true,
                    title: 'Included States',
                    columns: [
                        {
                            text: 'State',
                            dataIndex: 'stateCd',
                            flex: 1,
                            filter: {type: 'string'},
                            renderer: function (val, row) {
                                return row.record.get('stateName') + ' (' + val + ')';
                            }
                        }
                    ],
                    bind: '{StoreIncludedStates}',
                    selModel: {
                        mode: 'MULTI'
                    },
                    plugins: [
                        {
                            ptype: 'gridfilters'
                        }
                    ],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'pagingtoolbar',
                        hideRefresh: true,
                        displayInfo: true
                    }]
                },
                {
                    xtype: 'form',
                    flex: 0.8,
                    width: '100%',
                    height: '100%',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 4.6,
                            width: '100%',
                            height: '100%'
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            width: '100%',
                            height: '100%',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnExcludeState',
                                    text: '',
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    iconCls: 'fa fa-arrow-right',
                                    tooltip: 'Exclude Selected State',
                                    handler: 'excludeIncludeState',
                                    params: {
                                        grid: 'gpIncludedStates',
                                        actionType: 'Exclude'
                                    }
                                }, {
                                    xtype: 'button',
                                    itemId: 'btnIncludeState',
                                    text: '',
                                    flex: 1,
                                    width: '100%',
                                    height: '100%',
                                    iconCls: 'fa fa-arrow-left',
                                    tooltip: 'Include Selected State',
                                    handler: 'excludeIncludeState',
                                    params: {
                                        grid: 'gpExcludedStates',
                                        actionType: 'Include'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 4.5,
                            width: '100%',
                            height: '100%'
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    itemId: 'gpExcludedStates',
                    flex: 4.5,
                    width: '100%',
                    height: '100%',
                    title: 'Excluded States',
                    columns: [
                        {
                            text: 'State',
                            dataIndex: 'stateCd',
                            flex: 1,
                            filter: {type: 'string'},
                            renderer: function (val, row) {
                                return row.record.get('stateName') + ' (' + val + ')';
                            }
                        }
                    ],
                    selModel: {
                        mode: 'MULTI'
                    },
                    bind: '{StoreExcludedStatesPage}',
                    plugins: [
                        {
                            ptype: 'gridfilters'
                        }
                    ],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        hideRefresh: true,
                        bind: '{StoreExcludedStatesPage}'
                    }]
                }
            ]
        }
    ]
});
