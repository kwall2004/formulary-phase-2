Ext.define('Atlas.benefitplan.view.coveragesetconfiguration.coveragesetconfiguration.Main',
    {
        extend: 'Ext.form.Panel',
        requires: [
            'Ext.form.field.Hidden'
        ],
        reference : 'coverageSetConfigFormRef',
        xtype : 'coveragesetconfig',
        trackResetOnLoad:true,
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack : 'center'
        },
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
                                xtype: 'combo',
                                reference: 'CvrgSetNameCmbRef',
                                flex : 1,
                                emptyText  : 'Select Coverage Set',
                                bind : {
                                    store :'{coveragesetsallstore}',
                                    disabled:'{creatingnew}'
                                },
                                displayField : 'CvrgSetName',
                                valueField : 'CvrgSetSK',
                                queryMode : 'remote',
                                typeAhead : true,
                                forceSelection : true,
                                listeners : {
                                    'change' : 'onCoverageSetSelectionChange'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype : 'panel',

                bind : {
                    title : '{coverageSetConfigTitle}',
                    disabled: '{!copying && !creatingnew && !isCoverageSetCmbselected}'
                },
                layout:'column',
                items : [
                    {
                        xtype : 'container',
                        reference: 'coverageSetToolbarRef',
                        columnWidth: 0.5 ,
                        defaults : {
                            padding : 20,
                            width : 450,
                            labelWidth : 350,
                            labelAlign : 'right'
                        },
                        items : [

                            {
                                xtype: 'textfield',
                                reference: 'CvrgSetNameRef',
                                flex : 5,
                                columnwidth:1,
                                labelWidth : 125,
                                fieldLabel : 'Coverage Set Name:',
                                plugins: 'responsive',
                                responsiveConfig: {
                                    'width < 1540': {
                                        width : 300,
                                        labelAlign: 'top'
                                    },
                                    'width >= 1540': {
                                        width : 600,
                                        labelAlign: 'right'
                                    }
                                },
                                name: 'coverageSet.CvrgSetName',
                                allowBlank: false,
                                maxLength: 50,
                                emptyText  : 'Coverage set not selected',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'CopayBeforeDeductibleAmtIsMet',
                                vtype:'currency',
                                formatter: 'usMoney',
                                fieldLabel : 'Copayment Amount Before Deductible is Met:',
                                bind:{
                                    disabled:'{showCopayEA}'
                                },
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'checkbox',
                                name : 'CopayCountsTowardsDeductable',
                                fieldLabel : 'Copayment Counts Towards Deductible',
                                uncheckedValue: false,
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'combo',
                                bind : {
                                    store : '{frequencyqualifiertypestore}'
                                },
                                name : 'CopaymentFreqQulfrTypeSK',
                                reference: 'CopayFreqQaulfrRef',
                                forceSelection : true,
                                displayField : 'FreqQulfrDesc',
                                valueField : 'FreqQulfrTypeSK',
                                queryMode : 'local',
                                fieldLabel : 'Copayment Frequency Qualifier',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'CoinsurancePct',
                                allowBlank: true,
                                vtype: 'numeric',
                                validator: function(val) {
                                    return ((val == '' || (val > -1 && val <= 100))?true:"Must be between 0 and 100");
                                },
                                bind:{
                                    disabled:'{showCoinsEA}'
                                },
                                fieldLabel : 'Coinsurance:',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'DeducblAmt',
                                fieldLabel : 'Deductible Episode Amount',
                                vtype:'currency',
                                formatter: 'usMoney',
                                bind:{
                                    disabled:'{!showDedEA}'
                                },
                                listeners: {
                                    change: 'onItemChanged'
                                },
                                validator: function(val){
                                    return ((val == '' || (val >= 0 && val <= 999999))?true:"Must be between 0 and 999999");
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'CopaymentEpisodeAmt',
                                fieldLabel : 'Copayment Episode Amount',
                                vtype:'currency',
                                formatter: 'usMoney',
                                bind:{
                                    disabled:'{!showCopayEA}'
                                },
                                listeners: {
                                    change: 'onItemChanged'
                                },
                                validator: function(val){
                                    return ((val == '' || (val >= 0 && val <= 999999))?true:"Must be between 0 and 999999");
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'CoinsuranceEpisodeAmt',
                                fieldLabel : 'Coinsurance Episode Amount',
                                vtype:'currency',
                                formatter: 'usMoney',
                                bind:{
                                    disabled:'{!showCoinsEA}'
                                },
                                listeners: {
                                    change: 'onItemChanged'
                                },
                                validator: function(val){
                                    return ((val == '' || (val >= 0 && val <= 999999))?true:"Must be between 0 and 999999");
                                }
                            },
                            {
                                xtype : 'hidden',
                                name : 'currentUser'
                            },
                            {
                                xtype : 'hidden',
                                name : 'PymtPrflSK'
                            },
                            {
                                xtype : 'hidden',
                                name : 'PymtPrflDtlSK'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        columnWidth: 0.5 ,
                        defaults : {
                            padding : 20,
                            width : 450,
                            labelWidth : 350,
                            labelAlign : 'right'
                        },
                        items : [
                            {
                                xtype : 'textfield',
                                name : 'CopayAfterDeductibleAmtIsMet',
                                vtype:'currency',
                                formatter: 'usMoney',
                                fieldLabel : 'Copayment Amount After Deductible is Met',
                                bind:{
                                    disabled:'{showCopayEA}'
                                },
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'checkbox',
                                name : 'CoinsuranceCalculatedBeforeCopayIsApplied',
                                uncheckedValue: false,
                                fieldLabel : 'Coinsurance Calculated Before Copayment is Applied',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'textfield',
                                name : 'CopayFrequencyValue',
                                fieldLabel : 'Copayment Frequency Value:',
                                vtype:'numeric',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'checkbox',
                                uncheckedValue: false,
                                name : 'CountMemberRespTowardsMOOP'
                                ,
                                fieldLabel : 'Counts Towards MOOP',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'checkbox',
                                uncheckedValue: false,
                                name : 'CountMemberRespTowardsPlanLevelDeductible',
                                fieldLabel : 'Counts Towards Plan-Level Deductible',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype: 'checkbox',
                                uncheckedValue: false,
                                name : 'Excluded',
                                fieldLabel : 'Apply Exclusion Logic',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            },
                            {
                                xtype : 'checkbox',
                                name : 'CopayCountsTowardsNetworkLevelDeductible',
                                uncheckedValue: false,
                                fieldLabel : 'Counts Towards Network Deductible',
                                listeners: {
                                    change: 'onItemChanged'
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });