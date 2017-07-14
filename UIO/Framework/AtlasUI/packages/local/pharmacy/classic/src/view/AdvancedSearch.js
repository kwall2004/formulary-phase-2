Ext.define('Atlas.pharmacy.view.AdvancedSearch', {
    extend: 'Ext.Window',
    controller: 'pharmacy-advsearch',
    xtype: 'pharmacy-advancesearchwindow',
    //Use object notation. This is needed because at the creation time we specify viewmodel config with parent
    //This way the content will be merged, rather than overwritten
    viewModel: {
        type: 'pharmacy-advsearch'
    },

    title: 'Pharmacy Search',
    iconCls: 'x-fa fa-search',

    width: 900,
    height: 550,
    modal: true,
    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'form',

            layout: 'column',
            defaultButton: 'search',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.5,
                margin: 5,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    labelWidth: 110
                }
            },

            items: [
                {
                    items: [
                        {
                            fieldLabel: 'Pharmacy name',
                            reference: 'name',
                            name: 'name'
                        },
                        {
                            fieldLabel: 'City',
                            reference: 'city',
                            name: 'city'
                        },
                        {
                            fieldLabel: 'Zip',
                            reference: 'zip',
                            name: 'zip',
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Radius',
                            reference: 'radius',
                            name: 'radius',
                            minValue: 0,
                            maxValue: 100,
                            maxLength: 3,
                            hideTrigger: true
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combo',
                            reference: 'state',
                            name: 'state',
                            fieldLabel: 'State',

                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{states}'
                            },
                            publishes: 'value',
                            queryMode: 'local',

                            typeAhead: true,
                            forceSelection: true,
                            emptyText: 'Select a state',
                            listeners: {
                                change: 'onStateChange'
                            }
                        },
                        {
                            xtype: 'combo',
                            reference: 'county',
                            name: 'county',
                            fieldLabel: 'County',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{counties}'
                            },
                            typeAhead: true,
                            forceSelection: true
                        },
                        {
                            fieldLabel: 'PIC',
                            reference: 'pic',
                            name: 'pic'
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Search',
                    reference: 'search',
                    iconCls: 'fa fa-search',
                    handler: 'onSearch'
                },
                {
                    text: 'Reset',
                    iconCls: 'fa fa-undo',
                    handler: 'onReset'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            itemId:'gridPharmacies',
            bind: '{pharmacies}',
            listeners: {
                rowdblclick: 'onRecordSelect'
            },
            columns: [
                {
                    text: 'NCPDP',
                    width: 80,
                    dataIndex: 'NCPDPID'
                },
                {
                    text: 'NPI',
                    width: 100,
                    dataIndex: 'NPI'
                },
                {
                    text: 'Pharmacy Name',
                    flex: 1,
                    dataIndex: 'NAME'
                },
                {
                    text: 'PIC',
                    width: 130,
                    dataIndex: 'PIC'
                },
                {
                    text: 'Address',
                    width: 150,
                    dataIndex: 'address1'
                },
                {
                    text: 'City',
                    width: 100,
                    dataIndex: 'city'
                },
                {
                    text: 'State',
                    width: 70,
                    dataIndex: 'state'
                },
                {
                    text: 'Zip',
                    width: 100,
                    dataIndex: 'zip'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{pharmacies}',
                displayInfo: true,
                hideRefresh: true
            }
        }
    ]
});
