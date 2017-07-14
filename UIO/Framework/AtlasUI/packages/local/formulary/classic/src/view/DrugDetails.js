/**
 * Created by s6627 on 11/3/2016.
 */
Ext.define('Atlas.formulary.view.DrugDetails', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-drugdetails',
    controller:'drugdetailscontroller',
    title: 'Drug Details',
    height: 700,
    width: 1000,
    modal: true,
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'form',
                    itemId: 'drugDetailInfo',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'

                    },
                    flex: 6,
                    items: [
                        {
                            xtype: 'panel',
                            collapsible: true,
                            title: 'General Information',
                            cls: 'card-panel',
                            flex: 1,
                            defaults: {
                                xtype: 'displayfield',
                                labelWidth: 190
                            },
                            items: [
                                {
                                    fieldLabel: 'NDC',
                                    name: 'NDC'
                                },
                                {
                                    fieldLabel: 'Labeler',
                                    name: 'labelerCode'
                                },
                                {
                                    fieldLabel: 'GPICode',
                                    name: 'GPICode',
                                    style: {
                                        'font-weight': 'bold'
                                    }
                                },
                                {
                                    fieldLabel: 'Package Size',
                                    name: 'packageSize'
                                },
                                {
                                    fieldLabel: 'Product Name',
                                    name: 'descAbbr'
                                },
                                {
                                    fieldLabel: 'Brand Name',
                                    name: 'drugName'
                                },
                                {
                                    fieldLabel: 'Previous NDC',
                                    name: 'oldNDCFormatted'
                                },
                                {
                                    fieldLabel: 'Repl. NDC',
                                    name: 'newNDCFormatted'
                                },
                                {
                                    fieldLabel: 'Therapeutic Equivalency Code',
                                    name: 'TEE'
                                },
                                {
                                    fieldLabel: 'Repackaged Status',
                                    name: 'repackage'
                                },
                                {
                                    fieldLabel: 'Unit Dose',
                                    name: 'unitDose'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            flex: 1,
                            collapsible: true,
                            cls: 'card-panel',

                            defaults: {
                                xtype: 'displayfield',
                                labelWidth: 190
                            },
                            items: [
                                {
                                    fieldLabel: 'Date of Add',
                                    name: 'mrktEntryDate',
                                    dateFormat: 'm/d/Y',
                                    type: 'date',
                                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                                },
                                {
                                    fieldLabel: 'Inactive Date',
                                    name: 'inactiveDate',
                                    dateFormat: 'm/d/Y g:i:s A',
                                    type: 'date',
                                    renderer: Ext.util.Format.dateRenderer('m/d/Y g:i:s A')
                                },
                                {
                                    fieldLabel: 'Maintenance Status',
                                    name: 'mntDrugCode'
                                },
                                {
                                    fieldLabel: 'GPPC',
                                    name: 'GPPC'
                                },
                                {
                                    fieldLabel: 'Package Size Unit of Measure',
                                    name: 'packageUM'
                                },
                                {
                                    fieldLabel: 'Package Quantity',
                                    name: 'packageQty'
                                },
                                {
                                    fieldLabel: 'Drug Type',
                                    name: 'DrugType'
                                },
                                {
                                    fieldLabel: 'DEA Code',
                                    name: 'DEAClass'
                                },
                                {
                                    fieldLabel: 'Multi Source Status',
                                    name: 'multiSource'
                                },
                                {
                                    fieldLabel: 'Package Description',
                                    name: 'packageDesc'
                                },
                                {
                                    fieldLabel: 'OTC',
                                    name: 'OTC'
                                },
                                {
                                    fieldLabel: 'Coverage Gap',
                                    name: 'CoverageGapDrug'
                                }
                            ]
                        }
                    ]

                },
                {
                    xtype: 'form',
                    flex: 4,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            cls: 'card-panel',
                            title: 'AWP Change History',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'gridAWPChange',
                                    flex: 1,
                                    bind: {
                                        store: '{AWPPriceHistory}'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{AWPPriceHistory}',
                                            pageSize: 10,
                                            displayInfo: true,
                                            dock: 'bottom'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                text: 'Change Date',
                                                dataIndex: 'priceDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {
                                                text: 'AWP',
                                                dataIndex: 'price',
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00000'
                                            },
                                            {text: 'Source', dataIndex: 'src'},
                                            {
                                                text: 'Last Modified',
                                                dataIndex: 'lastModified',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            cls: 'card-panel',
                            title: 'WAC Change History',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    itemId: 'gridWACChange',
                                    flex: 1,
                                    bind: {
                                        store: '{WACPriceHistory}'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{WACPriceHistory}',
                                            pageSize: 10,
                                            displayInfo: true,
                                            dock: 'bottom'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            flex: 1
                                        },
                                        items: [
                                            {
                                                text: 'Change Date',
                                                dataIndex: 'priceDate',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            },
                                            {
                                                text: 'WAC',
                                                dataIndex: 'price',
                                                xtype: 'numbercolumn',
                                                format: '$0,0.00000'
                                            },
                                            {text: 'Source', dataIndex: 'src'},
                                            {
                                                text: 'Last Modified',
                                                dataIndex: 'lastModified',
                                                xtype: 'datecolumn',
                                                format: 'm/d/Y'
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]

        }

    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnPrint',
                    text: 'Print',
                    iconCls: 'x-fa fa-print',
                    handler: 'printWindow'
                }
            ]
        }
    ]
});
