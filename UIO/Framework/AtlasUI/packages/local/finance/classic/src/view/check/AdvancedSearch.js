Ext.define('Atlas.finance.view.check.AdvancedSearch', {
    extend: 'Ext.Window',
    controller: 'finance-check-advsearch',
    viewModel: {
        type: 'finance-check-advsearch'
    },

    title: 'Search by',
    iconCls: 'x-fa fa-search',
    width: 900,
    height: 550,
    modal: true,
    resizable : false,
    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'form',
            reference: 'searchCriteriaRef',
            layout: 'hbox',
            // layout: 'column',
            height: 205,
            defaultButton: 'search',
            /*defaults: {
                margin: 5,
                defaults: {
                    // anchor: '100%',
                    labelWidth: 110
                }
            },*/
            items: [
                {
                    xtype: 'container',
                    height: '100%',
                    layout: 'vbox',
                    flex: 1,
                    defaults: {
                        flex: 1,
                        listeners: {
                            change: 'rdgSearchByRef_Change'
                        }
                    },
                    items : [
                        /*{
                         xtype: 'radiogroup',
                         reference: 'rdgSearchByRef',
                         groupName: 'radInitType',
                         columnWidth: 0.25,
                         columns: 1,
                         listeners: {
                         change: 'rdgSearchByRef_Change'
                         },
                         items: [
                         {
                         xtype : 'radio',
                         name: 'filterRadios',
                         boxLabel: 'Relationship',
                         reference : 'rdRelationshipRef',
                         inputValue: 'rdRelationship'
                         },
                         {
                         xtype : 'radio',
                         name: 'filterRadios',
                         boxLabel: 'Pharmacy',
                         reference : 'rdPharmacyRef',
                         inputValue: 'rdPharmacy'
                         },
                         {
                         xtype : 'radio',
                         name: 'filterRadios',
                         boxLabel: 'PaycenterID',
                         reference : 'rdPaycenterRef',
                         inputValue: 'rdPaycenter'
                         },
                         {
                         xtype : 'radio',
                         name: 'filterRadios',
                         boxLabel: 'Check Date Only',
                         reference : 'rdCheckDateRef',
                         inputValue: 'rdCheckDate'
                         },
                         {
                         xtype : 'radio',
                         name: 'filterRadios',
                         boxLabel: 'Claim ID',
                         reference : 'rdClaimIdRef',
                         inputValue: 'rdClaimId'
                         }
                         ]
                         }
                         ]*/
                        {
                            xtype: 'radiofield',
                            name: 'filterRadios',
                            boxLabel: 'Relationship',
                            reference : 'rdRelationshipRef',
                            inputValue: 'rdRelationship'
                        },
                        {
                            xtype : 'radio',
                            name: 'filterRadios',
                            boxLabel: 'Pharmacy',
                            reference : 'rdPharmacyRef',
                            inputValue: 'rdPharmacy'
                        },
                        {
                            xtype : 'radio',
                            name: 'filterRadios',
                            boxLabel: 'PaycenterID',
                            reference : 'rdPaycenterRef',
                            inputValue: 'rdPaycenter'
                        },
                        {
                            xtype : 'radio',
                            name: 'filterRadios',
                            boxLabel: 'Check Date Only',
                            reference : 'rdCheckDateRef',
                            inputValue: 'rdCheckDate'
                        },
                        {
                            xtype : 'radio',
                            name: 'filterRadios',
                            boxLabel: 'Claim ID',
                            reference : 'rdClaimIdRef',
                            inputValue: 'rdClaimId'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    height: '100%',
                    flex: 2,
                    // columnWidth: 0.5,
                    defaults: {
                        width: '95%',
                        flex: 1
                    },
                    border: false,
                    items: [
                        {
                            xtype: 'relationshiptypeahead',
                            name: 'cbxRel',
                            displayField: 'name',
                            valueField: 'relationshipID',
                            forceSelection : true,
                            bind:{
                                disabled: '{!isRelChecked}'
                            },
                            emptyText: '[e.g. CVS MI]'

                        },
                        {
                            xtype: 'providertypeahead',
                            name: 'cbxPhar',
                            displayField: 'Name',
                            valueField: 'ncpdpId',
                            forceSelection : true,
                            bind:{
                                disabled: '{!isPharChecked}'
                            },
                            emptyText: '[e.g. Target Pharmacy MI 48188]'
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtPaycenterID',
                            bind:{
                                disabled: '{!isPayChecked}'
                            },
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            name: 'cbxCheckDate',
                            bind: {
                                store: '{storeCheckDate}',
                                disabled: '{!isChkDateChecked}'
                            },
                            queryMode: 'local',
                            displayField: 'checkDate',
                            valueField: 'checkDate',
                            disabled : true,
                            emptyText: 'Select a Check Date'
                        },
                        {
                            xtype: 'textfield',
                            name: 'txtClaimID',
                            bind:{
                                disabled: '{!isClaimChecked}'
                            },
                            emptyText: '[Claim ID]',
                            maskRe: /[0-9]/
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    height: '100%',
                    flex: 1,
                    defaults: {
                        flex: 1
                    },
                    // columnWidth: 0.25,
                    items: [
                        {
                            xtype: 'combo',
                            name: 'chxCheckDateRel',
                            bind: {
                                store: '{storeCheckDate}',
                                disabled: '{!isRelChecked}'
                            },
                            queryMode: 'local',
                            displayField: 'checkDate',
                            valueField: 'checkDate',
                            disabled : true,
                            emptyText: 'Select a Check Date'
                        },
                        {
                            xtype: 'combo',
                            name: 'cbxCheckDatePhar',
                            bind: {
                                store: '{storeCheckDate}',
                                disabled: '{!isPharChecked}'
                            },
                            queryMode: 'local',
                            displayField: 'checkDate',
                            valueField: 'checkDate',
                            disabled : true,
                            emptyText: 'Select a Check Date'
                        },
                        {
                            xtype: 'combo',
                            name: 'cbxCheckDatePayID',
                            bind: {
                                store: '{storeCheckDate}',
                                disabled: '{!isPayChecked}'
                            },
                            queryMode: 'local',
                            displayField: 'checkDate',
                            valueField: 'checkDate',
                            disabled : true,
                            emptyText: 'Select a Check Date'
                        },
                        {
                            xtype: 'container',
                            flex: 2
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Export to Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'onExport',
                    bind: {
                        disabled: '{!isRecordExists}'
                    }
                },
                '->',
                {
                    text: 'Search',
                    reference: 'search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                },
                {
                    text: 'Reset',
                    iconCls: 'x-fa fa-rotate-left',
                    handler: 'onReset'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            reference: 'gridCheckMasterRef',
            listeners: {
                rowclick: 'onRecordSelect'
            },
            columns: [
                {
                    text: 'Check Num',
                    width: 100,
                    dataIndex: 'checkNum'
                },
                {
                    text: 'EFT ID',
                    dataIndex: 'eftTraceId'
                },
                {
                    text: 'Check Name',
                    flex: 1,
                    dataIndex: 'checkName'
                },
                {
                    text: 'Payee No',
                    dataIndex: 'vendorCode'
                },
                {
                    text: 'Check Amt',
                    dataIndex: 'checkAmt',
                    formatter : 'usMoney'
                },
                {
                    text: 'Status',
                    dataIndex: 'voidFlag'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Check Date',
                    width: 100,
                    dataIndex: 'checkDate'
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize : 15,
                itemId : 'searchGridPagingToolbar',
                items:[
                    {
                        xtype : 'displayfield',
                        width : 30,
                        fieldLabel : 'SUM'
                    },
                    {
                        xtype : 'displayfield',
                        userCls: 'm-red-color-displayfield',
                        bind: '{sum}'
                    }
                ],
                displayInfo: true,
                hideRefresh: true
            }
        }
    ]
});
