/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.AssociatedPopulations', {
    extend: 'Ext.window.Window',
    controller: 'associatedPopulationsController',
    viewModel: {
        stores: {
            popGrpTree: {
                type:'tree',
                model: 'Atlas.benefitplan.model.AsscociatedPopulations',
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
                        store: '{popGrpTree}'
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
