/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.view.configuration.PopulationGroupPlanBenefitPackageSummary', {
    extend:'Ext.form.Panel',
    alias: 'widget.populationGroupPlanBenefitPackageSummary-grid',
    controller: 'popgroupplanbenefitpackagesummaryController',
    title: 'Plan Benefit Package Summary',
    scrollable: 'true',
    viewModel: {
        data:{
            popGrpPBPChange:false,
            popGrpChangeDetails: false
        },
        stores: {
            packageSummary: {
                model: 'Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSummary'
            }
        }
    },
	items: [
        {
            xtype: 'checkbox',
            boxLabel: 'View only active',
            name: 'active',
            reference: 'isActiveFlag',
            hideLabel: true,
            checked: true,
            listeners: {
                change: 'onFilterPackages'
            }
        },
	    {
	        xtype: 'panel',
            maxHeight: 450,
            scrollable: true,
            items: [
                {
                    xtype: 'grid',
                    itemId:'populationGroupPlanBenefitPackageSummaryGrid',
                   // title: 'Plan Benefit Packages',
                    defaults: {
                        sortable: true,
                        filter: {
                            type: 'string'
                        }
                    },
                    viewConfig: {
                        loadMask: false
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        reference: 'rowediting',
                        clicksToEdit: 2,
                        clicksToMoveEditor: 1,
                        pluginId: 'rowEditing',
                        autoCancel: false
                    }],
                    bind: {
                        store: '{packageSummary}'
                    },

                    columns: [
                    {
                        header: 'PBP Name',
                        dataIndex: 'PBPName',
                        flex: 1
                    },
                    {
                        header: 'PBP ID',
                        dataIndex: 'PBPID',
                        flex: 1
                    }, {
                        header: 'Plan Program Code',
                        dataIndex: 'PlanPgmCode',
                        flex: 1
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'DOS Effective Start Date',
                        dataIndex: 'DOSProcsngStartDt',
                        flex: 1,
                        format: 'n/j/Y'
                    },
                    {
                        xtype: 'datecolumn',
                        header: 'DOS Effective End Date',
                        dataIndex: 'DOSProcsngEndDt',
                        flex: 1,
                        format: 'n/j/Y'
                    },
                        {
                            dataIndex: 'isLocked',
                            hidden: true
                        }
                    ],

                    listeners: {
                        selectionchange: 'onSelectionChange'
                    }
                }
            ]
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        defaults: {
            minWidth: 100
        },
        items: [
            {
                xtype: 'button',
                text: 'Add Plan Benefit Package',
                handler: 'onAddPlanBenefitPackageClick'
            },

            {
                xtype: 'button',
                text: 'Remove Plan Benefit Package',
                reference: 'removeRow',
                handler: 'onRemoveClick',
                bind: {
                    disabled:'{!popGrpPBPChange}'
                }
            },

            {
                xtype: 'button',
                text: 'Details',
                reference : 'detailBtn',
                handler: 'onDetailsClick',
                bind: {
                    disabled: '{!popGrpChangeDetails}'
                }

            }
        ]
    }]
});
