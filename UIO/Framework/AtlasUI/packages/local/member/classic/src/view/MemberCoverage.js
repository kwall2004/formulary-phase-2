/*
 Last Developer: Kevin Tabasan
 Previous Developers: [Paul Glinski]
 Description: Coverage details for the member listing their coverage history, coverage details, COB Details
 */

Ext.define('Atlas.member.view.MemberCoverage', {
    extend: 'Ext.Container',
    xtype: 'member-membercoverage',
    itemId: 'membercoverage',
    title: 'Coverage',
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    bodyPadding: 5,

    defaults: {
        frame: true,
        bodyPadding: 5
    },

    items: [
        {
            title: 'Member Coverage History',
            flex: 1,
            margin: '0 0 5 0',
            xtype: 'grid',
            bind: {
                store: '{membercoveragehistorystore}'
            },

            columns: [{
                text: '#',
                dataIndex: 'rowNum',flex:1
            },{
                text: 'Member ID',
                dataIndex: 'tmemberId',flex:1
            },{
                text: 'Carrier',
                dataIndex: 'tCarrierName',flex:1
            },{
                text: 'LOB',
                dataIndex: 'tCarrierLOBName',flex:1
            },{
                text: 'Group',
                dataIndex: 'tPlanGroupName',flex:1
            },{
                xtype: 'datecolumn',
                text: 'Effective Date',
                dataIndex: 'tEffDate',flex:1,format:'m/d/Y'
            },{
                xtype: 'datecolumn',
                text: 'Termination Date',
                dataIndex: 'tTermDate',flex:1,format:'m/d/Y'
            },{
                text: 'Person Code',
                dataIndex: 'PersonCode',flex:1
            },{
                text: 'Coverage Code',
                dataIndex: 'coverageCode',flex:1
            },{
                text: 'Alt. Ins. Carrier',
                dataIndex: 'tAltInsCarrierName',flex:1
            },{
                text: 'Alt. Ins. Member ID',
                dataIndex: 'tAltInsMemberID',flex:1
            },{
                xtype: 'datecolumn',
                text: 'Override Through',
                dataIndex: 'altInsOverrideEndDate',flex:1,format:'m/d/Y'
            },{
                xtype: 'widgetcolumn',
                flex:1,
                text: 'History',hideable:false,
                widget: {
                    xtype: 'button',
                    iconCls: 'fa fa-search',
                    handler: 'coverageHistory'
                }
            }],

            // bbar: [{
            //     xtype: 'pagingtoolbar',
            //     width:'100%',
            //     bind: '{membercoveragehistorystore}'
            // }],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{membercoveragehistorystore}',
                    displayInfo: true,
                    dock: 'bottom'
                }
            ],

            listeners: {
                rowclick: 'memberCoverageHistoryRowClick'
            }
        },
        {
            title: 'Member Coverage Details Section',
            flex: 2,
            margin: '0 0 5 0',
            scrollable: true,
            xtype: 'form',
            reference: 'detailsForm',
            items: [
                {
                    xtype: 'fieldset',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    bodyPadding: 5,
                    defaults: {
                        frame: true,
                        bodyPadding: 5
                    },
                items: [
                    {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 5 0 0',
                    defaults: {
                        xtype: 'displayfield',
                        name: 'tEffDate'
                    },
                    items: [
                        {
                        fieldLabel: 'Effective Date',
                        name: 'tEffDate',
                        renderer: Ext.util.Format.dateRenderer('m/d/Y'),labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Term Date',
                        name: 'tTermDate',
                            renderer: Ext.util.Format.dateRenderer('m/d/Y'),labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Term Reason',
                        name: 'tTermReason',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Notify Date',
                        name: 'tNotifyDate',
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                if(value!="" && value !=null)
                                {
                                    var date=new Date(value);
                                    date.setDate(date.getDate() + 1);
                                    return Ext.Date.format(date, 'm/d/Y')
                                }
                                else
                                    return '';
                            },labelWidth:'15'
                        }
                        ]
                    },
                    {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 5 0 0',
                    defaults: {
                        xtype: 'displayfield'
                    },

                    items: [
                        {
                        fieldLabel: 'Member ID',
                        name: 'tmemberId',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Primary Member Name',
                        name: 'tPrimaryMemberName',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Spending Acc. Plan',
                        name: 'tPsenAccPln',labelWidth:'15'
                        }]
                },
                    {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 5 0 0',
                    defaults: {
                        xtype: 'displayfield'
                    },

                    items: [
                        {
                        fieldLabel: 'Primary Care Physician',
                        name: 'NPI',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Relationship',
                        name: 'tRelationshipCode'  ,labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Resp. County',
                        name: 'tRespCountyCode',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'County',
                        name: 'tCountyCode',labelWidth:'15'
                        }]
                }
                ]
                },
                {
                xtype: 'fieldset',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    bodyPadding: 5,
                    defaults: {
                        frame: true,
                        bodyPadding: 5
                    },
                items: [
                    {
                    xtype: 'container',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield'
                    },

                    items: [
                        {
                        fieldLabel: 'Carrier ID',
                        name: 'tCarrierID',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Carrier Name',
                        name: 'tCarrierName',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Carrier LOB Name',
                        name: 'tCarrierLOBName',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Carrier Acc #',
                        name: 'tCarrierAcctNumber',labelWidth:'15'
                        },
                        {
                            xtype:'container',
                            layout:'hbox',
                            items:[
                            {
                                xtype:'displayfield',
                                fieldLabel: 'Plan Benefit ID',
                                name: 'tPlanBenefitID',itemId:'benefitId',labelWidth:'15'
                            },
                            {
                                xtype:'button',
                                iconCls:'x-fa fa-arrow-right',
                                itemId:'btnBenefit',
                                handler:'openPlanBenefitView'
                            }
                        ]
                    },
                        {
                            xtype:'container',
                            layout:'hbox',
                            items:[
                            {
                                xtype:'displayfield',
                                fieldLabel: 'Plan Group ID',
                                name: 'tPlanGroupID',labelWidth:'15'
                            },
                            {
                                xtype:'button',
                                iconCls:'x-fa fa-arrow-right',
                                itemId:'btnPlan',
                                handler:'openPlanGroupView'
                            }
                        ]
                        },
                        {
                            fieldLabel: 'Plan Benefit Code',
                            name: 'planBenefitCode',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Plan Group Code',
                            name: 'tPlanGroupCode',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Plan Benefit Name',
                            name: 'planBenefitName',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Plan Group Name',
                            name: 'tPlanGroupName',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Program Group Code',
                            name: 'mcsProgGroupCode',labelWidth:'15'
                        }]
                },
                    {
                    xtype: 'container',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield'
                    },

                    items: [
                        {
                        fieldLabel: 'Alt Ins Ind',
                        //name: 'tAltInsInd',
                        name:'tAltInsIndYesNo',
                        labelWidth:'15'
                    },
                        {
                        fieldLabel: 'Alt Ins Mem ID',
                        name: 'tAltInsMemberID',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Alt Ins Carrier Name',
                        name: 'tAltInsCarrierName',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Alt Ins Rel',
                        name: 'tAltInsRelationShip',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Alt Ins Start Date',
                        name: 'AltInsStartDate',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Alt Ins End Date',
                        name: 'AltInsEndDate',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'FSA Ind',
                        name: 'tFSAIndicator',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'FSA ID',
                        name: 'tFSAID',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'APTC Member',
                            //name: 'hixAPTCMember',
                            name: 'hixAPTCMemberYesNo',
                            labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Grace Period Start',
                        name: 'hixDelinquentStartDt',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Benefit Reset Date',
                        name: 'benefitResetDate',labelWidth:'15'
                        }
                        ]
                },
                    {
                    xtype: 'container',
                    flex: 1,
                    defaults: {
                        xtype: 'displayfield'
                    },

                    items: [
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Alt Ins Override',
                            name: 'altInsOverride',
                            disabled: true,
                            itemId:'chkAltInsOverride',
                            listeners:{change:'onChange'}
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Override Through',
                            name: 'altInsOverrideEndDate',
                            disabled: true,
                            itemId:'dtAltInsOverrideEndDate'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-floppy-o',
                            text: 'Apply',
                            itemId:'btnApply',
                            disabled: true,
                            handler:'SaveOverrideDetails'
                        },
                        {
                        fieldLabel: 'LICS Ind',
                        name: 'tLICSInd',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'LICS Lev',
                        name: 'tLICSLev',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Waiver Group',
                        name: 'sparefield02',labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Person Code',
                        name: 'PersonCode',labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Foster Care',
                            name: 'fosterCareInd',
                            labelWidth:'15'
                        },
                        {
                            fieldLabel: 'Delinquent Member',
                            //name: 'hixDelinquentInd',
                            name: 'hixDelinquentIndYesNo',
                            labelWidth:'15'
                        },
                        {
                        fieldLabel: 'Grace Period End',
                        name: 'hixDelinquentEndDt',labelWidth:'15'
                        }
                        ]
                }
                    ]
                }
                ]
        },
        {
            title: 'Member COB Detail',
            flex: 1,
            xtype: 'grid',
            bind: {
                store: '{membercobdetailstore}'
            },

            columns: [{
                dataIndex: 'rowNum',
                text: '#',
                hidden: true
            },{
                dataIndex: 'HICNRRB',
                text: 'HICNRRB',
                hidden: true
            },{
                dataIndex: 'RxBin',
                text: 'Rx Bin'
            },{
                dataIndex: 'RxGroup',
                text: 'Rx Group'
            },{
                dataIndex: 'Carrier',
                text: 'Carrier'
            },{
                dataIndex: 'Policy',
                text: 'Policy #'
            },{
                dataIndex: 'rxID',
                text: 'Other Plan Member ID'
            },{
                dataIndex: 'CoverageCode',
                text: 'Coverage Code'
            },{
                xtype: 'datecolumn',
                dataIndex: 'EffDate',
                text: 'Effective Date'
            },{
                xtype: 'datecolumn',
                dataIndex: 'TermDate',
                text: 'Termination Date'
            },{
                xtype: 'datecolumn',
                dataIndex: 'PBMCreateDate',
                text: 'PBM Create Date'
            },{
                dataIndex: 'COB',
                text: 'COB Code'
            },{
                dataIndex: 'Relationship',
                text: 'Relationship Code'
            },{
                dataIndex: 'PayerOrder',
                text: 'Payer Order'
            },{
                dataIndex: 'PersonCode',
                text: 'Person Code'
            },{
                dataIndex: 'SuppTy',
                text: 'Supp Code'
            },{
                dataIndex: 'Seq',
                text: 'Seq'
            }],

            // bbar: [{
            //     xtype: 'pagingtoolbar',
            //     bind: '{membercobdetailstore}',
            //     width:'100%'
            // }]
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{membercobdetailstore}',
                    displayInfo: true,
                    dock: 'bottom'
                }
            ]

        }
    ]
});