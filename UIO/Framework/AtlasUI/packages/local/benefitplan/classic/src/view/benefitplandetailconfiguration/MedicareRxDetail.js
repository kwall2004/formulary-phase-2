Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.MedicareRxDetail', {
    extend: 'Ext.container.Container',
    alias: 'widget.benefitplan-medicarerxdetail',
    layout: {
        type: 'table',
        columns: 3,
        tableAttrs: {
            style: {
                width: '100%'
            }
        }
    },
    defaults: {
        labelWidth: 185
    },
    items: [
        {
            xtype: 'combobox',
            name: 'CMSBnftStructTypeSK',
            forceSelection: true,
            allowBlank: false,
            minChars: 0,
            displayField: 'CMSBnftStructTypeDesc',
            valueField: 'CMSBnftStructTypeSK',
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                change: 'onItemChanged'
            },
            plugins: 'responsive',
            responsiveConfig: {
                'width < 1340': {
                    fieldLabel: 'CMS Bnft Structure',
                    labelWidth: 118
                },
                'width >= 1340': {
                    fieldLabel: 'CMS Benefit Structure',
                    labelWidth: 185
                }
            },
            bind: {
                store: '{cmsstructtypes}'
            }
        },
        {
            xtype: 'textfield',
            maxLength: 80,
            name: 'McrCvrgGapBrandPct',
            fieldLabel: 'Coverage Gap-Brand',
            format: 0.00,
            vtype: 'ninetyninepercent',
            allowBlank: false,
            listeners: {
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'textfield',
            maxLength: 80,
            name: 'McrCvrgGapGenrcPct',
            format: 0.00,
            vtype: 'ninetyninepercent',
            allowBlank: false,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 1340': {
                    fieldLabel: 'Cvg Gap-Generic',
                    labelWidth: 118
                },
                'width >= 1340': {
                    fieldLabel: 'Coverage Gap-Generic',
                    labelWidth: 185
                }
            },
            listeners: {
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'checkbox',
            name: 'PrcsMcrPartBClaimsInd',
            fieldLabel: 'Process Part B Claims',
            uncheckedValue: false,
            boxLabel: 'Process Part B Claims',
            hideLabel: true,
            listeners: {
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'textfield',
            maxLength: 80,
            name: 'McrPartBCoinsurancePct',
            fieldLabel: 'Part B Coinsurance',
            format: 0.00,
            bind:{
                disabled: '{!mcrPartBCoinsurancePct}'
            },
            vtype: 'percent',
            listeners: {
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'numberfield',
            name: 'StdDeducblAmt',
            renderer: function (value) {
                if(value != null && value != '') {
                    return Ext.util.Format.usMoney(value);
                } else {
                    return value;
                }
            },
            bind:{
                disabled: '{!isEnabled}'
            },
            hideTrigger : true,
            spinDownEnabled: false,
            spinUpEnabled: false,
            minValue : 0,
            maxValue:  999999.00,
            plugins: 'responsive',
            responsiveConfig: {
                'width < 1340': {
                    fieldLabel: 'Std Deduct Amt',
                    labelWidth: 118
                },
                'width >= 1340': {
                    fieldLabel: 'Standard Deductible Amount',
                    labelWidth: 185
                }
            },
            listeners:{
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'checkbox',
            name: 'PayNonMcrPartDIngredients',
            fieldLabel: 'Pay Non Part D Ingredients',
            uncheckedValue: false,
            boxLabel: 'Pay Non Part D Ingredients',
            hideLabel: true,
            listeners: {
                change: 'onItemChanged'
            }
        },
        {
            xtype: 'checkbox',
            name: 'InclNonMcrPartDonPDE',
            fieldLabel: 'Include Non Part D on PDE',
            uncheckedValue: false,
            boxLabel: 'Include Non Part D on PDE',
            hideLabel: true,
            listeners: {
                change: 'onItemChanged'
            }
        }
    ]
});
