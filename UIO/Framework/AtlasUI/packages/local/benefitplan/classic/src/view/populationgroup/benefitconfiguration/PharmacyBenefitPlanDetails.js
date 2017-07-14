/**
 * Created by l6630 on 10/13/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.benefitconfiguration.PharmacyBenefitPlanDetails', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.pharmacybenefitplandetails',
    title: 'Pharmacy Benefit Plan Details',
    collapsible : false,
    collapsed : false,
    viewModel: {
        stores: {
            pharmacyBenefitPlanGrid: {
                model: 'Atlas.benefitplan.model.ProviderNetworkTiers',
                groupField: 'NtwrkTierSK'
            },
            pharmacynetworks : {
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
                    columnWidth: 0.2,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Benefit Plan Name',
                            bind : {
                              value :  '{pharmacyBenefitPlanDetails.BnftPlanName}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Benefit Plan ID:',
                            bind: {
                                value: '{pharmacyBenefitPlanDetails.BnftPlanID}'
                            }
                        }
                    ]
                },

                {
                    xtype: 'container',
                    columnWidth: 0.22,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel : 'BIN',
                            name: 'Bincombo',
                            queryMode: 'local',
                            displayField: 'Text',
                            valueField: 'Value',
                            allowBlank : false,
                            forceSelection : true,
                            bind : {
                                store : '{binList}',
                                value : '{pharmacyBenefitPlanDetails.AcctRXBINSK}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'combo',
                            fieldLabel : 'PCN',
                            name: 'pcncombo',
                            queryMode: 'local',
                            displayField: 'Text',
                            valueField: 'Value',
                            allowBlank : false,
                            forceSelection : true,
                            bind : {
                                store : '{pcnList}',
                                value : '{pharmacyBenefitPlanDetails.AcctPCNSK}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'textfield',
                            name: 'payableamt',
                            fieldLabel: 'Payable Pat Resp Amt Qual',
                            bind: {
                                value: '{pharmacyBenefitPlanDetails.PayblPatRespCodes}'
                            },
                            regex: /^\d{2}(, ?\d{2}| ,?\d{2})*$/,
                            maxLength: 38,
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            enableKeyEvents: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    columnWidth: 0.28,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            name: 'dmr',
                            decimalPrecision : 0,
                            maxValue : 999,
                            minValue : 0,
                            fieldLabel: 'DMR Submission Window (days)',
                            bind : {
                                value :  '{pharmacyBenefitPlanDetails.DMRProcsngDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            //width: '380px',
                            labelWidth: '250px',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            name: 'psw',
                            decimalPrecision : 0,
                            maxValue : 999,
                            minValue : 0,
                            fieldLabel: 'Paper Submission Window (days)',
                            bind : {
                                value :  '{pharmacyBenefitPlanDetails.PaperProcsngDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            //width: '380px',
                            labelWidth: '250px',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'checkbox',
                            name: 'ponc',
                            boxLabel: 'Process Out of Network Claims',
                            checked : true,
                            bind : {
                                value :  '{pharmacyBenefitPlanDetails.PrcsOutofNtwrkClaimsInd}'
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            enableKeyEvents: true
                        }
                    ]
                },

                {
                    xtype: 'container',
                    columnWidth: 0.3,
                    layout: {
                        type: 'vbox',
                        align: 'right'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            name: 'esw',
                            decimalPrecision : 0,
                            maxValue : 999,
                            minValue : 0,
                            fieldLabel: 'Electronic Submission Window (days)',
                            bind : {
                                value :  '{pharmacyBenefitPlanDetails.ElctrncProcsngDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            enableKeyEvents: true
                        },
                        {
                            xtype: 'numberfield',
                            hideTrigger : true,
                            name: 'rw',
                            decimalPrecision : 0,
                            maxValue : 999,
                            minValue : 0,
                            fieldLabel: 'Reversal Window (days)',
                            bind : {
                                value :  '{pharmacyBenefitPlanDetails.ClmReversalDayLim}'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1920': {
                                    labelAlign: 'top'
                                },
                                'width >= 1920': {
                                    labelAlign: 'left'
                                }
                            },
                            listeners: {
                                change: 'onItemChanged'
                            },
                            enableKeyEvents: true
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Network Tiers',
            items: [{
                xtype: 'grid',
                minHeight : '200',
                viewConfig: {
                    loadMask: false
                },
                bind: {
                    store: '{pharmacyBenefitPlanGrid}',
                    selection: '{activeRowItem}'
                },
                listeners: {
                    canceledit: 'onPharmGridItemCancelEdit',
                    beforeedit: 'onPharmGridBeforeEdit',
                    edit: 'onPharmGridItemComplete'
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
                        dataIndex: 'NtwrkSK',
                        header : 'Network Tier',
                        flex: 1,
                        editor: {
                            xtype: 'combo',
                            fieldLabel : 'Network List',
                            queryMode: 'local',
                            allowBlank : false,
                            forceSelection : true,
                            displayField: 'NtwrkName',
                            valueField: 'NtwrkSK',
                            value: 'NtwrkSK',
                            bind: {
                                store: '{pharmacynetworks}'
                            },
                            validator: function(val){
                                var rec = this.up().up().getStore('pharmacyBenefitPlanGrid').findRecord('NtwrkSK', this.getValue(), 0, false, false, true);
                                if(rec && this.up().getRecord() != rec)
                                {
                                    return(rec.data.value == val) ? true : "Network Tier must be unique.";
                                }
                                return true;
                            }
                        },
                        renderer : 'onPharmacyNetworkRenderer'
                    },
                    {
                        dataIndex: 'MACListSK',
                        header : 'MAC List',
                        flex: 1,
                        editor: {
                            xtype: 'combo',
                            fieldLabel : 'MAC List',
                            queryMode: 'local',
                            allowBlank : false,
                            forceSelection : true,
                            displayField: 'MACListName',
                            valueField: 'MACListSK',
                            value : 'MACListSK',
                            bind : {
                                store : '{macList}'
                            }
                        },
                        renderer : 'onMACRenderer'
                    },
                    {
                        dataIndex: 'EfctvStartDt',
                        header : 'Effective Start',
                        flex: 1,
                        renderer: Ext.util.Format.dateRenderer('n/j/Y'),
                        allowBlank : false,
                        editor: {
                            xtype: 'datefield',
                            fieldLabel : 'Effective Start',
                            format: 'n/j/Y',
                            allowBlank: false
                        }
                    },
                    {
                        dataIndex: 'EfctvEndDt',
                        header : 'Effective End',
                        flex: 1,
                        renderer: 'renderGridDate',//Ext.util.Format.dateRenderer('n/j/Y'),
                        editor: {
                            xtype: 'datefield',
                            fieldLabel : 'Effective End',
                            format: 'n/j/Y',
                            allowBlank: false
                        }
                    },
                    {
                        xtype:'actioncolumn',
                        //width:50,
                        items: [{
                            iconCls : "x-fa fa-plus",
                            tooltip: 'Add pharmacy provider network to this Tier',
                            handler: function(grid, rowIndex) {
                                var view =grid.up('benefitconfigurationview'),
                                    ctlr=view.getController();

                                ctlr.onPharmaTierAdd(grid, rowIndex);
                            }
                        },{
                            iconCls : "x-fa fa-minus",
                            tooltip: 'Remove pharmacy provider network',
                            handler: function(grid, rowIndex) {
                                var view =grid.up('benefitconfigurationview'),
                                    ctlr=view.getController();
                                ctlr.onPharmaTierRemove(grid, rowIndex);
                            }
                        }]
                    }
                ]
            }]
        }

    ]
});
