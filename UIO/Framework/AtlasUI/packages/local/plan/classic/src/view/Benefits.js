Ext.define('Atlas.plan.view.Benefits', {
    extend: 'Ext.tab.Panel',
    //alias: 'widget.plan-benefits',
    // controller: 'plan-benefits',
    controller: 'plan-benefitscontroller',
    viewModel:'plan-benefits',

    dockedItems: [{
        xtype:'toolbar',
        dock:'top',
        items:[

            {
                xtype: 'planBenefit',
                labelWidth: 125,
                width: 350,
                fieldLabel: 'Plan Benefits',
                itemId: 'hdnPlanBenefitCodeLA',
                emptyText: 'Plan benefit ID',
                typeAhead: false,
                hideTrigger:true,
                queryParam: 'pWhere',
                pageSize: 10,
                editable: true,
                displayField: 'planBenefitCode',
                valueField: '"planBenefitId',
                reference:'planBenefitInfo',
                matchFieldWidth:false,
                //id:'planBenefitInfoComboBox',
                listeners: {
                    beforequery: function (queryPlan) {
                        queryPlan.query = 'wrdidx contains ' + queryPlan.query;
                    },
                    select: 'cbxbenefits_Select'
                },
                listConfig: {
                    // Custom rendering template for each item
                    userCls: 'common-key-value-boundlist',
                    getInnerTpl: function() {
                        return ' <h3>{planBenefitCode}</h3>'+
                            '{planGroupName}, {carrierName}'
                    }
                }


            }, {
                xtype:'label',
                itemId:'lblAtlasBenefitPlan',
                cls:'m-red-color'
            },
            '->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                handler: 'onNewPlanBenefitsClick',
                text: 'Add New Plan',
                itemId:'btnNewBenefitPlan'
            },
            // {
            //     xtype: 'button',
            //     reference: 'menu',
            //     text: 'Menu',
            //     iconCls: 'x-fa fa-bars',
            //     menu: [
            //         //The value should be equal to the xtype of the view you are trying to load
            //         {
            //             text: 'Plan Benefit Detail',
            //             value: 'plan-benefits-detail',
            //             handler: 'menuOnClick'
            //         },
            //
            //         {
            //             text: 'Administrative Fees',
            //             value: 'plan-benefits-adminfees',
            //             handler: 'menuOnClick'
            //         },
            //
            //         {
            //             text: 'Copay',
            //             value: 'plan-benefits-copay',
            //             handler: 'menuOnClick'
            //         },
            //         {
            //             text: 'DAW Copay',
            //             value: 'plan-benefits-dawcopay',
            //             handler: 'menuOnClick'
            //         },
            //
            //         {
            //             text: 'Copay Distribution',
            //             value: 'plan-benefits-copaydistribution',
            //             handler: 'menuOnClick'
            //         },
            //         {
            //             text: 'Pricing',
            //             value: 'plan-benefits-pricing',
            //             handler: 'menuOnClick'
            //         },
            //
            //         {
            //             text: 'Copy Benefit Details',
            //             value: 'plan-group-copydetail',
            //             handler: 'menuOnClick'
            //         }
            //
            //     ]
            // },
            {
                xtype: 'button',
                reference: 'menu',
                text: 'Menu',
                iconCls: 'x-fa fa-bars',
                menu: {
                    plain: true,
                    listeners: {
                        click: 'onMenuClick'
                    }
                }
            },
            {
                xtype: 'hidden', itemId: 'hdnParentPlanGroupId'
            },
            {
                xtype: 'hidden', itemId: 'hdnParentPlanBenefitId'
            },
            {
                xtype: 'hidden', itemId: 'hdnParentPlanBenefitStatus'
            }
        ]
    }],

    defaults:{
        closable: true
    }
    //,

    // items: [
    //     {
    //         xtype: 'plan-benefits-detail'
    //     }
    // ]

});