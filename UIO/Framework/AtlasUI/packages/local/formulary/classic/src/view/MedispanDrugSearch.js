/**
 * Created by mkorivi on 10/6/2016.
 */
Ext.define('Atlas.formulary.view.MedispanDrugSearch', {
    extend: 'Ext.panel.Panel',
    controller: 'medispandrugsearch',
    viewModel: 'medispandrugsearchbiewmodel',
    title: 'Medispan Drug Search',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            title: 'Selection',
            autoScroll: true,
            overFlowX: 'scroll',
            overFlowY: 'scroll',
            defaults: {
                bodyPadding: 5
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    minWidth: 1600,
                    items: [
                        {
                            xtype: 'gpitypeahead',
                            itemId: 'cbxGPI',
                            fieldLabel: 'GPI',
                            emptyText: '[e.g. Cycloserine]',
                            displayField: 'GPIName',
                            valueField: 'GPICode',
                            width: 400,
                            listConfig: {
                                getInnerTpl: function () {
                                    return '<h4>{GPIName}</h4>' +
                                        '<h5>GPI:{GPICode}, NDC-{NDC}</H5>';
                                }
                            },
                            listeners: {
                                select: 'SetCtrlValuesBYGPI'
                            }
                        },
                        {
                            xtype: 'gpindctypeahead',
                            itemId: 'cbxNDCCode',
                            fieldLabel: 'NDC/LN',
                            emptyText: '[e.g. 00247008500 or ACETAMINOPHEN]',
                            displayField: 'NDC',
                            valueField: 'NDC',
                            width: 400,
                            listeners: {
                                select: 'SetCtrlValues'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'RXCUI',
                            itemId: 'txtRxCUI',
                            maskRe: /[0-9\/.-]/,
                            emptyText: '[e.g 104097]',
                            width: 400
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'GPI Level',
                            displayField: 'name',
                            valueField: 'value',
                            itemId: 'cbxGPILevel',
                            bind: {
                                store: '{StoreGPILevels}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    minWidth: 1600,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Drug Name',
                            itemId: 'txtBN',
                            emptyText: '[e.g ACETAMINOPHEN-CODEINE]',
                            width: 400
                        },

                        {
                            xtype: 'combo',
                            itemId: 'cbxFormularyList',
                            fieldLabel: 'Formulary Only',
                            typeAhead: true,
                            emptyText: 'Formulary List',
                            width: 600,
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
                                + '<th style="font-weight: bold; padding: 3px; width: 150px;">Formulary</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 50px;">Version</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 50px;">Status</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 150px;">Effective Date</th>'
                                + '<th style="font-weight: bold; padding: 3px; width: 150px;">Term. Date</th>'
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
                            itemId: 'chkInactive',
                            fieldLabel: 'Active Drugs Only'
                        },
                        {
                            xtype: 'button',
                            text: 'Search',
                            iconCls: 'fa fa-search',
                            handler: 'Search_Click'

                        },
                        {
                            xtype: 'button',
                            text: 'Export To Excel',
                            iconCls: 'fa fa-file-excel-o',
                            handler: 'btnExportClick'
                        },
                        {
                            xtype: 'hidden', itemId: 'hidFormuId'
                        },
                        {
                            xtype: 'hidden', itemId: 'hidFormuVersion'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            itemId: 'MedispanGrid',
            flex: 1,
            columns: [
                {
                    text: 'NDC',
                    dataIndex: 'NDC'
                },
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    hideable: false,
                    items: [{
                        // Use a URL in the icon config
                        iconCls: 'x-fa fa-arrow-circle-right',
                        // Use a URL in the icon config
                        handler: 'btnDrugDetails_CLick',
                        tooltip: 'Drug Details'
                    }]
                },
                {
                    text: 'Product Name',
                    dataIndex: 'descAbbr'
                },
                {
                    text: 'Brand Name',
                    dataIndex: 'productName'
                },
                {
                    text: 'GPI Code',
                    dataIndex: 'GPICode'
                },
                {
                    text: 'GPI Name',
                    dataIndex: 'GPIName'
                },
                {
                    text: 'Drug Type',
                    dataIndex: 'DrugType'
                },
                {
                    text: 'OTC',
                    dataIndex: 'OTC'
                },
                {
                    text: 'RxCUI',
                    dataIndex: 'rxcui'
                },
                {
                    text: 'Dosage',
                    dataIndex: 'dosageForm'
                },
                {
                    text: 'Route of Admin.',
                    dataIndex: 'adminRoute'
                },
                {
                    text: 'Strength',
                    dataIndex: 'strength',
                    renderer: function (value) {
                        if (Ext.isEmpty(value) || value == '0') {
                            return "";
                        }
                        return value + ' MG';
                    }
                },
                {
                    text: 'Formularies',
                    dataIndex: 'Formularies'
                },
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    hideable: false,
                    items: [{
                        // Use a URL in the icon config
                        iconCls: 'x-fa fa-user-md',
                        // Use a URL in the icon config
                        handler: 'btnDrugInfo_CLick',
                        tooltip: 'Drug Formulary Information'
                    }]

                },
                {
                    text: 'Coverage Gap',
                    dataIndex: 'CoverageGapDrug'
                },
                {
                    text: 'AWP (Unit)',
                    dataIndex: 'AWPUnit',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'AWP (Pkg)',
                    dataIndex: 'AWPPkg',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'WAC (Unit)',
                    dataIndex: 'WACUnit',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'WAC (Pkg)',
                    dataIndex: 'WACPkg',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'FUL',
                    dataIndex: 'FUL',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'MAC',
                    dataIndex: 'MAC',
                    xtype: 'numbercolumn', format: '$0,0.0000'
                },
                {
                    text: 'FormuIdVersionList',
                    dataIndex: 'FormuIdVersionList',
                    hidden: true
                },
                {
                    text: 'Maintenance',
                    dataIndex: 'MaintFlagYesNo'
                },
                {
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
            bind: '{StoreMDBDrugSearch}',
            plugins: [{ptype: 'gridexporter'}],
            dockedItems: [
                {
                    dock: 'bottom',
                    xtype: 'pagingtoolbar',
                    bind: '{StoreMDBDrugSearch}',
                    displayInfo: true,
                    hideRefresh: true,
                    pageSize: 25
                }
            ]
        }
    ]
});