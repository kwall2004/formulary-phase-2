Ext.define('Atlas.plan.view.group.Benefits', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.plan-group-benefits',
    //title: '~pharmacygroupdetail'
    title: 'Plan Benefit Details',
    bind:{
        store: '{plangroupbenefits}'
    },
    listeners: {
        itemdblclick: 'onBenefitItemdblclick'
    },
    columns: {
        defaults:{
            flex:1
        },
        items:[
            {text: 'Plan Benefit Code', dataIndex: 'planBenefitCode', width: 200},
            {text: 'Plan Name', dataIndex: 'benefitName'},
            {text: 'Effective Date', dataIndex: 'effDate', dateformat: 'm/j/Y', xtype: 'datecolumn'},
            {text: 'Renewal Date', dataIndex: 'renewalDate', format: 'm/d/Y', xtype: 'datecolumn'},
            {text: 'Termination Date', dataIndex: 'termDate', format: 'm/d/Y', xtype: 'datecolumn'},
            {text: 'Plan Status', dataIndex: 'benefitStatus',
                renderer: function (value) {
                    if (value == "I") return "Inactive";
                    else if (value == "A") return "Active";
                    else  return "Draft";
                }

            },
            {text: 'Pass Thru Pricing', dataIndex: 'passThroughPricing',
                renderer: function (value) {
                    if(value)
                        return "Yes";
                    else
                        return "No";
                }
            },
            {text: 'LICS Subsidy', dataIndex: 'licsSubsidy',
                renderer: function (value) {
                    if(value)
                        return "Yes";
                    else
                        return "No";
                }

            }
        ]
    }
});