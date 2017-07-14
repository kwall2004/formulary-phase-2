Ext.define('Atlas.benefitplan.view.tenantsearch.Main', {
    extend:'Ext.panel.Panel',
    layout: 'fit',
    requires: [
        'Ext.form.RadioGroup'
    ],
    controller: 'benefitplan-tenantsearchcontroller',
    viewModel: {
        data:{
            changeType: false
        },
        stores: {
            tenantsearch: {
                model: 'Atlas.benefitplan.model.TenantSearch'
            },
            lob:{
                model:'Atlas.benefitplan.model.LineOfBusiness'
            }
        }
    },
    items: [
        {
            xtype: 'form',
            title: 'Search Tenant Hierarchy',
            titleAlign: 'center',
            layout: 'border',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Search Criteria',
                    region: 'north',
                    defaults: {
                        labelWidth: 90,
                        anchor: '100%',
                        layout: 'hbox'
                    },
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            combineErrors: true,
                            msgTarget: 'side',
                            defaults: {
                                margin: '0 5 0 0'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    itemId:'searchRadioType',
                                    flex : 5,
                                    items: [{
                                        boxLabel: 'Plan Benefit Package Name',
                                        name:'tenantSearchType',
                                        inputValue: '1'
                                    }, {
                                        boxLabel: 'Plan Benefit Package ID',
                                        name:'tenantSearchType',
                                        inputValue: '2'
                                    }, {
                                        boxLabel: 'Hierarchy Names',
                                        name:'tenantSearchType',
                                        inputValue: '0',
                                        checked: true
                                        },{
                                        boxLabel: 'Line of Business',
                                        name:'tenantSearchType',
                                        inputValue: '3'
                                    }],
                                    listeners:{
                                        change: 'onRadioChange'
                                    }

                                },
                                {
                                    xtype:'combo',
                                    id:'tenantSearchCombo',
                                    reference:'tenantsearchcombo',
                                    flex:2,
                                    emptyText: 'Select Line of Business',
                                    name:'tenantSearchType',
                                    bind:{
                                        store:'{lob}',
                                        hidden : '{!changeType}'
                                    },

                                    valueField:'LOBSK',
                                    displayField:'LOBName'
                                },
                                {
                                    xtype: 'textfield',
                                    flex : 2,
                                    id:'tenantSearchTxt',
                                    reference: 'tenantSearchText',
                                    emptyText: 'Search',
                                    allowBlank: false,  // requires a non-empty value
                                    minLength: 3,        // requires at least 3 Characters
                                    bind:{
                                      hidden:'{changeType}'
                                    },
                                    listeners: {
                                        specialkey: 'onSearchEnterKey'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    text: 'Search',
                                    id: 'tenantsearchButton',
                                    handler: 'onTenantSearch'
                                }
                            ]
                        }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Search Results',
                    region: 'center',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'tenantsearch-grid'
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        {
            text: 'Open Tenant Hierarchy',
            bind: {
                disabled: '{!tenantsearchGrid.selection}'
            },
            handler: 'onGridItemClick'
        },
        {
            text: 'Create New Tenant Hierarchy',
            handler: 'onNewTenantHierarchyClick'
        }
    ]
});