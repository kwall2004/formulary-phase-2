/**
 * Created by s6635 on 11/22/2016.
 */
//BenefitPlanAssociatedPopulations
Ext.define('Atlas.benefitplan.view.benefitplan.BenefitPlanAssociatedPopulations', {
    extend: 'Ext.window.Window',
    controller: 'benefitplanassociatedPopulationsController',
    viewModel: {
        stores: {
            popTree: {
                type:'tree',
                model: 'Atlas.benefitplan.model.BenefitPlanAssociatedPopulations',
                filterer: 'bottomup'
            }
        }
    },

    title: 'Associated Populations',
    iconCls: 'x-fa fa-question-circle',
    scrollable: true,
    closable: false,
    draggable: false,
    resizable: false,
    width: 500,
    height: 500,
    modal: true,
    layout: 'border',

    items: [
        {
            region: 'north',
            xtype: 'container',
            title: 'Associated Populations',
            defaults: {
                layout: 'anchor',
                margin: 5,
                defaults: {
                    anchor: '100%'
                }
            },
            items: [
                {
                    rootVisible: false,
                    xtype: 'treepanel',
                    plugins: 'gridfilters',
                    bind: {
                        store: '{popTree}'
                    },
                    columns: [{
                        xtype: 'treecolumn',
                        dataIndex: 'name',
                        flex: 1
                    }],
                    bbar: [
                        {
                            text: 'Close',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ]

        }
    ]
});
