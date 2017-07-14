/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.view.provider.HEDISPostcards', {
    extend: 'Ext.container.Container',
    xtype: 'portalsproviderhedispostcards',
    title: 'HEDIS Postcards',

    controller: 'hedispostcards',
    viewModel: {
        stores: {
            providerlistweb: {
                model: 'Atlas.portals.provider.model.ProviderListWeb'
            },
            hedismeasures: {
                model: 'Atlas.portals.provider.model.ListItems'
            },
            providerdocuments: {
                model: 'Atlas.portals.provider.model.ListStringWeb'
            },
            providerdocinfo: {
                model: 'Atlas.portals.provider.model.ProviderDocInfo'
            },
            viewhistory: {
                model: 'Atlas.portals.hpmember.model.RunReport64'
            }
        }
    },
    scrollable: true,

    items: [{
        xtype: 'panel',
        title: 'HEDIS Postcards',
        cls: 'card-panel',
        minWidth: 1200,

        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',

            defaults: {
                xtype: 'button'
            },
            items: ['->',
                {
                    text: 'Submit',
                    handler: 'onSubmit'
                },
                {
                    text: 'Cancel',
                    handler: 'cancelForm'
                },
                {
                    text: 'View History',
                    handler: 'viewHistory'
                },'->'
            ]
        }],

        items: [        {
            xtype: 'fieldset',
            title: 'Search Providers',

            items: [{
                xtype: 'toolbar',

                items: [{
                    xtype: 'textfield',
                    reference: 'nameFilterField',
                    fieldLabel: 'Search By Name',
                    enableKeyEvents: true,
                    listeners: {
                        keyup: 'onNameFilterKeyup',
                        buffer: 500
                    }
                },
                    {
                        xtype: 'button',
                        text: 'Search',
                        handler:  'onNameFilterKeyup'
                    }
                    ,
                    {
                        xtype: 'button',
                        text: 'Clear',
                        handler:  'onClearButtonClick'
                    }
                ]
            },{
                xtype: 'panel',
                cls: 'card-panel',
                layout: 'hbox',

                items: [                {
                    xtype: 'grid',
                    forceFit: true,
                    flex: 1,
                    height: 300,
                    title: 'Available Providers',
                    reference: 'availableProvidersGrid',
                    multiSelect: true,
                    tools: [{
                        type: 'refresh',
                        tooltip: 'Reset both grids',
                        handler: 'onResetClick'
                    }],
                    viewConfig: {
                        plugins: {
                            ptype: 'gridviewdragdrop',
                            containerScroll: true,
                            dragGroup: 'dd-grid-to-grid-group1',
                            dropGroup: 'dd-grid-to-grid-group2'
                        }
                    },
                    bind: '{providerlistweb}',
                    columns: [
                        {
                            text: 'Name',
                            dataIndex: 'name',
                            sortable: true
                        }
                    ]
                },
                    {
                        xtype: 'grid',
                        forceFit: true,
                        flex: 1,
                        height: 300,
                        title: 'Selected Providers',
                        reference: 'selectedProvidersGrid',
                        multiSelect: true,
                        stripeRows: true,
                        viewConfig: {
                            plugins: {
                                ptype: 'gridviewdragdrop',
                                containerScroll: true,
                                dragGroup: 'dd-grid-to-grid-group2',
                                dropGroup: 'dd-grid-to-grid-group1',

                                // The right hand drop zone gets special styling
                                // when dragging over it.
                                dropZone: {
                                    overClass: 'dd-over-gridview'
                                }
                            }
                        },
                        store: {
                            model: 'Atlas.portals.provider.model.ProviderListTemp'
                        },
                        columns: [
                            {
                                text: 'Name',
                                dataIndex: 'name',
                                sortable: true
                            }
                        ]
                    }]
            }]
        },{
            xtype: 'fieldset',
            title: 'Select Measures to Mail',

            items: [{
                xtype: 'toolbar',
                defaults: {
                    xtype: 'button'
                },
                items: [
                    {
                        text: 'Select All',
                        handler: 'selectAll'
                    },
                    {
                        text: 'Clear All',
                        handler: 'clearAll'
                    }
                ]
            },{
                xtype: 'checkboxgroup',
                columns: 3,
                vertical: true,
                title: 'Select Measures to Mail',
                reference: 'mailMeasures',
                defaults: {
                    xtype: 'checkboxfield'
                }
            },
                {
                    xtype:'displayfield',
                    hidden: true,
                    reference: 'errorMessageRef'
                },
                {
                    xtype:'displayfield',
                    hidden: true,
                    reference: 'errorMessageRef2'
                }]
        }]
    }
    ]
});