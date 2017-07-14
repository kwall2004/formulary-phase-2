/**
 * Created by n6570 on 11/14/2016.
 */
/**
 * @Class : 'Atlas.benefitplan.view.benefitconfiguration.Main'
 * This Class is Benefit Configuration Module
 * @author : n6570
 * @Date : '14-11-2016'
 */
Ext.define('Atlas.benefitplan.view.benefitconfiguration.Main',
    {
        extend: 'Ext.panel.Panel',
        title: 'Benefit Configuration',
        xtype : 'coveragesetdetails',
        reference : 'coveragesetDetailsRef',
        controller: 'BenefitConfigurationController',
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack : 'top'
        },
        scrollable:true,
        cmbBenefitPlanSK: 0,
        cmbBenefitType: 0,
        LOBName: 0,
        viewModel: {
            data: {
                popGrpPBPSK : '0',
                changed: false
            },
            stores: {
                /**
                 * The building of Benefit Coverage blocks happen on load of this store
                 */
                benefitcoveragesetdetails : {
                    model : 'Atlas.benefitplan.model.BenefitCoverageSetDetails',
                    listeners : {
                        load : 'onLoadCoverageSet'
                    }
                },

                netWorkTiersInBenefitPlan : {
                    model : 'Atlas.benefitplan.model.NetworkTiersInPlan',
                    listeners : {
                        load : 'onGetTiersInfo'
                    }
                },

                rulesetdata: {
                    model: 'Atlas.benefitplan.model.RuleSet'
                },

                ruledetaildata: {
                    model: 'Atlas.benefitplan.model.RuleDetail'
                },

                monthList : {
                    model : 'Atlas.benefitplan.model.MonthList',
                    autoLoad : true
                },

                coverageSetAllStore : {
                    model : 'Atlas.benefitplan.model.CoverageSetsAll'
                },

                //The Main store that is loaded
                coveragesetConfigStore : {
                    model : 'Atlas.benefitplan.model.CoverageSetConfiguration',
                    listeners : {
                        load : 'onLoadCoverageSetConfigLoad'
                    }
                },


                //Store to hold the View Data
                coveragesetConfigViewStore : {
                    model : 'Atlas.benefitplan.model.CoverageSetConfiguration'
                },


                //Store to hold the View Data
                thresholdsConfigStore : {
                    model : 'Atlas.benefitplan.model.ThresholdConfiguration'
                },


                frequencyqualifiertype :{
                    model : 'Atlas.benefitplan.model.FrequencyQualifierType',
                    autoLoad : true
                },

                valuequalifiertype :{
                    model : 'Atlas.benefitplan.model.ValueQualifierType',
                    autoLoad : true
                },

                criteriaconditiontype :{
                    model : 'Atlas.benefitplan.model.CriteriaConditionType',
                    autoLoad : true
                },

                thresholdTypeStore :{
                    model : 'Atlas.benefitplan.model.ThresholdType'
                },

                benCoverageThresholdTypeStore :{
                    model : 'Atlas.benefitplan.model.ThresholdConfiguration'
                },


                thresholdqualifiertype :{
                    model : 'Atlas.benefitplan.model.ThresholdQualifierType',
                    autoLoad : true
                },

                coveragesetsallstore:{
                    model : 'Atlas.benefitplan.model.CoverageSetsAll',
                    sorters: 'CvrgSetSK'
                },

                allBenefits : {
                    model : 'Atlas.benefitplan.model.CoverageSetDetailsAllBenefits'
                },

                allBenefitsItems : {
                    model : 'Atlas.benefitplan.model.BenefitsAll',
                    autoLoad : true
                },

                threshold : {
                    fields : [
                        'name', 'id'
                    ],
                    data :[
                        ['PT/OT Visits', 1],
                        ['ER Visits', 1]
                    ]
                },

                existingbenefits: {
                    model: 'Atlas.benefitplan.model.ExistingBenefit'
                }

            }
        },
        dockedItems: [
            {
                xtype: 'benefitplan-progress',
                itemId: 'thermometerPanel',
                dock: 'top'
            }
        ],
        items : [
            {
                xtype : 'panel',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        layout: {
                            type: 'hbox',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                reference: 'txtBenefitFilterRef',
                                width: 200,
                                emptyText: 'Filter Benefits',
                                tooltip: 'Type to filter existing benefits',
                                listeners: {
                                    change: 'onChangeFilterBenefits'
                                },
                                triggers: {
                                    searchCls: {
                                        cls: 'x-form-search-trigger',
                                        handler: 'onFilterBenefits'
                                    }
                                }
                            },
                            {
                                xtype: 'combo',
                                reference: 'cmbAddBenefitRef',
                                valueField: 'BnftSK',
                                displayField: 'BnftName',
                                queryMode: 'local',
                                bind: {
                                    store: '{allBenefitsItems}'
                                },
                                width: 300,
                                emptyText: 'Select Benefits to Add'
                            },
                            {
                                xtype: 'button',
                                text: 'Add Benefit',
                                handler: 'onAddNewBenefit'
                            }
                        ]
                    }
                ]
            },
            {
                xtype : 'fieldset',
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack : 'center'
                },
                reference : 'benContainerRef'
            },
            {
                xtype: 'container',
                html: '<style>.existingBenefitsWindow .x-grid-cell-inner{height: auto !important;}</style>'
            },
            {
                xtype: 'window',
                cls: 'existingBenefitsWindow',
                reference: 'existingBenefitsWindow',
                closable: false,
                scrollable:true,
                closeAction: 'hide',
                draggable: false,
                resizable: false,
                plugins: 'responsive',
                responsiveConfig: {
                    'width < 1540': {
                        width:940
                    },
                    'width >= 1540': {
                        width:1200
                    }
                },
                title: 'View Existing Benefits',
                modal: true,
                items: [
                    {
                        xtype:'fieldset',
                        title: 'Benefits',
                        items: [
                            {
                                xtype: 'grid',
                                reference: 'existingBenefitsGrid',
                                requires: [
                                    'Ext.grid.filters.Filters',
                                    'Ext.grid.plugin.Exporter'
                                ],
                                minHeight: 250,
                                maxHeight:400,
                                scrollable:true,
                                viewConfig: {
                                    loadMask: false
                                },
                                bind: {
                                    store: '{existingbenefits}'
                                },

                                defaults: {
                                    sortable: true,
                                    filter: {
                                        type: 'string'
                                    }
                                },
                                columns: [
                                    {
                                        text: 'Benefit Name',
                                        dataIndex: 'BnftName',
                                        flex: 1
                                    },
                                    {
                                        text: 'Coinsuarance Percentage',
                                        dataIndex: 'CoinsurancePct',
                                        flex: 1
                                    }, {
                                        text: 'Copay After Deductible is Met Amount',
                                        dataIndex: 'CopayAfterDeductableIsMetAmt',
                                        flex: 1
                                    }, {
                                        text: 'Copay Before Deductible Amount',
                                        dataIndex: 'CopayBfrDeducblAmt',
                                        flex: 1
                                    }, {
                                        text: 'Coverage Set Rule',
                                        dataIndex: 'CoverageSetRule',
                                        flex: 1

                                    }, {
                                        text: 'Coverage Set Name',
                                        dataIndex: 'CvrgSetName',
                                        flex: 1
                                    },
                                    {
                                        text: 'NetworkTier Name',
                                        dataIndex: 'NtwrkTierName',
                                        flex: 1
                                    }, {
                                        text: 'IndustryStandardName Code',
                                        dataIndex: 'SvcTypeCode',
                                        plugins: 'responsive',
                                        responsiveConfig: {
                                            'width < 1540': {
                                                hidden: true
                                            },
                                            'width >= 1540': {
                                                hidden: false
                                            }
                                        },
                                        flex: 1
                                    },
                                    {
                                        text: 'IndustryStandardName Description',
                                        dataIndex: 'SvcTypeDesc',
                                        plugins: 'responsive',
                                        responsiveConfig: {
                                            'width < 1540': {
                                                hidden: true
                                            },
                                            'width >= 1540': {
                                                hidden: false
                                            }
                                        },
                                        flex: 1
                                    }, {
                                        text: 'Threshold Limit Amount',
                                        dataIndex: 'ThresholdLimAmt',
                                        plugins: 'responsive',
                                        responsiveConfig: {
                                            'width < 1540': {
                                                hidden: true
                                            },
                                            'width >= 1540': {
                                                hidden: false
                                            }
                                        },
                                        flex: 1
                                    },
                                    {
                                        text: 'Threshold Name',
                                        dataIndex: 'ThresholdName',
                                        plugins: 'responsive',
                                        responsiveConfig: {
                                            'width < 1540': {
                                                hidden: true
                                            },
                                            'width >= 1540': {
                                                hidden: false
                                            }
                                        },
                                        flex: 1
                                    }, {
                                        text: 'Threshold Qualifier Type Code',
                                        dataIndex: 'ThresholdQulfrTypeCode',
                                        plugins: 'responsive',
                                        responsiveConfig: {
                                            'width < 1540': {
                                                hidden: true
                                            },
                                            'width >= 1540': {
                                                hidden: false
                                            }
                                        },
                                        flex: 1
                                    }
                                ],
                                bbar: [
                                    {
                                        text: 'Export to Excel',
                                        handler: 'onExportBenefitsClick'
                                    },
                                    {
                                        text: 'Cancel',
                                        handler: 'onCancelBenefitsClick'
                                    }],

                                plugins: [
                                    {
                                        ptype: 'gridfilters'
                                    },
                                    {
                                        ptype: 'gridexporter'
                                    },
                                    {
                                        ptype: 'responsive'
                                    },
                                    {
                                        ptype: 'rowexpander',
                                        pluginId: 'expander',
                                        rowBodyTpl: new Ext.XTemplate(
                                            '<p><b>IndustryStandardName Code:</b> {SvcTypeCode}</p>',
                                            '<p><b>IndustryStandardName Description:</b> {SvcTypeDesc}</p>',
                                            '<p><b>Threshold Limit Amount:</b> {ThresholdLimAmt}</p>',
                                            '<p><b>Threshold Name:</b> {ThresholdName}</p>',
                                            '<p><b>Threshold Qualifier Type Code:</b> {ThresholdQulfrTypeCode}</p>'
                                        )
                                    }
                                ],
                                responsiveConfig: {
                                    'width < 1540': {
                                        rowExpanderEnabled: true
                                    },
                                    'width >= 1540': {
                                        rowExpanderEnabled: false
                                    }
                                },
                                listeners: {
                                    afterrender: function (grid) {
                                        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                                        if(width >= 1540) {
                                            grid.getPlugin('expander').expanderColumn.hide();
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        bbar: [
            '->',
            { text: 'View Benefits', handler : 'onViewBenefits'},
            { text: 'Save', handler : 'onBenefitsSaveUpdate' }
        ],
        listeners : {
            afterrender : 'afterPageRendered',
            beforeClose: 'checkForUnsavedRecords'
        }
    });