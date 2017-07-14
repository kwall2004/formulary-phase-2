/**
 * Created by T4317 on 10/13/2016.
 */
Ext.define('Atlas.claims.view.ClaimsToolbar', {
    extend: 'Ext.tab.Panel',
    xtype: 'claims-claimstoolbar',
    controller: 'claims-toolbar',
    viewModel: 'claims-claimstoolbar',
    title: 'Claims Details',
    dockedItems: [{
        dockOrder: 'top:-1',
        xtype: 'toolbar',
        cls: 'claims',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Claim ID:',
            labelWidth: 100,
            maskRe: /[0-9]/,
            reference: 'claimbox',
            emptyText: '[Claim ID]',
            width: 250,
            listeners: {
                specialkey: 'onSpecialKeyClaimSearch'
            }
        },
            '->',
            {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                text: 'Advanced Search',
                tooltip: 'Search by Advanced',
                handler: 'onAdvacnedSearch'

            }, {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                reference: 'createPa',
                text: 'Create PA',
                disabled: true,
                listeners: {
                    click: 'AutoGenrateCDOnClick'
                }
            }, {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                reference: 'override',
                text: 'Create override',
                disabled: true,
                listeners: {
                    click: 'AutoGenrateCDOnClick'
                }
            }, {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                disabled: true,
                reference: 'pharm',
                text: 'Pharmacy Transaction',
                listeners: {
                    click: 'pharmacyTransaction_Click'
                }
            }, {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                reference: 'paForm',
                text: 'Send PA Form',
                handler: 'onSendPA',
                disabled: true
            }, {
                xtype: 'button',
                cls: 'claimsToolbarBtn',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            }]
    }, {
        xtype: 'toolbar',
        cls: 'claims',
        dockOrder: 'top:-2',
        defaults: {
            xtype: 'displayfield'
        },
        items: [{
            fieldLabel: 'Trans Type',
            labelWidth: 80,
            bind: {
                value: '{masterrecord.transactionCode}'
            }
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            fieldLabel: 'Service Date',
            labelWidth: 100,
            bind: {
                value: '{masterrecord.svcDateFormat}'
            }
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            fieldLabel: 'Transaction Date/Time',
            labelWidth: 150,
            bind: {
                value: '{masterrecord.transDateTime}'
            }
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            bind: {
                html: '<span style="color:red">Status: {masterrecord.respStatusFormat}</span>'
            }
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'splitbutton',
            cls: 'claimsSplitbtn',
            text: 'Bin/PCN/RxID',
            menu: [{
                xtype: 'panel',
                cls: 'borderNone',
                layout: 'vbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Bin#',
                    labelWidth: 40,
                    bind: {
                        value: '{masterrecord.rxBin}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'PCN#',
                    labelWidth: 40,
                    bind: {
                        value: '{masterrecord.PCN}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'RxID#',
                    labelWidth: 40,
                    bind: {
                        value: '{masterrecord.rxNum}'
                    }
                }]
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'button',
            margin: '7',
            text: 'Reverse Claim',
            tooltip: 'Reverse this paid B1 trans.',
            bind: {
                hidden: '{!canReversable}'
            },
            handler: 'onReverseClaim'
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            fieldLabel: 'Group',
            labelWidth: 60,
            bind: {
                value: '{masterrecord.planGroupName}'
            }
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            fieldLabel: 'Version',
            labelWidth: 60,
            bind: {
                value: '{masterrecord.versionNum}'
            }
        }]
    }, {
        xtype: 'toolbar',
        cls: 'claims',
        dockOrder: 'top:-3',
        defaults: {
            xtype: 'displayfield'
        },
        items: [{
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'MeridianRx ID'
            }, {
                xtype: 'button',
                margin: '7',
                bind: {
                    text: '{masterrecord.recipientID}'
                },
                handler: 'routeToMember'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'splitbutton',
            cls: 'claimsSplitbtn',
            text: 'Card Holder Info',
            menu: [{
                xtype: 'panel',
                cls: 'borderNone',
                layout: 'vbox',
                items: [{
                    xtype: 'displayfield',
                    fieldLabel: 'Card Holder ID',
                    bind: {
                        value: '{masterrecord.insuredId}'
                    }
                }, {
                    xtype: 'displayfield',
                    fieldLabel: 'Card Holder Name',
                    labelWidth: 120,
                    bind: {
                        value: '{masterrecord.insuredFullName}'
                    }
                }]
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'NDC',
                labelWidth: 40
            }, {
                xtype: 'button',
                margin: '7',
                bind: {
                    text: '{masterrecord.NDC}'
                },
                handler: 'routeToDrugSearch'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Prescriber NPI'
            }, {
                xtype: 'button',
                margin: '7',
                bind: {
                    text: '{masterrecord.prescriberNPI}'
                },
                handler: 'routeToPrescriber'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'

        }, {
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Pharmacy ID',
                labelWidth: 80
            }, {
                xtype: 'button',
                margin: '7',
                bind: {
                    text: '{masterrecord.ncpdpID}'
                },
                handler: 'routeToPharmacy'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                reference: 'lblOrgClaimID',
                fieldLabel: 'OrgClaimID',
                labelWidth: 40,
                bind: {
                    hidden: '{!tranCodeB1B2}'
                }
            }, {
                xtype: 'button',
                reference: 'orgClaimID',
                tooltip: 'OrgClaimID',
                margin: '7',
                bind: {
                    hidden: '{!tranCodeB1B2}',
                    text: '{masterrecord.reversedTranId}'
                },
                handler: 'routeToClaims'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            cls: 'claimsBtn',
            layout: 'hbox',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Auth ID',
                labelWidth: 40
            }, {
                xtype: 'button',
                margin: '7',
                bind: {
                    text: '{masterrecord.authID}'
                },
                handler: 'routeToCDAG'
            }]
        }, {
            xtype: 'container',
            html: '<span style="color:rgba(106,106,106, 0.6)">|</span>'
        }, {
            xtype: 'container',
            bind: {
                html: '<span style="color:red">{masterrecord.SourceIdentity}</span>'
            }
        }]
    }],
    items: []

});
