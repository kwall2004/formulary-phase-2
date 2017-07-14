Ext.define('Atlas.finance.view.audit.AdvancedSearch', {
    extend: 'Ext.Window',
    controller: 'finance-audit-advsearch',

    viewModel: {
        type: 'finance-audit-advsearch'
    },

    title: 'Search Takeback(s) By',
    iconCls: 'x-fa fa-search',
    width: 1100,
    height: 700,
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
                            xtype: 'providertypeahead',
                            fieldLabel: 'Pharmacy',
                            name: 'cbxPhar',
                            displayField: 'Name',
                            valueField: 'ncpdpId',
                            forceSelection : true,
                            bind:{
                                disabled: '{!isPharChecked}'
                            },
                            emptyText: '[NCPDP NPI PharmacyName]'
                        },
                        {
                            fieldLabel: 'Rx #',
                            name: 'rxNum'
                        },
                        {
                            fieldLabel: 'Audit Claim ID',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            name: 'auditClaimId'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            defaults: {
                                anchor: '100%',
                                labelWidth: 110
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Process Date:',
                                    name: 'processDateFrom',
                                    reference: 'processDateFrom',
                                    format: 'm/d/Y',
                                    width: 275,
                                    listeners: {
                                        focusleave: 'onLeaveDate'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'processDateTo',
                                    reference: 'processDateTo',
                                    format: 'm/d/Y',
                                    width: 155,
                                    listeners: {
                                        focusleave: 'onLeaveDate'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger: true,
                            fieldLabel: 'New Claim ID',
                            name: 'newClaimId'
                        }
                    ]
                }
            ],
            buttons: [
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
            reference: 'auditAdvSearchGrid',
            bind: '{advsearchresults}',
            listeners: {
                rowdblclick: 'onRecordSelect'
            },
            columns: {
                defaults: {
                    hidden: true
                },
                items: [{
                    text: 'Audit ID',
                    dataIndex: 'auditId',
                    hidden: false
                },
                {
                    text: 'Audit Type',
                    dataIndex: 'auditType',
                    hidden: false
                },
                {
                    xtype: 'datecolumn',
                    text: 'Audit Complete Date',
                    flex: 1,
                    dataIndex: 'auditCompleteDate',
                    format: 'm/d/Y',
                    hidden: false
                },
                {
                    text: 'Script Id',
                    dataIndex: 'scriptId'
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Claim ID',
                    dataIndex: 'transactionId',
                    widget: {
                        xtype: 'button',
                        handler: 'onClickClaim'
                    },
                    onWidgetAttach: 'widgetAttach',
                    hidden: false
                },
                {
                    text: 'Rx Num',
                    dataIndex: 'rxNum',
                    hidden: false
                },
                {
                    text: 'NCPDP ID',
                    dataIndex: 'ncpdpid',
                    hidden: false
                },
                {
                    text: 'Pharmacy Name',
                    dataIndex: 'pharmacyName',
                    flex: 2,
                    hidden: false
                },
                {
                    text: 'Service Date',
                    dataIndex: 'serviceDate',
                    renderer: 'renderSvcDate'
                },
                {
                    text: 'Qty',
                    dataIndex: 'qty',
                    renderer: 'renderQty'
                },
                {
                    text: 'Total Amt.',
                    dataIndex: 'totalAmt'
                },
                {
                    text: 'Takeback Type',
                    dataIndex: 'takebackTypeDescr',
                    flex: 1,
                    hidden: false
                },
                {
                    text: 'Reason',
                    dataIndex: 'reason'
                },
                {
                    text: 'Takeback Qty',
                    dataIndex: 'takebackQty'
                },
                {
                    text: 'Takeback Amount',
                    dataIndex: 'takebackAmount'
                },
                {
                    xtype: 'widgetcolumn',
                    text: 'Adjusted Claim ID',
                    dataIndex: 'adjustTransId',
                    widget: {
                        xtype: 'button',
                        cls: 'auditBtn',
                        handler: 'onClickClaim'
                    },
                    onWidgetAttach: 'widgetAttach'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Process Date',
                    flex: 1,
                    dataIndex: 'processDate',
                    format: 'm/d/Y',
                    hidden: false
                },
                {
                    text: 'New Total Amt.',
                    dataIndex: 'newTotalAmt',
                    renderer: function (v) {
                        return '<span class="m-red-color">' + v + '</span>';
                    }
                },
                {
                    text: 'Days Supply',
                    dataIndex: 'daysSupply'
                },
                {
                    text: 'Medication',
                    dataIndex: 'medication'
                },
                {
                    text: 'GCN',
                    dataIndex: 'gcnseqno'
                },
                {
                    text: 'GPI',
                    dataIndex: 'GPICode'
                },
                {
                    text: 'System ID',
                    dataIndex: 'systemID'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Last Modified Date',
                    dataIndex: 'lastModified',
                    format: 'm/d/Y'
                }]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{advsearchresults}',
                displayInfo: true,
                hideRefresh: true
            }
        }
    ]
});
