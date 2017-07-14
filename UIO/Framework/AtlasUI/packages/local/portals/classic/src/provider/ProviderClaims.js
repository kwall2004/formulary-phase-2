Ext.define('Atlas.portals.view.provider.ProviderClaims', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderClaims',
    title: 'Claim Status',
    requires: [
        'Ext.grid.filters.Filters',
        'widget.hiddenfield'
    ],

    controller: 'portalsproviderclaims',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    viewModel: {
        stores: {
            claimTypes: {
                model: 'Ext.data.Model',
                data: [
                    {key: 'All', value: 'ALL'},
                    {key: 'HCFA', value: 'Professional Claims'},
                    {key: 'UB92', value: 'Institutional Claims'}
                ],
                autoLoad: true
            },
            claimStatus: {
                type: 'provider-listitem',
                pListName: 'claimStatusCode',
                includeAll: true,
                autoLoad: true
            },
            claims: {
                type: 'provider-providerclaimsearchresults'
            },
            claimsdetail: {
                model: 'Atlas.portals.provider.model.RemitDetailWeb'
            }
        }
    },

    items: [{
        xtype: 'container',
        items: [
            {
                xtype: 'form',
                cls: 'card-panel',
                reference: 'claimsForm',
                title: 'Selections ',
                scrollable: true,
                layout: {
                    type: 'hbox',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'combobox',
                        reference: 'claimTypeDrop',
                        fieldLabel: 'Type',
                        labelWidth: 'auto',
                        displayField: 'value',
                        valueField: 'key',
                        forceSelection: true,
                        allowBlank: true,
                        value: 'All',
                        queryMode: 'local',
                        autoLoad: true,
                        bind: {
                            store: '{claimTypes}'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'From',
                        value: Ext.Date.add(new Date(), Ext.Date.DAY, -45),
                        maxValue: new Date(),
                        name: 'fromDate',
                        reference: 'claimDtTxt',
                        //altFormats: 'm/d/Y|m/d/y|m/j/Y|m/j/y|n/d/Y|n/d/Y|n/d/y|n/j/Y|n/j/y',
                        altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                        format: 'm/d/Y',
                        labelWidth: 'auto',
                        listeners: {
                            change: 'onFromDateChange'
                        }
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'To',
                        value: new Date(),
                        maxValue: new Date(),
                        name: 'toDate',
                        reference: 'claimToDtTxt',
                        altFormats: 'm/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                        format: 'm/d/Y',
                        labelWidth: 'auto',
                        listeners: {
                            change: 'onToDateChange'
                        }
                    },
                    {
                        xtype: 'combobox',
                        name: 'claimStatus',
                        reference: 'claimStatusDrop',
                        fieldLabel: 'Status',
                        labelWidth: 'auto',
                        displayField: 'name',
                        valueField: 'id',
                        forceSelection: true,
                        allowBlank: true,
                        value: 'All',
                        queryMode: 'local',
                        autoLoad: true,
                        bind: {
                            store: '{claimStatus}'
                        }
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'center'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Member ID',
                                reference: 'memberId',
                                labelWidth: 'auto',
                                listeners: {
                                    blur: 'onMemberIdBlur'
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                handler: 'openMemberSearch'
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        name: 'patientAccountNumber',
                        reference: 'ptnAccountNumTxt',
                        fieldLabel: 'Patient Acc#',
                        labelWidth: 'auto'
                    },
                    {
                        xtype: 'hiddenfield',
                        reference: 'claimRetrievedRecipientId'
                    },
                    {
                        xtype: 'button',
                        text: 'Search',
                        handler: 'processClaimSearch'
                    }
                ]
            },
            {
                xtype: 'grid',
                cls: 'card-panel',
                title: 'Claims',
                height: 350,
                bind: '{claims}',
                enableColumnHide: true,
                enableColumnMove: false,

                viewConfig: {
                    listeners: {
                        select: 'loadClaimDetails'
                    }
                },
                columns: [
                    {
                        text: 'Claim #',
                        width: 80,
                        dataIndex: 'claimNumber'
                    },
                    {
                        text: 'Edit/Resubmit',
                        xtype: 'actioncolumn',
                        align: 'center',
                        width: 120,
                        items: [{
                            iconCls: 'x-fa fa-pencil',  // Use a URL in the icon config
                            tooltip: 'Edit/Resubmit',
                            handler: 'editResubmitClaim',
                            getClass: function (value, meta, record) {
                                return (record.data.claimStatusDesc && record.data.claimStatusDesc == 'Rejected') ? 'x-fa fa-pencil' : 'x-hidden';
                            }
                        }]
                    },
                    {
                        text: 'Member ID',
                        width: 110,
                        dataIndex: 'dispMemberID',
                        sortable: false
                    },
                    {
                        text: 'Recipient ID',
                        width: 120,
                        dataIndex: 'recipientID',
                        hidden: true
                    },
                    {
                        text: '',
                        xtype: 'actioncolumn',
                        align: 'center',
                        width: 40,
                        sortable: false,
                        items: [{
                            iconCls: 'x-fa fa-download',  // Use a URL in the icon config
                            tooltip: 'Eligibility',
                            handler: 'claimEligibility'
                        }],
                        bind: {
                            hidden: '{!canViewEligibility}'
                        }
                    },
                    {
                        text: 'LOB',
                        width: 75,
                        dataIndex: 'lobID'
                    },
                    {
                        text: 'Member Name',
                        width: 160,
                        dataIndex: 'memberName',
                        sortable: false
                    },
                    {
                        text: 'Serv Date',
                        width: 100,
                        dataIndex: 'stmtFromDate',
                        formatter: 'date("m/d/Y")'
                    },
                    {
                        text: 'Bill Type',
                        width: 100,
                        dataIndex: 'billType',
                        sortable: false
                    },
                    {
                        text: 'POS',
                        width: 60,
                        dataIndex: 'pos',
                        sortable: false
                    },
                    {
                        text: 'Diag 1',
                        width: 80,
                        dataIndex: 'diagCd1',
                        sortable: false
                    },
                    {
                        text: 'Diag 2',
                        width: 80,
                        dataIndex: 'diagCd2',
                        sortable: false
                    },
                    {
                        text: 'Diag 3',
                        width: 80,
                        dataIndex: 'diagCd3',
                        sortable: false
                    },
                    {
                        text: 'Billed',
                        width: 80,
                        dataIndex: 'totalCharge',
                        sortable: false,
                        formatter: 'usMoney',
                        align: 'end'
                    },
                    {
                        text: 'Paid',
                        width: 80,
                        dataIndex: 'paidAmount',
                        sortable: false,
                        formatter: 'usMoney',
                        align: 'end'
                    },
                    {
                        text: 'Status',
                        width: 100,
                        dataIndex: 'claimStatusDesc',
                        sortable: false
                    },
                    {
                        text: 'Patient Acc#',
                        width: 120,
                        dataIndex: 'ptnAccountNum',
                        sortable: false
                    },
                    {
                        text: 'Form Type',
                        minWidth: 90,
                        dataIndex: 'formType',
                        sortable: false,
                        flex: 1
                    }
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    bind: '{claims}',
                    displayInfo: true,
                    hideRefresh: true,
                    emptyMsg: 'No data to display.'
                }
            },
            {
                xtype: 'grid',
                cls: 'card-panel',
                title: 'Claims Details',
                height: 350,
                bind: '{claimsdetail}',
                cls: 'card-panel',
                emptyText: 'No Details for this claim.',
                columns: [
                    {
                        text: 'Status',
                        dataIndex: 'claimStatus'
                    },
                    {
                        text: 'Line #',
                        width: 70,
                        dataIndex: 'lineNum'
                    },
                    {
                        text: 'Service Date',
                        dataIndex: 'servLnFromDate',
                        formatter: 'date("m/d/Y")'
                    },
                    {
                        text: 'Rev Code',
                        dataIndex: 'revCode'
                    },
                    {
                        text: 'Proc Code',
                        dataIndex: 'procCode'
                    },
                    {
                        text: 'Description',
                        width: 200,
                        dataIndex: 'procDesc'
                    },
                    {
                        text: 'NDC',
                        dataIndex: 'ndc'
                    },
                    {
                        text: 'Units',
                        dataIndex: 'Units'
                    },
                    {
                        text: 'Billed',
                        dataIndex: 'Billed',
                        formatter: 'usMoney',
                        align: 'end'
                    },
                    {
                        text: 'Denied',
                        dataIndex: 'Denied',
                        formatter: 'usMoney',
                        align: 'end'
                    },
                    {
                        text: 'Paid',
                        dataIndex: 'Paid',
                        formatter: 'usMoney',
                        align: 'end'
                    },
                    {
                        text: 'Check/EFT Number',
                        width: 170,
                        dataIndex: 'checkNum'
                    },
                    {
                        text: 'Check/EFT Date',
                        minWidth: 160,
                        dataIndex: 'checkdate',
                        formatter: 'date("m/d/Y")',
                        flex: 1
                    }
                ]
            }
        ]
    }]
});