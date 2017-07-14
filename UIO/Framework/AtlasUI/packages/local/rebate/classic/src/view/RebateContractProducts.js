/**
 * Created by j2487 on 11/11/2016.
 */
Ext.define('Atlas.rebate.view.RebateContractProducts', {
    extend: 'Ext.panel.Panel',
    xtype:'rebateproducts',
    layout:'hbox',
    controller:'rebatecontractproduct',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    items:[
        {
            xtype:'gridpanel',height:'100%',flex:2,
            selModel: {
                selType: 'rowmodel', // rowmodel is the default selection model
                mode: 'MULTI' // Allows selection of multiple rows
            },
            plugins: [
                    {
                        ptype: 'rowediting',
                        reference: 'rowediting',errorSummary:false,
                        triggerEvent: 'celldblclick',
                        pluginId: 'rowEdit',
                        listeners: {
                            cancelEdit: 'cancelEditButton',
                            beforeEdit: 'beforeEdit'
                        }
                    },
                    {
                        ptype: 'gridfilters'
                    }
              ],
            title:'Rebate Products and Competitor',itemId:'productGrid',
            listeners:{rowclick:'onProductRowSelect'},
            bind:{store:'{contractproductstore}'},
            columns:[
                {
                    text:'NDC',flex:1,dataIndex:'NDC',emptyText:'[NDC or Product Name]', filter: {type: 'string'},
                    editor:{
                    allowBlank: true,
                    xtype: 'drugtypeahead',
                    listeners: {
                        select:'onDrugSelection'}
                    }
                },
                {
                    text:'',flex:0.5,
                    hideable : false,
                    xtype:'actioncolumn',
                    items: [{
                        xtype:'button',
                        iconCls: 'x-fa fa-arrow-right',  // Use a URL in the icon config
                        tooltip: 'View Drug Details',
                        handler:'RouteToDrugSearch'

                    }]
                },
                {text:'Product Name',flex:2,dataIndex:'BN', filter: {type: 'string'}},
                {text:'Rebate Type',flex:1,dataIndex:'RebateType',
                    renderer: function(value,record){
                    if(value == 1){  return 'Base';}
                    else return value;
                    },
                    editor:{
                    xtype:'combobox',displayField:'name',valueField:'value',bind:{store:'{rebatetypestore}'},
                    allowBlank: false,
                        listeners: {
                            select:'onRebateSelection'}
                }},
                {text:'Cost Basis',flex:1,dataIndex:'CostBasis',
                    renderer: 'rendererCostBasis',editor:{
                    xtype:'combobox',displayField:'name',valueField:'value',bind:{store:'{costbasisstore}'},
                    allowBlank: false,
                    listeners: {
                        select:'onCostBasisSelection'}
                }},
                {text:'%',flex:1,dataIndex:'Percentage',
                    xtype: 'numbercolumn',
                    format: '0,0.000%',
                    // renderer: function(value){
                    //     return value + '%'
                    // },
                    editor:{
                    allowBlank: true
                }},
                {flex:1,dataIndex:'SystemID',hidden:true},
                {
                    xtype: 'widgetcolumn',
                    align: 'center',
                    width: 100,
                    hideable : false,
                    widget: {
                        xtype: 'container',
                        bind: true,
                        defaults: {
                            xtype: 'tool',
                            viewModel: true
                        },

                        items: [
                            // reject tool
                            {
                                xtype: 'button',
                                text: 'Reject',
                                preventDefault:true,
                                width: 75,
                                iconCls: 'x-action-col-icon x-fa fa-undo',
                                bind: {
                                    hidden: '{!record.isNeedUpdate}',
                                    tooltip: 'Reject '
                                },
                                handler:'onRejectProduct'

                            }
                        ]
                    }
                }

            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            xtype:'segmentedbutton',
                            items:[
                                {text:'Add Product',handler:'onAddProduct'},
                                {text:'Remove Product',handler:'onRemoveProduct'}
                            ]
                        },'->',
                        {xtype:'button',text:'Create/Edit Competitor',handler:'createEditCompetitor'}
                    ]
                },
                {
                    xtype:'toolbar',
                    dock:'bottom',
                    items:['->',
                        {xtype:'button',text:'Save Rebate Products',itemId:'btnSaveProduct',handler:'HandleChanges'}]
                }]
        },
        {
            xtype:'gridpanel',height:'100%',flex:1,
            itemId: 'gridClaimRules',
            title:'Qualified Claim Rules',
            bind:{store:'{claimrules}'},
            plugins:
            {
                ptype: 'rowediting',
                reference: 'rowediting',errorSummary:false,
                triggerEvent: 'celldblclick',
                pluginId: 'rowEdit',
                listeners: {
                    cancelEdit: 'cancelEditButton',
                    beforeEdit: 'beforeEdit'
                }
            },
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text:'Claim Record',
                        dataIndex:'columnID',
                        editor: {
                            xtype: 'combobox',
                            forceSelection: true,
                            allowBlank: false,
                            bind: {store: '{rebateclaimfields}'},
                            matchFieldWidth: false,
                            queryMode: 'local',
                            displayField: 'columnName',
                            valueField: 'columnID'
                        }
                    },
                    {
                        text:'Operator',
                        dataIndex:'ClaimOperator',
                        editor: {
                            xtype: 'combobox',
                            forceSelection: true,
                            allowBlank: false,
                            bind: {store: '{claimeditrulecond}'},
                            matchFieldWidth: false,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }
                    },
                    {
                        text:'Value',
                        dataIndex:'columnValue',
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false
                        }
                    },
                    {flex:1,dataIndex:'SystemID',hidden:true}
                ]
            },
            dockedItems:[
                {
                    xtype:'toolbar',
                    dock:'top',
                    items:[
                        {
                            xtype:'segmentedbutton',
                            items:[
                                {text:'Add Rules',handler:'onAddRules'},
                                {text:'Remove Rules',handler:'onRemoveRules'}
                            ]
                        }]
                },
                {
                    xtype:'toolbar',
                    dock:'bottom',
                    items:['->',
                        {xtype:'button',text:'Save Claim Rules',handler:'HandleChangesClamRules'}]
                }]
        }
    ]
})