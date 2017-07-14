/**
 * Created by T4317 on 9/8/2016.
 */
Ext.define('Atlas.common.view.sharedviews.Claims', {
    extend: 'Ext.panel.Panel',
    xtype: 'common-claims',
    controller: 'common-claims',
    viewModel: 'shared-claims',

    layout:{
        type:'vbox',
        align:'stretch'
    },
    width : '100%',
    height : '100%',

    items: [
        {
            xtype: 'form',
            collapsible: true,
            itemId: 'formSelection',
            title: 'Selection',
            cls: 'card-panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '0 0 10 0',
                    defaults: {
                        labelWidth: 120,
                        width: 300
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'ServiceStartDt',
                            fieldLabel: 'Service Date From',
                            itemId: 'serviceStartDt',
                            reference: 'serveDateFrom',
                            bind: '{fromDate}',
                            format: 'm/d/Y',
                            value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                            maxText: "The Date in this Field must be on or before {0}",
                            listeners: {
                                validitychange:'validateDateRange',
                                select: 'validateDateRange'
                            }
                        }, {
                            xtype: 'datefield',
                            name: 'ServiceEndDt',
                            fieldLabel: 'Service Date To',
                            itemId: 'serviceEndDt',
                            reference: 'serveDateTo',
                            bind: '{toDate}',
                            value: new Date(),
                            format: 'm/d/Y',
                            altFormats:'m/d/Y|m/d/y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j',
                            minText: "The date in this field must be on or after {0}",
                            listeners: {
                                validitychange:'validateDateRange',
                                select: 'validateDateRange'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Claim status',
                            displayField: 'name',
                            valueField: 'value',
                            value: '',
                            queryMode: 'local',
                            reference: 'claimStatus',
                            bind: {
                                store: '{claimstatusstore}'
                            },
                            name: 'claimStatus',
                            forceSelection: true
                        },
                        {
                            // xtype: 'textfield',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            fieldLabel: 'Auth ID',
                            emptyText: '[Auth ID]',
                            reference: 'authId',
                            name: 'authID'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 120,
                        width: 300
                    },
                    items: [
                        {
                            xtype: 'membertypeahead',
                            fieldLabel: 'Member',
                            matchFieldWidth: false,
                            emptyText: '[e.g. John]',
                            name: 'member',
                            reference: 'recipientIdClaims',
                            bind: {
                                disabled: '{!memberTypeAheadIsEnabled}'
                            },
                            valueField: 'trecipientID'
                        },
                        {
                            xtype: 'drugtypeahead',
                            fieldLabel: 'Drug',
                            matchFieldWidth: false,
                            emptyText: '[e.g. Nexium]',
                            name: 'ndc',
                            reference: 'ndc',
                            bind: {
                                disabled: '{!drugTypeAheadIsEnabled}'
                            },
                            valueField: 'NDC',
                            displayField: 'LN'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'GCN',
                            emptyText: '[e.g. 6818]',
                            name: 'pcGcnSeq',
                            reference: 'gcndirect',
                            bind: {
                                disabled: '{!gcnTypeAheadIsEnabled}'
                            }
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 130',
                            width: 110,
                            text: 'Search',
                            iconCls: 'x-fa fa-search',
                            handler: 'onClaimsSearch'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 120,
                        width: 350
                    },
                    items: [
                        {
                            xtype: 'providertypeahead',
                            fieldLabel: 'Pharmacy NCPDP',
                            name: 'pcPharmID',
                            matchFieldWidth: false,
                            reference: 'ncpdpidClaims',
                            emptyText: '[Target Pharmacy MI 48188]',
                            bind: {
                                disabled: '{!pharmacyTypeAheadIsEnabled}'
                            },
                            valueField: 'ncpdpId'

                        },
                        {
                            xtype: 'prescribertypeahead',
                            fieldLabel: 'Prescriber',
                            matchFieldWidth: false,
                            reference: 'npiClaims',
                            displayField:'fullname',
                            valueField:'npi',
                            emptyText: '[e.g. Dr. Smith]',
                            name: 'pcPrescrID',
                            bind: {
                                disabled: '{!prescriberTypeAheadIsEnabled}',
                                emptyText: '{masterrecord.fullname}'
                            }
                        },
                        {
                            // xtype: 'textfield',
                            xtype: 'numberfield',
                            hideTrigger: true,
                            fieldLabel: 'Rx Number',
                            name: 'pcRxNum',
                            reference: 'rxid'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId: 'gridClaim',
            plugins: 'gridfilters',
            flex: 8,
            margin: '5 0 0 0',
            anchor: '100%',
            height : '100%',
            viewConfig: {
                stripeRows: true,
                getRowClass: function (record, index) {
                    var result = "";
                    if (record.data.source == 'CarveOut') {
                        result = 'disabled-row';
                    }
                    return result;
                }
            },
            bind: {
                store: '{claims}'
            },
            listeners: {
                itemDblClick: 'gridItem_DblClick'
            },
            columns: {
                items: [
                    {text: '#', dataIndex: 'rowNum', hidden: true},
                    { text: 'Claim #', dataIndex: 'claimID', width: 140, filter: {
                        type: 'string'
                    }},
                    { text: 'Medication', dataIndex: 'medication', width: 180, filter: {
                        type: 'string'
                    }},
                    {text: 'NDC', dataIndex: 'ndc', width: 120},
                    {text: 'GCN', dataIndex: 'gcnseq', width: 80},
                    {text: 'GPI', dataIndex: 'GPICode', width: 130},
                    {text: 'ETC', dataIndex: 'ETCName', width: 180},
                    {text: 'Source', dataIndex: 'source', width: 80},
                    {
                        text: 'Service Date',
                        dataIndex: 'svcdate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        width: 110
                    },
                    {
                        text: 'Transaction Date',
                        dataIndex: 'transdate',
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        width: 110
                    },
                    {text: 'Status', dataIndex: 'stat', width: 80},
                    {
                        xtype: 'widgetcolumn',
                        text: 'Auto Generate CD',
                        width: 160,hideable:false,
                        widget: {
                            xtype: 'button',
                            text: 'Auto Generate CD',
                            iconCls: 'x-fa fa-long-arrow-right',
                            handler: 'AutoGenrateCDOnClick'
                        },
                        renderer: function (value, meta, rec) {
                            if (rec.data.stat != 'Rejected') {
                                meta.style = "display: none";
                            }
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        text: 'Create Override',
                        width: 160,hideable:false,
                        widget: {
                            xtype: 'button',
                            text: 'Create Override',
                            iconCls: 'x-fa fa-long-arrow-right',
                            handler: 'AutoGenrateCDOnClick'
                        },
                        renderer: function (value, meta, rec) {
                            if (rec.data.stat != 'Rejected') {
                                meta.style = "display: none";
                            }
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        text: 'Process Test Claim',
                        width: 160,hideable:false,
                        widget: {
                            xtype: 'button',
                            text: 'Process Test Claim',
                            iconCls: 'x-fa fa-long-arrow-right',
                            handler: 'ProcessOnClick'
                        },
                        renderer: function (value, meta, rec) {
                            if (rec.data.stat != 'Rejected') {
                                meta.style = "display: none";
                            }
                        }
                    },
                    {text: 'Qty', dataIndex: 'qty', width: 60},
                    {text: 'Days Supply', dataIndex: 'supply', width: 100},
                    { text: 'Rx ID', dataIndex: 'rxid', width: 80, filter: {
                        type: 'string'
                    }},
                    {text: 'Pharmacy Name', dataIndex: 'rxname', width: 160},
                    {text: 'Member ID', dataIndex: 'memberID', width: 130},
                    {text: 'First Name', dataIndex: 'memFirstName', width: 160},
                    {text: 'Last Name', dataIndex: 'memLastName', width: 160},
                    {text: 'Group', dataIndex: 'planGroupName', width: 130},
                    {text: 'Carrier', dataIndex: 'Carrier', width: 145},
                    {text: 'Account', dataIndex: 'Account', width: 120},
                    {text: 'LOB', dataIndex: 'LOB', width: 120},
                    {text: 'Prescriber NPI', dataIndex: 'npi', width: 110},
                    {text: 'Prescriber Name', dataIndex: 'drname', width: 130},
                    {text: 'IngCost Paid', dataIndex: 'ingCostPaid', formatter: 'usMoney', align: 'end', width: 110},
                    {text: 'DispFee Paid', dataIndex: 'dispFeePaid', formatter: 'usMoney', align: 'end', width: 110},
                    {text: 'TotalAmt Paid', dataIndex: 'totalAmtPaid', formatter: 'usMoney', align: 'end', width: 110},


                    {text: 'Admin Fee', dataIndex: 'AdminFee', formatter: 'usMoney', align: 'end', width: 110},
                    {
                        xtype: 'numbercolumn',
                        text: 'AWP',
                        dataIndex: 'AWPPrice',
                        format: '$0,0.00000',
                        align: 'end',
                        width: 110
                    },
                    {text: 'GER Amount Owed', dataIndex: 'GERIngCost', formatter: 'usMoney', align: 'end', width: 140},
                    {text: 'Rebate', dataIndex: 'RebateAmount', formatter: 'usMoney', align: 'end', width: 110},
                    {text: 'Facility ID', dataIndex: 'FacilityId', width: 110}
                ]
            },
            reference: 'claimsGrid',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{claims}',
                    pageSize: 25,
                    displayInfo: true,
                    dock: 'bottom'
                },
                {
                    xtype: 'toolbar',
                    //ui: 'footer',
                    dock: 'top',
                    items: [{
                        text:'Export to Excel',
                        bind: {
                            disabled: '{!isRecordExists}'
                        },
                        iconCls: 'x-fa fa-file-excel-o',
                        handler: 'onExportToExcel'
                    }, {
                        text: 'Export to PDF',
                        bind: {
                            disabled: '{!isRecordExists}'
                        },
                        iconCls: 'x-fa fa-file-pdf-o',
                        tooltip: 'There is 1000 records limit for Claim History PDF report.',
                        handler: 'onExportToPDF'
                    }]
                } /*{
                 //TODO this style needs to go into the theme stylesheet, but with all the merge issues, I'm not even going there right now.
                 xtype: 'container',
                 html: "<style>.disabled-row{background-color: lightgrey;}</style>"
                 }*/
            ]
        }

    ]

});
