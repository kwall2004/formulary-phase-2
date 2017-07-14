Ext.define('Atlas.pharmacy.view.Pharmacy', {
    extend: 'Ext.tab.Panel',
    title: 'Pharmacy',

    controller: 'pharmacy',
    viewModel: 'pharmacy',

    defaults: {
        closable: true
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'box',
                    html: ' Search by'
                },
                {
                    xtype: 'segmentedbutton',
                    items: [
                        {
                            text: 'NCPDP',
                            hint: '[NCPDP]',
                            action: 'ncpdpId',
                            pressed: true
                        },
                        {
                            text: 'NPI',
                            hint: '[NPI]',
                            action: 'npi'
                        }
                    ],
                    listeners: {
                        toggle: 'onSearchTypeToggle'
                    }
                },
                {
                    xtype: 'uxsearchfield',
                    reference: 'searchfield',
                    maskRe: /[0-9.]/,
                    width: 150,
                    //value: '2300034', // This one has letters, contact logs and claims.
                    //value: '2356752', // Claims and Contact Log
                    //value: '0102183', // has relationships
                    //value: '2311239', // for testing (has Ownership details)
                    //value: '2300159', // for testing (has Audit info, closed date should be shown red)
                    bind: {
                        emptyText: '{searchEmptyText}'
                    },
                    listeners: {
                        search: 'onSearch'
                    }
                },
                {
                    text: 'Advanced Search',
                    handler: 'onAdvancedSearch'
                },
                {
                    xtype: 'box',
                    bind: {
                        hidden:'{!activePharmacy}',
                        html: '{activePharmacy.name} | {activePharmacy.locCity}, {activePharmacy.locState}, {activePharmacy.locPhone:formatPhone}'
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
        }
    ]
});
