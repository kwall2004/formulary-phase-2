/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FormularyNewDrugs', {
    extend: 'Ext.grid.Panel',
    xtype: 'formularynewdrugs',
    /*viewModel: {
     type: 'cdagviewmodel'
     },*/
    viewModel: 'formularynewdrugviewmodel',
    //itemId: 'cdagmain',
    title: 'Formulary New Drugs',
    controller: 'formularynewdrugcontroller',
                    tbar: [
                        {
                            xtype: 'combobox',
                            itemId: 'cbxNDC',
                            labelWidth: 50,
                            displayField : 'planGroupName',
                            valueField : 'planGroupId',
                            bind: {
                               // value: '{cdmodel.PlanGroupId}',
                               // store: '{storememgroup}'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'To Excel',
                            iconCls: 'fa fa-file-excel-o',
                            handler:'btnAddClick'
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Acknowledge',
                            iconCls: 'fa fa-check',
                            handler:'btnFormularyDetail'
                        },
                        {
                            xtype: 'button',
                            text: 'Submit for approval',
                            iconCls: 'fa fa-arrow-circle-o-right',
                            handler:'btnRemoveClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Approve',
                            iconCls: 'fa fa-check',
                            handler:'btnRemoveClick'
                        }

                    ],
                    flex: 10,
                    columns: [
                        {
                            text: 'Drug Code', dataIndex: 'NDC', width: 100
                        },
                        {
                            text: 'Label', dataIndex: 'LN', width: 100
                        },
                        {
                            text: 'Brand Name', dataIndex: 'BrandName', width: 100
                        },
                        {
                            text: 'GCN', dataIndex: 'GCN_SEQNO', width: 70
                        },
                        {
                            text: 'GPI', dataIndex: 'GPICode', width: 70
                        },
                        {
                            text: 'Common Name', dataIndex: 'CommanName', width: 130
                        },
                        {
                            text: 'Drug Type', dataIndex: 'DrugType', width: 100
                        },
                        {
                            text: 'Drug Class', dataIndex: 'DrugClass', width: 100
                        },
                        {
                            text: 'Market Entry Date', dataIndex: 'MarketEntryDate', width: 150
                        },
                        {
                            text: 'Merlin Introduction Date', dataIndex: 'MerlinEntryDate', width: 170
                        },
                        {
                            text: 'MS AWP Price', dataIndex: 'MSAWPPrice', width: 120
                        },
                        {
                            text: 'MS WAC Price', dataIndex: 'MSWACPrice', width: 120
                        },
                        {
                            text: 'MS FUL Price', dataIndex: 'MSFULPrice', width: 120
                        },
                        {
                            text: 'FDB WAC Price', dataIndex: 'FDBWACPrice', width: 120
                        },
                        {
                            text:'FDB FUL Price', dataIndex: 'FDBFULPrice', width: 120
                        },
                        {
                            xtype:'actioncolumn',
                            width: 50,
                            items: [{
                                // Use a URL in the icon config
                                iconCls: 'x-fa fa-plus-square',
                                // Use a URL in the icon config
                                tooltip: 'Detail',
                                handler: 'btnFormularyDetail'

                            }]
                        }
                    ],
                    leadingBufferZone: 8,
                    trailingBufferZone: 8,
                    bind: '{storeFomularyNewDrugs}',
                    plugins: [{
                        ptype: 'rowwidget',
                        widget: {
                            xtype: 'grid',
                            itemId:'gdFormularyId',
                            autoLoad: true,
                            leadingBufferZone: 8,
                            trailingBufferZone: 8,
                            bind: {
                                store: '{storeFormularyId}'
                            },
                            columns: [
                                {
                                text: 'Formulary Name',
                                dataIndex: 'FormularyName',
                                width:900
                                },
                                {
                                    text: 'Formulary Id',
                                    dataIndex: 'FormularyId',
                                    width: 75,
                                    hidden:true
                                },
                                {
                                    text: 'NDC',
                                    dataIndex: 'NDC',
                                    width: 75,
                                    hidden:true
                                },
                                {
                                    text: 'Formulary Version',
                                    dataIndex: 'FormularyVersion',
                                    width: 75,
                                    hidden:true
                                },
                                {
                                    text: 'AlertSystemId',
                                    dataIndex: 'AlertSystemId',
                                    width: 75,
                                    hidden:true
                                }

                            ],
                            plugins: [{
                                ptype: 'rowwidget',
                                widget: {
                                    xtype: 'grid',
                                    itemId: 'gdFormularyVersion',
                                    autoLoad: true,
                                    bind: {
                                        store: '{storeFormularyVersion}'
                                    },
                                    columns: [
                                        {
                                            xtype:'actioncolumn',
                                            width: 50,
                                            items: [{
                                                // Use a URL in the icon config
                                                iconCls: 'x-fa fa-plus-square',
                                                // Use a URL in the icon config
                                                tooltip: 'Detail',
                                                handler: 'btnFormularyDetail'

                                            }]
                                        },
                                        {
                                            text: 'Formulary Version',
                                            dataIndex: 'FormularyVersion',
                                            width: 100
                                        },
                                        {
                                            text: 'Formulary Id',
                                            dataIndex: 'FormularyId',
                                            width: 75,
                                            hidden: true
                                        },
                                        {
                                            text: 'NDC',
                                            dataIndex: 'NDC',
                                            width: 75,
                                            hidden: true
                                        },
                                        {
                                            text: 'AlertSystemId',
                                            dataIndex: 'AlertSystemId',
                                            width: 75,
                                            hidden: true
                                        },
                                        {
                                            text: 'Formulary Status',
                                            dataIndex: 'FormularyStatus',
                                            width: 100
                                        },
                                        {
                                            text: 'Formulary Type',
                                            dataIndex: 'FormularyType',
                                            width: 100
                                        },
                                        {
                                            text: 'Effective Date',
                                            dataIndex: 'EffectiveDate',
                                            width: 100
                                        },
                                        {
                                            text: 'Termination Date',
                                            dataIndex: 'TerminationDate',
                                            width: 100
                                        },
                                        {
                                            text: 'Level Type',
                                            dataIndex: 'levelType',
                                            width: 75
                                        },
                                        {
                                            text: 'Rule LevelID',
                                            dataIndex: 'rulelevelID',
                                            width: 100
                                        },
                                        {
                                            text: 'OTC',
                                            dataIndex: 'OTCInd',
                                            width: 50
                                        },
                                        {
                                            text: 'Associated Plans',
                                            dataIndex: 'AssociatedPlans',
                                            width: 100
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            bind: '{storeFormularyId}',
                                            displayInfo: true,
                                            dock: 'bottom'
                                        }

                                    ]
                                }
                            }],
                            dockedItems: [
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: '{storeFormularyVersion}',
                                    displayInfo: true,
                                    dock: 'bottom'
                                }

                            ]
                        }
                    }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            bind: '{storeFomularyNewDrugs}',
                            displayInfo: true,
                            dock: 'bottom',
                            pageSize: 10
                        }

                    ]
        }
)