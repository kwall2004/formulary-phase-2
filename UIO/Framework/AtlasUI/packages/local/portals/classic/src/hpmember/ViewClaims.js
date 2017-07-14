/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - View Claims
 * Description: View for the Claims Page
 */
Ext.define('Atlas.portals.view.hpmember.ViewClaims', {
    extend: 'Ext.container.Container',
    title: 'View Claims',
    reference: 'viewClaimsRef',
    xtype: 'portals-hpmember-viewClaims',
    controller: 'portalsMemberMHPViewClaimsController',
    viewModel: 'portalsMemberMHPViewClaimsViewModel',
    scrollable: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            title: 'View Claims',
            cls: 'card-panel',
            layout: 'hbox',
            region: 'north',

            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'container',
                    scrollable: true,
                    region: 'left',
                    defaults: {
                        minWidth:  500,
                        labelWidth: 110,
                        style: {
                            padding: '5px'
                        }
                    },
                    items: [
                        {
                            xtype: 'combo',
                            reference: 'familyCombo',
                            fieldLabel: 'Member',
                            name: 'Family',
                            itemId: "familyCombo",
                            hiddenName: 'familyCombo',
                            displayField: 'name',
                            valueField: 'value',
                            listeners: {
                                select: 'onFamilySelected'
                            },
                            emptyText: 'Select a type'
                        },
                        {
                            xtype: 'textfield',
                            reference: 'statusRef',
                            readOnly: true,
                            fieldLabel: 'Status'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'From',
                            reference: 'dateFrom',
                            value: Ext.Date.add(new Date(), Ext.Date.MONTH, -3),
                            maxValue: new Date()
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To',
                            reference: 'dateTo',
                            value: new Date()
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Status',
                            reference: 'claimsStatusCombo',
                            displayField: 'text',
                            valueField: 'value',
                            listeners: {
                                beforerender: 'loadStatuses'
                            }
                        },
                        {
                            xtype: 'container',
                            items: {
                                xtype: 'button',
                                text: 'Search',
                                iconCls: 'fa fa-search',
                                handler: 'onSearchClick',
                                width: 200
                            }
                        }
                    ]
                }, {
                    xtype: 'container',
                    region: 'center',
                    scrollable: true,
                    defaults: {
                        style: {
                            padding: '5px 5px 5px 75px'
                        }
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            reference: 'infoDisplay1Ref'
                        }, {
                            xtype: 'displayfield',
                            reference: 'infoDisplay2Ref',
                            hidden: true
                        },
                        {
                            xtype: 'displayfield',
                            reference: 'infoDisplay3Ref'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'Claim Summary',
            cls: 'card-panel',
            flex: 2,
            defaults: {
                flex: 1
            },
            columns: [{
                text: 'Benefit Plan',
                dataIndex: 'benefitPlanDescription'
            },
                {
                    text: 'Service Date',
                    dataIndex: 'serviceDate',
                    renderer: function (value) {
                        return Ext.util.Format.date(value, 'm/d/Y');
                    }
                },
                {
                    text: 'Provider Name',
                    dataIndex: 'serviceProviderName',
                    flex: 2
                },
                {
                    text: 'Claim #',
                    dataIndex: 'claimNumber'
                },
                {
                    text: 'Status',
                    dataIndex: 'claimStatusDesc',
                    renderer: function (value) {
                        if ((value != 'Pending') && (value != 'Paid') && (value != 'Denied')) {
                            return 'Pending';
                        }
                        return value;
                    }
                },
                {
                    xtype: 'actioncolumn',
                    menuDisabled: true,
                    sortable: false,
                    align: 'center',
                    hideable: false,
                    items: [
                        {
                            xtype: 'button',
                            handler: 'onStatusClick',
                            iconCls: 'x-fa fa-info-circle'
                        }
                    ],
                    renderer: function (value, meta, record) {
                        this.items[0].hidden = !(record.get('claimStatusDesc') === 'Denied');
                    }
                },
                {
                    text: 'Date Paid',
                    dataIndex: 'paidDate',
                    renderer: function (value) {
                        return Ext.util.Format.date(value, 'm/d/Y');
                    }
                },
                {
                    text: 'Amount Billed',
                    dataIndex: 'totalCharge',
                    flex: 2,
                    renderer: function (value, field) {
                        return Ext.util.Format.currency(value);
                    }
                },
                {
                    text: 'Allowed Amount',
                    dataIndex: 'allowableAmount',
                    flex: 2,
                    renderer: function (value, field) {
                        return Ext.util.Format.currency(value);
                    }
                },
                {
                    text: 'Amount Paid',
                    dataIndex: 'totalPaid',
                    flex: 2,
                    renderer: function (value, field) {
                        return Ext.util.Format.currency(value);
                    }
                },
                {
                    text: 'Amount You Owe',
                    dataIndex: 'memberLiability',
                    flex: 2,
                    renderer: function (value, field) {
                        return Ext.util.Format.currency(value);
                    }
                }
            ],
            bind: {
                store: '{claimsDetailPaged}'
            },
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                pageSize: 10,
                bind: {
                    store: '{claimsDetailPaged}'
                },
                displayInfo: true
            }]
        }]
});