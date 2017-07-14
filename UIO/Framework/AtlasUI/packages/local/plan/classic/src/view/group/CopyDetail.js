Ext.define('Atlas.plan.view.group.CopyDetail', {
    // extend: 'Ext.tree.Panel',
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-copydetail',
    title: '~copydetail',
    controller: 'plancopydetailcontroller',

    //values of either 'PlanGroup' or 'PlanBenefit'
    pageEntity: null,

    //tells whether to use the combobox from 'Copy Plan Detail' or 'Copy Benefit Detail'
    tempCbxSelection: null,

    items: [{
        xtype: 'treepanel',
        layout: 'fit',
        viewModel:{
            stores:{
                detailTree: {
                    type:'plan-groupdetailtree'
                },
                nodesUnformatted: {
                    model: 'Atlas.plan.model.GroupDetailNodesUnformatted'
                },
                benefitDetail: {
                    model: 'Atlas.common.model.PlanBenefitExt',
                    remoteSort: true,
                    remoteFilter: true
                }
            }
        },
        bind:{
            store: '{detailTree}'
        },
        listeners: {
            checkchange: 'checkNode'
        },
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'displayfield',
                        itemId: 'displayPlanInfo'
                    },
                    '->',
                    {
                        xtype: 'plangrouptypeahead',
                        fieldLabel: 'Target Plan Group',
                        labelWidth: 125,
                        width: 350,
                        forceSelection: true,
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
                        listeners: {
                            select: 'emptyCbxValues',
                            focusleave: 'replaceEmptyVal'
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'Target Plan Benefit',
                        typeAhead: false,
                        emptyText: '[e.g. MHPMCRLICS1]',
                        hideTrigger: true,
                        displayField: 'planBenefitCode',
                        valueField: 'planBenefitId',
                        queryParam: 'pWhere',
                        pageSize: 10,
                        labelWidth: 125,
                        width: 350,
                        forceSelection: true,
                        listConfig: {
                            getInnerTpl: function () {
                                var tpl = '<div>' +
                                    '<b>{planBenefitCode}</b><br/>' +
                                    '{planGroupName}, {carrierName}</div>';
                                return tpl;
                            }
                        },
                        listeners:{
                            beforequery: function (queryPlan) {
                                queryPlan.query = 'wrdidx contains ' + queryPlan.query;
                            },
                            select: 'emptyCbxValues',
                            focusleave: 'replaceEmptyVal'
                        },
                        bind: {
                            store:'{benefitDetail}'
                        }
                    },
                    {
                        xtype: 'button',
                        text: 'Copy',
                        disabled: true,
                        handler: 'onBtnCopy'
                    }
                ]
            }
        ]
    }]
});