/**
 * Created by mkorivi on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FDBDrugSearch', {
    extend: 'Ext.panel.Panel',
    controller: 'fdbdrugsearch',
    viewModel: 'fdbdrugsearch',
    title: 'FDB Drug Search',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            autoScroll: true,
            overFlowX: 'scroll',
            overFlowY: 'scroll',
            title: 'Selection',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    minWidth: 1600,
                    items: [
                        {
                            xtype: 'etctypeahead',
                            itemId: 'cbxETC',
                            fieldLabel: 'ETC',
                            displayField: 'ETC_NAME',
                            valueField: 'ETC_ID',
                            typeAhead: false,
                            loadingText: 'Searching...',
                            emptyText: '[e.g. Analgesics]',
                            listWidth: '500',
                            minChars: 3,
                            width: 400
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'GCN',
                            itemId: 'txtGCN',
                            emptyText: '[e.g 4169]',
                            width: 400
                        },
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'cbxNDC',
                            fieldLabel: 'NDC/LN',
                            displayField: 'NDC',
                            valueField: 'NDC',
                            typeAhead: false,
                            loadingText: 'Searching...',
                            emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                            forceSelection: false,
                            width: 400,
                            listWidth: '500'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    minWidth: 1600,
                    items: [
                        {
                            xtype: 'drugtypeahead',
                            itemId: 'cbxBN',
                            fieldLabel: 'BN',
                            displayField: 'BN',
                            valueField: 'BN',
                            typeAhead: false,
                            loadingText: 'Searching...',
                            emptyText: '[e.g. ACETAMINOPHEN-CODEINE]',
                            forceSelection: false,
                            listWidth: '500',
                            width: 400
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'RxCUI',
                            itemId: 'txtRxCUI',
                            emptyText: '[e.g 104097]',
                            width: 400

                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Formulary Only',
                            width: 400,
                            typeAhead: true,
                            forceSelection: false,
                            itemId: 'cbxFormularyList',
                            emptyText: 'Formulary List',
                            listWidth: '500',
                            pageSize: '10',
                            bind: {
                                store: '{StoreFormularyList}'
                            },
                            tpl: Ext.create('Ext.XTemplate',
                                '</Html>'
                                + '<tpl for=".">'
                                + '<tpl if="xindex == 1">'
                                + '<table style="width: 100%;">'
                                + '<tr>'
                                + '<th style="font-weight: bold; padding: 3px; width: 250px;">Formulary</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 100px;">Version</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 100px;">Status</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 250px;">Effective Date</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 250px;">Term. Date</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 100px;">Data Src.</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 100px;">Type</th>'
                                + '</tr>'
                                + '</tpl>'
                                + '<tr class="x-boundlist-item">'
                                + '<td style="padding:3px 0px;">{FormularyName}</td>'
                                + '<td style="padding:3px 0px;">{FormularyVersion}</td>'
                                + '<td style="padding:3px 0px;">{StatDesc}</td>'
                                + '<td style="padding:3px 0px; width: 230px;">{EffectiveDate:date("m/d/Y")}</td>'
                                + '<td style="padding:3px 0px; width: 230px;">{TerminationDate:date("m/d/Y")}</td>'
                                + '<td style="padding:3px 0px;">{dataSource}</td>'
                                + '<td style="padding:3px 0px;">{formularyType}</td>'
                                + '</tr>'
                                + '<tpl if="xindex==0">'
                                + '</table>'
                                + '</tpl>'
                                + '</tpl>'
                                + '</Html>'),
                            listeners: {
                                select: 'cbxFormularyList_OnSelect'

                            },
                            reference: 'formularylistcombo',
                            queryMode: 'local',
                            name: 'formularylist',
                            displayField: 'FormularyName',
                            valueField: 'FormularyID'

                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Active Drugs Only',
                            itemId: 'chkInactive',
                            padding: '0,0,0,10'
                        },

                        {
                            xtype: 'button',
                            text: 'Search',
                            iconCls: 'fa  fa-search',
                            handler: 'onSearch'

                        },
                        {
                            xtype: 'box',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            text: 'Export To Excel',
                            iconCls: 'fa fa-file-excel-o',
                            handler: 'btnExportClick'
                        }
                    ]


                }
            ]
        },
        {
            xtype: 'grid',
            itemId:'fdbDrug',
            flex : 1,
            bind: {
                store: '{StoreDrugSearch}'
            },
            columns: [
                {
                    text: 'NDC',
                    dataIndex: 'DRUGCODE'
                },
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    hideable: false,
                    items: [{
                        // Use a URL in the icon config
                        iconCls: 'x-fa fa-arrow-circle-right',
                        // Use a URL in the icon config
                        tooltip: 'Drug Details',
                        handler: 'btnDrugDetails_CLick'

                    }]

                },


                {
                    text: 'Label Name',
                    dataIndex: 'LN'

                },
                {
                    text: 'Brand Name',
                    dataIndex: 'BN'

                },
                {
                    text: 'Drug Type',
                    dataIndex: 'DRUGTYPE'

                },
                {
                    text: 'GCN',
                    dataIndex: 'GCN_SEQNO'

                },
                {
                    text: 'RxCUI',
                    dataIndex: 'RxCUI'

                },
                {
                    text: 'Manufacturer',
                    dataIndex: 'Manufacturer'

                },
                {
                    text: 'HIC3',
                    dataIndex: 'H3Code'

                },
                {
                    text: 'OTC',
                    dataIndex: 'OTCIND'

                },
                {
                    text: 'ETC',
                    dataIndex: 'ETC_NAME_Calculated',
                    width: 250
                },
                {
                    text: 'Ult. Parent ETC',
                    dataIndex: 'ULTPARENTETC_NAME'
                },
                {
                    text: 'Dosage',
                    dataIndex: 'DOSAGE'
                },
                {
                    text: 'Route of Admin.',
                    dataIndex: 'ROUTOFADMIN'
                },
                {
                    text: 'Strength',
                    dataIndex: 'STRENGTH'
                },
                {
                    text: 'Formularies',
                    dataIndex: 'FORMULARIES'
                },
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    hideable: false,
                    items: [{
                        // Use a URL in the icon config
                        iconCls: 'x-fa fa-user-md',
                        // Use a URL in the icon config
                        tooltip: 'Drug Formulary Information',
                        handler: 'btnDrugInfo_CLick'

                    }]

                },
                {
                    text: 'Coverage Gap',
                    dataIndex: 'CoverageGapDrug'
                },
                {
                    text: 'AWP (Unit)',
                    dataIndex: 'AWPUntPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'AWP (Pkg)',
                    dataIndex: 'AWPPkgPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'WAC (Unit)',
                    dataIndex: 'WACUntPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'WAC (Pkg)',
                    dataIndex: 'WACPkgPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'FUL',
                    dataIndex: 'FFPUL',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'SWP (Unit)',
                    dataIndex: 'SWPUntPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'SWP (Pkg)',
                    dataIndex: 'SWPPkgPrc',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'MAC',
                    dataIndex: 'MACprc',
                    xtype: 'numbercolumn',
                    renderer: function (value) {
                        if (value > 0) {
                            return '$' + value;
                        }
                        else {
                            return '$0.0000';
                        }
                    }
                },
                {
                    text: 'FormIdVersionList',
                    dataIndex: 'formIdVsn'
                },
                {
                    text: 'Maintenance',
                    dataIndex: 'MaintenanceDrug'
                }, {
                    text: 'Rx Count- YTD',
                    dataIndex: 'totRxYtd'
                },
                {
                    text: 'Qty Count- YTD',
                    dataIndex: 'totQtyYtd'
                },
                {
                    text: 'Ing Count- YTD',
                    dataIndex: 'totIngYtd'
                },
                {
                    text: 'Ing Avg.- YTD',
                    dataIndex: 'avgIngYtd'
                },
                {
                    text: 'Mkt. Rx- YTD',
                    dataIndex: 'mktRxYtd'
                },
                {
                    text: 'Mkt. Qty- YTD',
                    dataIndex: 'mktQtyYtd'
                },
                {
                    text: 'Mkt. Ing- YTD',
                    dataIndex: 'mktIngYtd'
                }


            ],
            plugins: [
                {
                    ptype: 'gridexporter'
                }
            ],
            dockedItems: [
                {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    hideRefresh:true,
                    bind: '{StoreDrugSearch}',
                    displayInfo: true,
                    pageSize: 25
                }
            ]
        }]
});