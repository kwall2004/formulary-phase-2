/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.AdvanceSearch', {
    extend: 'Ext.window.Window',
    xtype: 'casemanagementAdvanceSearch',
    //itemId : 'compoundgcnwindow',
    title: 'Advance Search',
    width: 1300,
    height: 500,
    scrollable: true,
    layout: 'border',
    items: [
        {
            region: 'north',
            xtype: 'form',
            itemId: 'formAdvance',
            layout: 'column',
            defaultButton: 'search',
            defaults: {
                xtype: 'container',
                layout: 'anchor',
                columnWidth: 0.33,
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
                            xtype: 'datefield',
                            fieldLabel: 'Effective From',
                            itemId: 'fromDate',
                            format : 'm/d/Y',
                            listeners: {
                                select: 'validateDateRange',
                                focusleave: 'onLeaveDate'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Effective To',
                            itemId: 'toDate',
                            format : 'm/d/Y',
                            listeners: {
                                select: 'validateDateRange',
                                focusleave: 'onLeaveDate'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'membertypeahead',
                            itemId: 'cbxMemberSearchAdvance',
                            emptyText: '[MemberID Name SSN MeridianRxID ]',
                            fieldLabel: 'Member', width: '30%',
                            listeners: {
                                select: 'onMemberSelection'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxStatusAdv',
                            fieldLabel: 'Case Status',
                            emptyText: 'Status',
                            displayField: 'name',
                            valueField: 'value',
                            queryMode: 'local',
                            bind: {
                                store: '{StoreCaseStatus}'
                            }
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cbxCaseManagerAdv',
                            fieldLabel: 'Case Manager',
                            emptyText: 'Select a Case Manager',
                            displayField: 'userName',
                            queryMode: 'local',
                            valueField: 'userName',
                            bind: {
                                store: '{StoreCaseManager}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxCaseDescAdv',
                            fieldLabel: 'Description',
                            emptyText: 'Select a description',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                store: '{StoreCaseDescription}'
                            }
                        }
                    ]
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'btnAddSearch_Click'
                },
                {
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'x-action-col-icon x-fa fa-undo',
                    handler: 'btnReset_Click'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Export To Excel',
                    itemId:'ExportToExcel',
                    disabled:true,
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'btnExportToExcelActionPlan'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'grid',
            itemId: 'MTMGridPanel',
            bind: '{StoreMTMCasesDetailsSearch}',
            listeners: {
                select: 'onRecordSelect'
            },
            columns: {
                items: [
                    {
                        text: 'Case ID',
                        dataIndex: 'MTMId'
                    },
                    {
                        text: 'Case Description',
                        dataIndex: 'description',
                        hidden: true
                    },
                    {
                        text: 'Status',
                        dataIndex: 'MTMStatus',
                        hidden: true
                    },
                    {
                        text: 'Days Open',
                        dataIndex: 'DaysOpen',
                        hidden: true
                    },
                    {
                        text: 'Case Mgr.',
                        dataIndex: 'caseManager'
                    },
                    {
                        text: 'Enroll Date',
                        dataIndex: 'EnrollDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'

                    },
                    {
                        text: 'Followup Date',
                        dataIndex: 'followupDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'
                    },
                    {
                        text: 'Last Contact Date',
                        dataIndex: 'lastContactDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'
                    },

                    {
                        text: 'Goal For Next Contact',
                        dataIndex: 'goalForNextContact'
                    },
                    {
                        text: 'Closed Date',
                        dataIndex: 'closedDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'
                    },
                    {
                        text: 'MRx ID',
                        dataIndex: 'RecipientId'
                    },
                    {
                        text: 'Member Name',
                        dataIndex: 'memberFullName'
                    },
                    {
                        text: 'Carrier',
                        dataIndex: 'CarrierName'
                    },

                    {
                        text: 'Account',
                        dataIndex: 'AccountName'
                    },
                    {
                        text: 'LOB',
                        dataIndex: 'LOBName'
                    },
                    {
                        text: 'Effective Date',
                        dataIndex: 'effDate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y'
                    },
                    {
                        text: 'Term Date',
                        dataIndex: 'termDate',
                        hidden: true
                    },
                    {
                        text: 'Referral Src.',
                        dataIndex: 'ReferralSource',
                        hidden: true
                    }
                    , {
                        text: 'Enroll Source',
                        dataIndex: 'EnrollSource',
                        hidden: true
                    },
                    {
                        text: 'Enroll Reason',
                        dataIndex: 'EnrollReason',
                        hidden: true
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                itemId: 'gridPagingToolbar',
                displayInfo: 'true',
                pageSize: 25,
                doRefresh: function () {
                    //this.store.loadPage(0);
                },
                listeners: {
                    beforechange: 'getSelectedPageData',
                    afterrender : function() {
                        this.child('#refresh').hide();
                    }
                }
            }


        }]
})