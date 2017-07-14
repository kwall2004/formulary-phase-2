Ext.define('Atlas.portals.prescriber.Main', {
    extend: 'Ext.container.Container',

    xtype: 'portalsprescribermain',

    title: 'Home',

    scrollable: 'y',

    controller: 'portalsPrescriberMainController',

    viewModel: 'portalsPrescriberMainModel',

    items: [
        {
            xtype: 'container',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            items: [
                {
                    xtype: 'container',

                    defaults: {
                        height: 350,
                        maxHeight: '350'
                    },

                    items: [
                        {
                            xtype: 'gridpanel',

                            cls: 'card-panel',

                            title: 'Claims (Last 30 Days)',

                            reference: 'claimsGrid',

                            columns: [
                                { text: 'Claim #', dataIndex: 'claimID', hidden: true },
                                { text: 'Member ID', flex: 1, dataIndex: 'memberID' },
                                { text: 'Name', flex: 1, dataIndex: 'memFullName' },
                                { text: 'Status', flex: 1, dataIndex: 'stat' },
                                { text: 'Medication', flex: 1, dataIndex: 'medication' },
                                { text: 'Service Date', flex: 1, dataIndex: 'svcdate',
                                    renderer: function (date) {
                                        if (date !== undefined) {
                                            return Atlas.common.utility.Utilities.formatDate(new Date(date), 'm/d/Y');
                                        }

                                        return '';
                                    }
                                },
                                { text: 'Plan', flex: 1, dataIndex: 'planGroupName' },
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    text: 'Create PA',
                                    items: [{
                                        xtype: 'button',
                                        handler: 'createPA',
                                        iconCls: 'x-fa fa-archive'
                                    }]
                                },
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    text: 'Hedis',
                                    items: [{
                                        xtype: 'button',
                                        handler: 'hedisAction',
                                        iconCls: 'x-fa fa-bell'
                                    }],
                                    renderer : function(value, meta, record) {
                                        this.items[0].hidden = record.get('HedisAlert') !== 'H';
                                    }
                                }
                            ],

                            bind: {
                                store: '{claimsHistory}'
                            },

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'combo',

                                        fieldLabel: 'Status',

                                        reference: 'claimsStatusCombo',

                                        displayField: 'text',

                                        valueField: 'value',

                                        listeners: {
                                            select: 'refreshPrescriberClaimHistory'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'portalmembertypeahead',

                                        reference: 'claimsMemberCombo',

                                        fieldLabel: 'Member',

                                        hideLabel: false,

                                        width: 350,

                                        listeners: {
                                            select: 'refreshPrescriberClaimHistory'
                                        }
                                    }
                                ]
                            },

                            plugins: [{
                                ptype: 'gridexporter'
                            }],

                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                items: [
                                    {
                                        xtype: 'button',
                                        cls: 'pagingToolbarButton',
                                        text: 'Search Claims',

                                        handler: 'goToClaims'
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'pagingToolbarButton',
                                        text: 'Export to Excel',

                                        handler: 'exportClaimsToExcel'
                                    }
                                ],
                                emptyMsg: 'No drugs to display.'
                            }
                        },
                        {
                            xtype: 'gridpanel',

                            cls: 'card-panel',

                            title: 'Hedis',

                            columns: [
                                { text: 'Member ID', dataIndex: 'memberid' },
                                { text: 'Name', flex: 1, dataIndex: 'memberName' },
                                { text: 'Measure', flex: 2, dataIndex: 'measureDesc' },
                                { text: 'Sub Measure', flex: 1, dataIndex: 'subMeasure' },
                                { text: 'Due By', dataIndex: 'dueBy',
                                    renderer: function (date) {
                                        if (date !== '') {
                                            return Atlas.common.utility.Utilities.formatDate(new Date(date), 'm/d/Y');
                                        }

                                        return '';
                                    }}
                            ],

                            bind: {
                                store: '{hedisAlerts}'
                            },

                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                emptyMsg: 'No drugs to display.'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',

                    defaults: {
                        height: 350,
                        maxHeight: '350'
                    },

                    items: [
                        {
                            xtype: 'gridpanel',

                            cls: 'card-panel',

                            title: 'Formulary Drug Search',

                            columns: [
                                { text: 'Label Name', dataIndex: 'LN', flex: 1 },
                                { text: 'Brand Name', dataIndex: 'BN', flex: 1 },
                                { text: 'Drug Type', dataIndex: 'DrugType' },
                                {
                                    text: 'Over-the-Counter',
                                    dataIndex: 'OTCInd',
                                    hidden: true,
                                    renderer: function (value, record) {
                                        if (value == 0) {
                                            return 'NO';
                                        } else if (value == 1) {
                                            return 'YES';
                                        }
                                    }
                                },
                                {
                                    text: 'Covered',
                                    dataIndex: 'Covered',
                                    renderer: function (value, record) {
                                        if (value == 'false') {
                                            return 'NO';
                                        } else if (value == 'true') {
                                            return 'YES';
                                        }
                                    }
                                },
                                {
                                    text: 'PA required',
                                    dataIndex: 'PAInd',
                                    hidden: true,
                                    renderer: function (value, record) {
                                        if (value == 'false') {
                                            return 'NO';
                                        } else if (value == 'true') {
                                            return 'YES';
                                        }
                                    }
                                },
                                { text: 'Drug Code', dataIndex: 'DrugCode', hidden: true },
                                { text: 'Strength', dataIndex: 'strength', hidden: true },
                                { text: 'Side Effect', dataIndex: 'SideEffect', hidden: true }
                            ],

                            bind: {
                                store: '{formularyDrugSearchResults}'
                            },

                            tbar: {
                                xtype: 'toolbar',

                                defaults: {
                                    minWidth: '350'
                                },

                                items: [
                                    {
                                        xtype: 'plangrouptypeahead',
                                        fieldLabel: 'Plan',
                                        labelWidth: 50,
                                        name: 'plan',
                                        reference: 'plan',
                                        listeners: {
                                            select: 'refreshDrugSearch'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'drugtypeahead',
                                        name: 'drugSearch',
                                        emptyText: '[e.g. ACETAMINOPHEN]',
                                        reference: 'drugSearch',
                                        fieldLabel: 'Medication',
                                        labelWidth: 95,
                                        listeners: {
                                            select: 'refreshDrugSearch'
                                        }
                                    }
                                ]
                            },

                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                emptyMsg: 'No drugs to display.',
                                items: {
                                    xtype: 'button',
                                    cls: 'pagingToolbarButton',
                                    text: 'Advanced Search',
                                    handler: 'goToDrugSearch'
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',

                            cls: 'card-panel',

                            title: 'Prior Authorizations (Last 30 Days)',

                            bind: {
                                store: '{priorAuthHistory}'
                            },

                            reference: 'paGrid',

                            plugins: [{
                                ptype: 'gridexporter'
                            }],

                            columns: [
                                { text: 'Auth ID', dataIndex: 'AuthID' },
                                { text: 'Member', flex: 2, dataIndex: 'memberName' },
                                { text: 'Status', dataIndex: 'authStatus' },
                                {
                                    text: 'Created On',
                                    dataIndex: 'createDate',
                                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                                },
                                { text: 'Plan', flex : 1, dataIndex: 'PlanGroupName' },
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    text: 'Hedis',
                                    width: 100,
                                    items: [{
                                        xtype: 'button',
                                        handler: 'hedisAction',
                                        iconCls: 'x-fa fa-bell'
                                    }],
                                    renderer : function(value, meta, record) {
                                        this.items[0].hidden = record.get('HedisAlert') !== 'H';
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    text: 'Contact Us',
                                    items: [{
                                        xtype: 'button',
                                        handler: 'showContact',
                                        iconCls: 'x-fa fa-phone'
                                    }]
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'combo',

                                        reference: 'authStatus',

                                        fieldLabel: 'Auth Status',

                                        emptyText: 'Select a status',
                                        
                                        displayField: 'ListDescription',

                                        queryMode: 'local',

                                        valueField: 'charString',

                                        bind: {
                                            store: '{priorAuthList}'
                                        },
                                        
                                        listeners: {
                                            select: 'refreshPriorAuth'
                                        }
                                    },
                                    '->',
                                    {
                                        xtype: 'button',
                                        text: 'Export to Excel',
                                        iconCls: 'x-fa fa-file-excel-o',
                                        handler: 'exportToExcel'
                                    }
                                ]
                            },

                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                emptyMsg: 'No drugs to display.',
                                items: [
                                    {
                                        xtype: 'button',
                                        cls: 'pagingToolbarButton',
                                        text: 'View All Prior Authorizations',

                                        handler: 'goToPriorAuthPage'
                                    }
                                ]
                            }
                        },
                        {
                            xtype: 'gridpanel',

                            cls: 'card-panel',

                            title: 'Communications',

                            bind: {
                                store: '{prescriberLetters}'
                            },

                            columns: [
                                { text: 'Description', flex: 1, dataIndex: 'DESCRIPTION' },
                                { text: 'Date', flex: 1, dataIndex: 'displayDate',
                                renderer: Ext.util.Format.dateRenderer('m/d/Y')},
                                {
                                    xtype: 'actioncolumn',
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center',
                                    text: 'View',
                                    items: [{
                                        xtype: 'button',
                                        handler: 'getDocument',
                                        iconCls: 'x-fa fa-paperclip'
                                    }]
                                }
                            ],

                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true,
                                emptyMsg: 'No drugs to display.'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});