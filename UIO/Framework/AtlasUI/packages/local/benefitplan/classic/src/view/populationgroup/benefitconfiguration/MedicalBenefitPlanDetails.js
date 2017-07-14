/**
 * Created by l6630 on 10/13/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.MedicalBenefitPlanDetails', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.medicalbenefitplandetails',
    title: 'Medical Benefit Plan Details',
    collapsible : false,
    collapsed : false,
        viewModel: {
            stores: {
                medicalBenefitPlanGrid: {
                    model: 'Atlas.benefitplan.model.ProviderNetworkTiers',
                    groupField: 'NtwrkTierSK'
                },
                networks : {
                    fields: ['NtwrkName', 'NtwrkSK']
                }
            }
        },
        items : [
        {
            xtype: 'container',
            layout: 'column',
            items: [
                {
                    xtype: 'container',
                    columnWidth: 0.34,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            bind : {
                                value :  '{medicalBenefitPlanDetails.BnftPlanName}'
                            },
                            fieldLabel: 'Benefit Plan Name',
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            name: 'medicalplanname'
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Benefit Plan ID:',
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            bind : {
                                value :  '{medicalBenefitPlanDetails.BnftPlanID}'
                            },
                            name: 'medicalplanid'
                        }
                    ]
                },

                {
                    xtype: 'container',
                    columnWidth: 0.33,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            decimalPrecision : 0,
                            name:'dmrday',
                            maxValue : 999,
                            minValue : 0,
                            bind : {
                                value :  '{medicalBenefitPlanDetails.DMRProcsngDayLim}'
                            },
                            name: 'dmrsubmission',
                            fieldLabel: 'DMR Submission Window (days)',
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            decimalPrecision : 0,
                            maxValue : 999,
                            minValue : 0,
                            name:'payperprcsng',
                            bind : {
                                value :  '{medicalBenefitPlanDetails.PaperProcsngDayLim}'
                            },
                            name: 'papersubmission',
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            fieldLabel: 'Paper Submission Window (days)',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Process Out of Network Claims',
                            bind: {
                                value: '{medicalBenefitPlanDetails.PrcsOutofNtwrkClaimsInd}'
                            },
                            checked: true,
                            name: 'prcsOutofNtwrkClaimsInd',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    columnWidth: 0.33,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            decimalPrecision : 0,
                            name:'ElctrnPrcsng',
                            maxValue : 999,
                            minValue : 0,
                            bind : {
                                value :  '{medicalBenefitPlanDetails.ElctrncProcsngDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            fieldLabel: 'Electronic Submission Window (days)',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            decimalPrecision : 0,
                            name:'reversalday',
                            maxValue : 999,
                            minValue : 0,
                            bind : {
                                value :  '{medicalBenefitPlanDetails.ClmReversalDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1540': {
                                    labelAlign: 'top'
                                },
                                'width >= 1540': {
                                    labelAlign: 'left'
                                }
                            },
                            fieldLabel: 'Reversal Window (days)',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                }

            ]
        },
        {
            xtype: 'fieldset',
            title: 'Network Tiers',
            items: [
                {
                xtype: 'grid',
                minHeight : '200',
                bind: {
                    store: '{medicalBenefitPlanGrid}'
                },
                    viewConfig: {
                        loadMask: false
                    },
                    listeners: {
                        canceledit: 'onMedGridItemCancelEdit',
                        beforeedit: 'onMedGridBeforeEdit',
                        edit: 'onMedGridItemComplete'
                    },
                selModel: 'rowmodel',
                plugins: {
                    ptype: 'rowediting',
                    pluginId: 'rowEditing',
                    clicksToEdit: 2,
                    clicksToMoveEditor: 1,
                    autoCancel: false
                },

                features: [{
                    ftype: 'grouping',
                    groupHeaderTpl: '{[values.rows[0].data.NtwrkTierName]}',
                    hideGroupedHeader: true,
                    enableGroupingMenu: false,
                    collapsible: false
                }],
                columns: [
                    {
                    dataIndex: 'CurrentUser',
                    hidden: true
                    },

                    {
                        dataIndex: 'NtwrkSK',
                        header : 'Network Tier',
                        flex: 1,
                        editor: {
                            xtype: 'combo',
                            queryMode: 'local',
                            name:'networktiercombo',
                            fieldLabel : 'Network',
                            allowBlank : false,
                            forceSelection : true,
                            displayField: 'NtwrkName',
                            valueField: 'NtwrkSK',
                            value : 'NtwrkSK',
                            bind : {
                                store : '{networks}'
                            },
                            validator: function(val){
                                var rec = this.up().up().getStore('medicalBenefitPlanGrid').findRecord('NtwrkSK', this.getValue(), 0, false, false, true);
                                if(rec && this.up().getRecord() != rec)
                                {
                                    return(rec.data.value == val) ? true : "Network Tier must be unique.";
                                }
                                return true;
                            }
                        },
                        renderer : 'onNetworkRenderer'
                    },
                    {
                        dataIndex: 'EfctvStartDt',
                        header : 'Effective Start',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('n/j/Y'),
                        editor: {
                            xtype: 'datefield',
                            fieldLabel : 'Effective Start',
                            format: 'n/j/Y',
                            name:'effectivestartdate',
                            allowBlank: false
                        }
                    },
                    {
                        dataIndex: 'EfctvEndDt',
                        header : 'Effective End',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('n/j/Y'),
                        editor: {
                            xtype: 'datefield',
                            fieldLabel : 'Effective End',
                            name:'effectiveenddate',
                            format: 'n/j/Y',
                            allowBlank: false
                        }
                    },
                    {
                        xtype:'actioncolumn',
                        //width:50,
                        items: [{
                            iconCls : "x-fa fa-plus",
                            tooltip: 'Add medical provider network to this Tier',
                            handler: function(grid, rowIndex) {
                                var view =grid.up('benefitconfigurationview'),
                                    ctlr=view.getController();

                                ctlr.onMedTierAdd(grid, rowIndex);
                            }
                        },{
                            iconCls : "x-fa fa-minus",
                            tooltip: 'Remove medical provider network',
                            handler: function(grid, rowIndex) {
                                 var view =grid.up('benefitconfigurationview'),
                                     ctlr=view.getController();
                                ctlr.onMedTierRemove(grid, rowIndex);
                            }
                        }]
                    }
                ]
            }]
        }
        ]
}
);



