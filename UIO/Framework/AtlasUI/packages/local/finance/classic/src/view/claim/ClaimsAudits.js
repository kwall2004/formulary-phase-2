Ext.define('Atlas.finance.view.claim.ClaimsAudits', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-claimsaudits',

    controller: 'finance-claimsaudits',
    viewModel: 'finance-claimsaudits',

    title: 'Claim Audits',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        anchor: '100%'
    },
    items: [{
        xtype: 'fieldset',
        title: 'Attachments',
        layout: 'hbox',
        items: [{
            xtype: 'displayfield',
            fieldLabel: 'Click to Upload'
        },{
            xtype: 'button',
            text: 'Upload',
            iconCls: 'x-fa fa-upload',
            handler: 'saveAttachment'
        }]
    },{
        layout: 'accordion',
        flex: 1,
        items: [{
            xtype: 'gridpanel',
            reference: 'responsequeue',
            bind: {
                store: '{responseQueue}',
                title: 'Response Queue ({responseRecCount})'
            },
            totalRecs: 0,
            columns: [{
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
                hidden: true,
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
                hidden: true,
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
            },{
                text: 'Plan Name',
                dataIndex: 'PlanGroupName'
            },{
                text: 'Response File Name',
                dataIndex: 'auditFileName',
                hidden: true
            },{
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                text: 'Response Upload Date',
                dataIndex: 'auditFileUploadDate',
                hidden: true
            },{
                text: 'Resolution File Name',
                dataIndex: 'auditRespFilename',
                hidden: true
            },{
                text: 'Resolution Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditRespFileUploadDate',
                hidden: true
            },{
                text: 'Reason Code',
                dataIndex: 'auditReasonCode',
                width: 120
            },{
                text: 'Reason Description',
                dataIndex: 'auditReasonDesc',
                width: 150
            },{
                text: 'Error Code',
                dataIndex: 'auditErrorCode',
                hidden: true
            },{
                text: 'Error Description',
                dataIndex: 'auditErrorDesc',
                hidden: true
            },{
                text: 'Resolution Code',
                dataIndex: 'resolutionCode',
                hidden: true
            },{
                text: 'Resolution Description',
                    dataIndex: 'resolutionDesc',
                    hidden: true
            },{
                text: 'Source Notes',
                dataIndex: 'SourceNotes',
                hidden: true
            },{
                text: 'Resolution Notes',
                dataIndex: 'resolutionNotes',
                hidden: true
            },{
                text: 'Adjustment Type',
                dataIndex: 'takebackType',
                hidden: true
            },{
                text: 'Adjusted Quantity',
                dataIndex: 'adjustedQty',
                hidden: true
            },{
                text: 'Adjusted Amount',
                dataIndex: 'adjustedAmount',
                hidden: true
            },{
                text: 'Adjusted Days Supply',
                dataIndex: 'adjustedDaysSupply',
                hidden: true
            },{
                text: 'Rebill Quantity',
                dataIndex: 'rebillQty',
                hidden: true
            },{
                text: 'Rebill Days Supply',
                dataIndex: 'rebillDaysSupply',
                hidden: true
            },{
                text: 'Recoverable Amount',
                dataIndex: 'RecoveryAmt',
                hidden: true
            },{
                text: 'Plan ID',
                dataIndex: 'PlangroupId',
                hidden: true
            },{
                text: 'Ingredients Cost',
                dataIndex: 'ingCostPaid',
                hidden: true
            },{
                text: 'Disp. Fee Paid',
                dataIndex: 'dispFeePaid',
                hidden: true
            },{
                text: 'Patient Paid Amt',
                dataIndex: 'patPaidAmt',
                hidden: true
            },{
                text: 'Total Amount Paid',
                dataIndex: 'totalAmtPaid',
                hidden: true
            },{
                text: 'Actual Amount Recovered',
                dataIndex: 'AmountSaved',
                hidden: true
            }],
            dockedItems: [{
                tbar: [{
                    xtype: 'textfield',
                    fieldLabel: 'Claim ID',
                    itemId: 'claimIdResponse',
                    labelWidth: 50,
                    width: 150,
                    name: 'claimId'
                },{
                    xtype: 'combobox',
                    fieldLabel: 'Reason Code',
                    displayField: 'name',
                    valueField: 'value',
                    bind: {
                        store: '{reasonCode}'
                    },
                    forceSelection: true,
                    queryMode: 'local',
                    multiSelect: true,
                    listConfig: {
                        getInnerTpl: function() {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {name} </div>';
                        }
                    }
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'Date Range:',
                    allowBlank: false,
                    format: 'm/d/Y',
                    listeners: {
                        focusleave: 'onLeaveDatefield'
                    },
                    labelWidth: 60,
                    itemId: 'dateFromResponse',
                    bind:{
                        value:'{fromDateResponse}',
                        maxValue: '{toDateResponse}'
                    }
                },{
                    xtype: 'datefield',
                    itemId: 'dateToResponse',
                    format: 'm/d/Y',
                    listeners: {
                        focusleave: 'onLeaveDatefield'
                    },
                    bind:{
                        value:'{toDateResponse}',
                        minValue: '{fromDateResponse}'
                    },
                    allowBlank: false
                },{
                    xtype: 'button',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                },{
                    xtype: 'button',
                    text: 'Reset',
                    iconCls: 'x-fa fa-rotate-left',
                    handler: 'onReset'
                }]
            },{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                itemId: 'toolbarResponseQueue',
                displayInfo: 'true',
                doRefresh: function(){
                    this.store.loadPage(1);
                },
                listeners: {
                    beforeChange: 'getSelectedPageData'
                }
            }]
        },{
            xtype: 'grid',
            reference: 'resolutionqueue',
            bind: {
                store: '{resolutionQueue}',
                title: 'Resolution Queue ({resolutionRecCount})'
            },
            totalRecs: 0,
            tbar: [{
                xtype: 'textfield',
                fieldLabel: 'Claim ID',
                itemId: 'claimIdResolution',
                labelWidth: 50,
                width: 150,
                name: 'claimId'
            },{
                xtype: 'combobox',
                fieldLabel: 'Error Code',
                displayField: 'name',
                valueField: 'value',
                bind: {
                    store: '{errorCode}'
                },
                forceSelection: true,
                queryMode: 'local',
                itemId: 'cbxErrorCode',
                multiSelect: true,
                listConfig: {
                    getInnerTpl: function() {
                        return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {name} </div>';
                    }
                }
            }, {
                xtype: 'datefield',
                fieldLabel: 'Date Range:',
                labelWidth: 60,
                allowBlank: false,
                itemId: 'dateFromResolution',
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{fromDateResolution}',
                    maxValue: '{toDateResolution}'
                }
            },{
                xtype: 'datefield',
                itemId: 'dateToResolution',
                allowBlank: false,
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{toDateResolution}',
                    minValue: '{fromDateResolution}'
                }
            },{
                xtype: 'button',
                text: 'Search',
                iconCls: 'x-fa fa-search',
                handler: 'onSearch'
            },{
                xtype: 'button',
                text: 'Reset',
                iconCls: 'x-fa fa-rotate-left',
                handler: 'onReset'
            }],
            columns: [{
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
                hidden: true,
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
                hidden: true,
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
            },{
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
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                text: 'Response Upload Date',
                dataIndex: 'auditFileUploadDate'
            },{
                text: 'Resolution File Name',
                dataIndex: 'auditRespFilename'
            },{
                text: 'Resolution Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditRespFileUploadDate'
            },{
                text: 'Reason Code',
                dataIndex: 'auditReasonCode',
                width: 120
            },{
                text: 'Reason Description',
                dataIndex: 'auditReasonDesc',
                width: 150
            },{
                text: 'Error Code',
                dataIndex: 'auditErrorCode'
            },{
                text: 'Error Description',
                dataIndex: 'auditErrorDesc'
            },{
                text: 'Resolution Code',
                dataIndex: 'resolutionCode'
            },{
                text: 'Resolution Description',
                dataIndex: 'resolutionDesc'
            },{
                text: 'Source Notes',
                dataIndex: 'SourceNotes'
            },{
                text: 'Resolution Notes',
                dataIndex: 'resolutionNotes'
            },{
                text: 'Adjustment Type',
                dataIndex: 'takebackType',
                hidden: true
            },{
                text: 'Adjusted Quantity',
                dataIndex: 'adjustedQty',
                hidden: true
            },{
                text: 'Adjusted Amount',
                dataIndex: 'adjustedAmount',
                hidden: true
            },{
                text: 'Adjusted Days Supply',
                dataIndex: 'adjustedDaysSupply',
                hidden: true
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
                dataIndex: 'ingCostPaid',
                hidden: true
            },{
                text: 'Disp. Fee Paid',
                dataIndex: 'dispFeePaid',
                hidden: true
            },{
                text: 'Patient Paid Amt',
                dataIndex: 'patPaidAmt',
                hidden: true
            },{
                text: 'Total Amount Paid',
                dataIndex: 'totalAmtPaid',
                hidden: true
            },{
                text: 'Actual Amount Recovered',
                dataIndex: 'AmountSaved'
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: 'true',
                doRefresh: function(){
                    this.store.loadPage(1);
                },
                listeners: {
                    beforeChange: 'getSelectedPageData'
                }
            }]
        },{
            xtype: 'grid',
            reference: 'takebacks',
            bind: {
                store: '{takeBacks}',
                title: 'Take Backs ({takebacksRecCount})'
            },
            totalRecs: 0,
            maskElement: 'body',
            tbar: [{
                xtype: 'textfield',
                fieldLabel: 'Claim ID',
                itemId: 'claimIdTakeBacks',
                labelWidth: 50,
                width: 150,
                name: 'claimId'
            }, {
                    fieldLabel: 'Resolution Code',
                    xtype: 'combobox',
                    itemId: 'iDresolutionCode',
                    displayField: 'ListDescription',
                    valueField: 'ListItem',
                    dataIndex: 'ListItem',
                    matchFieldWidth: true,
                    multiSelect: true,
                    forceSelection: true,
                    // editable: true,
                    triggerAction: 'all',
                    listConfig: {
                        getInnerTpl: function() {
                            return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {ListDescription} </div>';
                        }
                    },
                    queryMode: 'local',
                    bind: {
                        store: '{resolutionCode}'
                    }
                }
                ,{
                xtype: 'datefield',
                fieldLabel: 'Date Range:',
                labelWidth: 60,
                allowBlank: false,
                itemId: 'dateFromTakeBacks',
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{fromDateTakeBacks}',
                    maxValue: '{toDateTakeBacks}'
                }
            },{
                xtype: 'datefield',
                itemId: 'dateToTakeBacks',
                allowBlank: false,
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{toDateTakeBacks}',
                    minValue: '{fromDateTakeBacks}'
                }
            },{
                xtype: 'button',
                text: 'Search',
                iconCls: 'x-fa fa-search',
                handler: 'onSearch'
            },{
                xtype: 'button',
                text: 'Reset',
                iconCls: 'x-fa fa-rotate-left',
                handler: 'onReset'
            },
            '->',
            {
                xtype: 'button',
                text: 'Acknowledge',
                iconCls: 'x-fa fa-check',
                handler: 'onSaveTBProcess'
            }, {
                xtype: 'button',
                text: 'Update',
                iconCls: 'x-fa fa-pencil-square-o',
                handler: 'onSaveTBProcess'
            }],
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true
            },
            columns: [{
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
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if (rec.get('transactionId') !== 0){
                        widget.setVisible(true);
                    }
                }
            },{
                xtype: 'widgetcolumn',
                text: 'Adjusted Claim ID',
                dataIndex: 'adjustedTransId',
                hidden: true,
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-folder',
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if (rec.get('adjustedTransId') !== 0){
                        widget.setVisible(true);
                    }
                }
            },{
                xtype: 'widgetcolumn',
                text: 'Reversed Claim ID',
                dataIndex: 'RevClaimId',
                hidden: true,
                width: 110,
                widget: {
                    xtype: 'button',
                    width: 95,
                    iconCls: 'x-fa fa-folder',
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if (rec.get('RevClaimId') !== 0){
                        widget.setVisible(true);
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
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if (rec.get('NCPDPId') !== ''){
                        widget.setVisible(true);
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
                    handler: 'onColumnBtn'
                },
                onWidgetAttach: function(col, widget, rec) {
                    widget.setVisible(false);
                    if (rec.get('RecipientId') !== '0'){
                        widget.setVisible(true);
                    }
                }
            },{
                text: 'Member Name',
                dataIndex: 'MemberName',
                width: 150
            },{
                text: 'Plan Name',
                dataIndex: 'PlanGroupName'
            },{
                text: 'Response File Name',
                dataIndex: 'auditFileName'
            },{
                text: 'Response Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditFileUploadDate'
            },{
                text: 'Resolution File Name',
                dataIndex: 'auditRespFilename'
            },{
                text: 'Resolution Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditRespFileUploadDate'
            },{
                text: 'Reason Code',
                dataIndex: 'auditReasonCode',
                width: 120
            },{
                text: 'Reason Description',
                dataIndex: 'auditReasonDesc',
                width: 150
            },{
                text: 'Error Code',
                dataIndex: 'auditErrorCode'
            },{
                text: 'Error Description',
                dataIndex: 'auditErrorDesc'
            },{
                text: 'Resolution Code',
                dataIndex: 'resolutionCode'
            },{
                text: 'Resolution Description',
                dataIndex: 'resolutionDesc'
            },{
                text: 'Source Notes',
                dataIndex: 'SourceNotes'
            },{
                text: 'Resolution Notes',
                dataIndex: 'resolutionNotes'
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
                text: 'Plan ID',
                dataIndex: 'PlangroupId',
                hidden: true
            },{
                text: 'Ingredients Cost',
                dataIndex: 'ingCostPaid',
                hidden: true
            },{
                text: 'Disp. Fee Paid',
                dataIndex: 'dispFeePaid',
                hidden: true
            },{
                text: 'Patient Paid Amt',
                dataIndex: 'patPaidAmt',
                hidden: true
            },{
                text: 'Total Amount Paid',
                dataIndex: 'totalAmtPaid',
                hidden: true
            },{
                text: 'Actual Amount Recovered',
                dataIndex: 'AmountSaved',
                hidden: true
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: 'true'
            }]
        },{
            xtype: 'grid',
            reference: 'approvalqueue',
            bind: {
                store: '{approvalQueue}',
                title: 'Approval Queue ({approvalRecCount})'
            },
            totalRecs: 0,
            tbar: [{
                xtype: 'textfield',
                fieldLabel: 'Claim ID',
                itemId: 'claimIdApproval',
                labelWidth: 50,
                width: 150,
                name: 'claimId'
            },{
                xtype: 'datefield',
                fieldLabel: 'Date Range:',
                labelWidth: 60,
                itemId: 'dateFromApproval',
                allowBlank: false,
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{fromDateApproval}',
                    maxValue: '{toDateApproval}'
                }
            },{
                xtype: 'datefield',
                itemId: 'dateToApproval',
                allowBlank: false,
                format: 'm/d/Y',
                listeners: {
                    focusleave: 'onLeaveDatefield'
                },
                bind:{
                    value:'{toDateApproval}',
                    minValue: '{fromDateApproval}'
                }
            },{
                xtype: 'button',
                text: 'Search',
                iconCls: 'x-fa fa-search',
                handler: 'onSearch'
            },{
                xtype: 'button',
                text: 'Reset',
                iconCls: 'x-fa fa-rotate-left',
                handler: 'onReset'
            },
            '->',
            {
                xtype: 'button',
                text: 'Update',
                iconCls: 'x-fa fa-pencil-square-o',
                handler: 'onSaveTBProcess'
            }, {
                xtype: 'button',
                text: 'Acknowledge',
                iconCls: 'x-fa fa-check',
                handler: 'onSaveTBProcess'
            }, {
                xtype: 'button',
                text: 'Process',
                iconCls: 'x-fa fa-pencil',
                handler: 'onSaveTBProcess'
            }],
            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true
            },
            columns: [{
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
                hidden: true,
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
                hidden: true,
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
            },{
                text: 'Adjustment Type',
                dataIndex: 'takebackType'
            },{
                text: 'Adjusted Quantity',
                dataIndex: 'adjustedQty'
            },{
                text: 'Adjusted Days Supply',
                dataIndex: 'adjustedDaysSupply'
            },{
                text: 'Plan Name',
                dataIndex: 'PlanGroupName'
            },{
                text: 'Response File Name',
                dataIndex: 'auditFileName'
            },{
                text: 'Response Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditFileUploadDate'
            },{
                text: 'Resolution File Name',
                dataIndex: 'auditRespFilename'
            },{
                text: 'Resolution Upload Date',
                xtype: 'datecolumn',
                format: 'm/d/Y H:i:s',
                dataIndex: 'auditRespFileUploadDate'
            },{
                text: 'Reason Code',
                dataIndex: 'auditReasonCode',
                width: 120
            },{
                text: 'Reason Description',
                dataIndex: 'auditReasonDesc',
                width: 150
            },{
                text: 'Error Code',
                dataIndex: 'auditErrorCode'
            },{
                text: 'Error Description',
                dataIndex: 'auditErrorDesc'
            },{
                text: 'Resolution Code',
                dataIndex: 'resolutionCode'
            },{
                text: 'Resolution Description',
                dataIndex: 'resolutionDesc'
            },{
                text: 'Source Notes',
                dataIndex: 'SourceNotes'
            },{
                text: 'Resolution Notes',
                dataIndex: 'resolutionNotes'
            },{
                text: 'Adjusted Amount',
                dataIndex: 'adjustedAmount'
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
                text: 'Plan ID',
                dataIndex: 'PlangroupId',
                hidden: true
            },{
                text: 'Ingredients Cost',
                dataIndex: 'ingCostPaid',
                hidden: true
            },{
                text: 'Disp. Fee Paid',
                dataIndex: 'dispFeePaid',
                hidden: true
            },{
                text: 'Patient Paid Amt',
                dataIndex: 'patPaidAmt',
                hidden: true
            },{
                text: 'Total Amount Paid',
                dataIndex: 'totalAmtPaid',
                hidden: true
            },{
                text: 'Actual Amount Recovered',
                dataIndex: 'AmountSaved',
                hidden: true
            }],
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: 'true',
                doRefresh: function(){
                    this.store.loadPage(1);
                },
                listeners: {
                    beforeChange: 'getSelectedPageData'
                }
            }]
        }]
    }]
});