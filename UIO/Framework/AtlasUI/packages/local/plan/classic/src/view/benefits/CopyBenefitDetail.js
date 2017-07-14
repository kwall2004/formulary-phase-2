Ext.define('Atlas.plan.view.benefits.CopyBenefitDetail', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.plan-benefits-copybenefitdetail',
    title: '~copydetails',
    //rootVisible: false,

    viewModel:{
        stores:{
            detailtree: {
                type:'plan-benefitdetailtree'
            }
        }
    },

    bind:{
        store: '{detailtree}'
    },

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'combo',
                    labelWidth: 125,
                    width: 350,
                    fieldLabel: 'Target Benefit Plan',
                    emptyText: 'Benefit Plan ID',
                    bind: {
                        store: '{groupplans}'
                    },
                    listConfig: {
                        getInnerTpl: function () {
                            var tpl = '<div>' +
                                '<b>{planGroupCode}</b><br/>' +
                                '{planGroupName}<br/>' +
                                '{lobName}<br/>' +
                                '{accountName}</div>';
                            return tpl;
                        }
                    },
                    reference: 'plancopygroupcombo',
                    queryMode: 'local',
                    name: 'plangroup',
                    displayField: 'planGroupName',
                    valueField: '"planGroupId'
                },
                {
                    text: 'Copy'

                }
            ]
        }

    ]

});