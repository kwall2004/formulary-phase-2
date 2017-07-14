Ext.define('Atlas.finance.view.claim.ClaimSearch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-claimsearch',

    controller: 'finance-claimsearch',
    viewModel: 'finance-claimsearch',

    title: 'Claim Audit Search',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        anchor: '100%'
    },
    items: [{
        xtype: 'form',
        reference: 'claimsearchform',
        defaultButton: 'search',
        defaults: {
            margin: 5
        },
        items: [{
            xtype: 'fieldset',
            defaults: {
                labelWidth: 110
            },
            items: [{
                xtype: 'datefield',
                name: 'dateFrom',
                itemId: 'dateFrom',
                fieldLabel: 'Date From:',
                flex:0.5,
                format: 'm/d/Y',
                value: Ext.Date.add(new Date(), Ext.Date.DAY, -7),
                listeners: {
                    focusleave: 'onLeaveDatefield'
                }
            },{
                xtype: 'datefield',
                name: 'dateTo',
                itemId: 'dateTo',
                fieldLabel: 'Date To:',
                flex:0.5,
                format: 'm/d/Y',
                value: new Date((new Date()).setHours(0, 0, 0, 0)),
                listeners: {
                    focusleave: 'onLeaveDatefield'
                }
            },{
                xtype: 'textfield',
                name: 'claimId',
                fieldLabel: 'Claim ID',
                maskRe: /[0-9]/,
                flex:0.5
            },{
                xtype: 'combo',
                name: 'reasonCode',
                fieldLabel: 'Reason Code',
                displayField: 'name',
                flex:0.5,
                valueField: 'value',
                bind: {
                    store: '{reasoncode}'
                },
                publishes: 'value',
                queryMode: 'local',
                typeAhead: true,
                forceSelection: true
            },{
                xtype: 'combo',
                name: 'errorCode',
                fieldLabel: 'Error Code',
                displayField: 'name',
                flex:0.5,
                valueField: 'value',
                bind: {
                    store: '{errorcode}'
                },
                publishes: 'value',
                queryMode: 'local',
                typeAhead: true,
                forceSelection: true
            },{
                xtype: 'combo',
                name: 'resolutionCode',
                fieldLabel: 'Resolution Code',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    store: '{resolutioncode}'
                },
                publishes: 'value',
                queryMode: 'local',
                typeAhead: true,
                flex:0.5,
                forceSelection: true
            }]
        }],
        buttons: [{
            text: 'Search',
            reference: 'search',
            iconCls: 'x-fa fa-search',
            handler: 'onSearch'
        },{
            text: 'Reset',
            iconCls: 'x-fa fa-rotate-left',
            handler: 'onReset'
        },'->']
    },{
        xtype: 'grid',
        reference: 'claimauditsearchgrid',
        bind: {
            store: '{claimauditsearch}'
        },
        flex: 1,
        scrollable: true,
        tbar: [{
            text: 'Export to Excel',
            iconCls: 'x-fa fa-file-excel-o',
            handler: 'onExport'
        }],
        columns: {
            items: [{
                text: 'Source',
                dataIndex: 'source'
            },{
                xtype: 'widgetcolumn',
                text: 'Claim ID',
                dataIndex: 'transactionId',
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-folder',
                    handler: 'onColumnBtn',
                    bind: {
                        hidden: '{!record.notZeroClaim}'
                    }
                }
            },{
                xtype: 'widgetcolumn',
                text: 'Adjusted Claim ID',
                dataIndex: 'adjustedTransId',
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-folder',
                    handler: 'onColumnBtn',
                    bind: {
                        hidden: '{!record.notZeroAdjClaim}'
                    }
                }
            },{
                xtype: 'widgetcolumn',
                text: 'Reversed Claim ID',
                dataIndex: 'RevClaimId',
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-folder',
                    handler: 'onColumnBtn',
                    bind: {
                        hidden: '{!record.notZeroRevClaim}'
                    }
                }
            },{
                xtype: 'widgetcolumn',
                text: 'NCPDP ID',
                dataIndex: 'NCPDPId',
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-home',
                    handler: 'onColumnBtn',
                    bind: {
                        hidden: '{!record.notZeroNcpdpId}'
                    }
                }
            },{
                text: 'Pharmacy Name',
                dataIndex: 'PharmacyName',
                width: 150
            },{
                xtype: 'widgetcolumn',
                text: 'Recipient ID',
                dataIndex: 'RecipientId',
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-user',
                    handler: 'onColumnBtn',
                    bind: {
                        hidden: '{!record.notZeroRecipName}'
                    }
                }
            },{
                text: 'Member Name',
                dataIndex: 'MemberName',
                width: 150
            }, {
                text: 'Plan ID',
                dataIndex: 'PlangroupId',
                hidden: true
            },{
                text: 'Plan Name',
                dataIndex: 'PlanGroupName'
            },{
                text: 'Response File Name',
                dataIndex: 'auditFileName'
            },{
                text: 'Response Upload Date',
                xtype: 'datecolumn',
                dataIndex: 'auditFileUploadDate',
                format: 'm/d/Y H:i:s'
            },{
                text: 'Resolution File Name',
                dataIndex: 'auditRespFilename'
            },{
                text: 'Resolution Upload Date',
                xtype: 'datecolumn',
                dataIndex: 'auditRespFileUploadDate',
                format: 'm/d/Y H:i:s'
            },{
                text: 'Reason Code',
                dataIndex: 'auditReasonCode'
            },{
                text: 'Reason Description',
                dataIndex: 'auditReasonDesc',
                width: 150
            },{
                text: 'Error Code',
                dataIndex: 'auditErrorCode'
            },{
                text: 'Error Description',
                dataIndex: 'auditErrorDesc',
                width: 150
            },{
                text: 'Resolution Code',
                dataIndex: 'resolutionCode'
            },{
                text: 'Resolution Description',
                dataIndex: 'resolutionDesc',
                width: 150
            },{
                text: 'Source Notes',
                dataIndex: 'SourceNotes',
                width: 150
            },{
                text: 'Resolution Notes',
                dataIndex: 'resolutionNotes',
                width: 150
            },{
                text: 'Adjustment Type',
                dataIndex: 'takebackType'
            },{
                text: 'Adjusted Quantity',
                dataIndex: 'adjustedQty'
            },{
                text: 'Adjusted Amount',
                dataIndex: 'adjustedAmount'
            },{
                text: 'Adjusted Days Supply',
                dataIndex: 'adjustedDaysSupply'
            },{
                text: 'Rebill Quantity',
                dataIndex: 'rebillQty'
            },{
                text: 'Rebill Days Supply',
                dataIndex: 'rebillDaysSupply'
            },{
                text: 'Recoverable Amount',
                dataIndex: 'RecoveryAmt'
            },{
                text: 'Ingredients Cost',
                dataIndex: 'ingCostPaid'
            },{
                text: 'Disp Paid Amount',
                dataIndex: 'dispFeePaid'
            },{
                text: 'Patient Paid Amount',
                dataIndex: 'patPaidAmt'
            },{
                text: 'Total Paid Amount',
                dataIndex: 'totalAmtPaid'
            },{
                text: 'Actual Amount Recovered',
                dataIndex: 'AmountSaved'
            }]
        },
        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            pageSize: 25,
            //keepParams: true,
            /*bind: {
                store: '{claimauditsearch}'
            }*/
            doRefresh: function(){
                this.store.loadPage(1);
            },
            listeners: {
                beforeChange: 'getSelectedPageData'
            }
        }]
    }]
});