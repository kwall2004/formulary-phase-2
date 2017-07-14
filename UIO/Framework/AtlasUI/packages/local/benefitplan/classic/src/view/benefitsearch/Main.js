/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.benefitsearch.Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.benefitplan-benefitsearch-main',
    title: 'Benefit Search',
    controller: 'benefitsearchview',
    viewModel: {
        stores: {
            benefitsearch: {
                model: 'Atlas.benefitplan.model.BenefitSearchResults',
                sorters: 'benefitsearchResults',
                autoLoad: false
            },
            industrystandardnames: {
                model: 'Atlas.benefitplan.model.ServiceType',
                autoLoad: true
            },
            copyEditBenefit: {
                model : 'Atlas.benefitplan.model.BenefitName',
                proxy: {
                    actionMethods: {
                        read: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/CopyBenefitDefinition'
                }
            }
        }
    },
    items:[
        {
            xtype: 'form',
            title: 'Benefit Search',
            titleAlign: 'center',
            layout: 'container',
            scrollable: true,
            items: [{
                xtype: 'fieldset',
                title: 'Search Criteria',
                region: 'north',
                items: [{
                    xtype: 'form',
                    layout: 'column',
                    defaults: {
                        xtype: 'container',
                        layout: 'anchor',
                        columnWidth: 0.3,
                        margin: 5,
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%',
                            labelWidth: 150
                        }
                    },
                    items: [{
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Benefit Name',
                                emptyText: 'search',
                                maxLength: 50,
                                vtype: 'atlasAlphaNumDash',
                                name: 'benefit',
                                listeners: {
                                    change: 'onSearch'
                                }
                            }, {
                                xtype: 'combo',
                                itemId:'industryStandardName',
                                fieldLabel: 'Industry Standard Name',
                                emptyText: '',
                                bind: {
                                    store: '{industrystandardnames}'
                                },
                                queryMode: 'local',
                                name: 'industryStandardName',
                                displayField: 'SvcTypeDesc',
                                valueField: 'SvcTypeSK',
                                listeners:
                                {
                                    change: 'onSearch'
                                }
                            }]
                    }, {
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Effective Start Date',
                                emptyText: 'Select Effective Start Date',
                                format: 'n/j/Y',
                                name: 'benefitStartDate',
                                itemId: 'benefitStartDate',
                                reference: 'benefitStartDate',
                                listeners: {
                                    change: 'onSearch'
                                }
                            },{
                                xtype: 'datefield',
                                fieldLabel: 'Effective End Date',
                                emptyText: 'Select Effective End Date',
                                format: 'n/j/Y',
                                name: 'benefitEndDate',
                                itemId: 'benefitEndDate',
                                reference: 'benefitEndDate',
                                listeners: {
                                    change: 'onSearch'
                                }
                            }]
                    },{
                        items:[
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Benefit Code',
                                name: 'hipaa',
                                listeners: {
                                    change: 'onSearch'
                                }
                            }
                        ]
                    }],
                    buttons: [{
                        text: 'Search',
                        handler: 'onSearch'
                    }, {
                        text: 'Reset',
                        handler: 'onReset'
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: 'Search Results',
                region: 'center',
                scrollable: true,
                items: [{
                    xtype: 'grid',
                    height: 600,
                    itemId: 'benefitGrid',
                    reference: 'benefitGrid',
                    viewConfig: {
                        loadMask: false
                    },
                    bind: {
                        store: '{benefitsearch}'
                    },
                    columns: [{
                        dataIndex: 'BnftSK',
                        hidden: true,
                        hideable: false
                    }, {
                        text: 'Order',
                        dataIndex: 'BnftOrder',
                        renderer: function(val){
                            return Ext.String.leftPad(val, 4, '0');
                        },
                        flex: 1
                    }, {
                        text: 'Industry Standard Name',
                        dataIndex: 'SvcTypeDesc',
                        flex: 1
                    }, {
                        text: 'Benefit Name',
                        dataIndex: 'BnftName',
                        flex: 1
                    },
                        {
                            text: 'Status',
                            dataIndex: 'StatDesc',
                            flex: 1
                        },{
                            text: 'Benefit Code',
                            dataIndex: 'BnftCode',
                            flex: 1,
                            renderer:function(field){
                                return field =  field.toUpperCase();
                            }
                        },
                        {
                        text: 'Effective Start Date',
                        dataIndex: 'EfctvStartDt',
                        formatter: 'date("n/j/Y")',
                        flex: 1
                    }, {
                        text: 'Effective End Date',
                        dataIndex: 'EfctvEndDt',
                        formatter: 'date("n/j/Y")',
                        flex: 1
                    }],
                    listeners: {
                        itemdblclick: 'onPlanBenefitGridItemClick'
                    }
                }]
            }]
        }
    ],
    bbar: [
        {
            text: 'Create New Benefit',
            handler: 'onNewBenefitClick'
        }, {
            text: 'Edit Benefit',
            reference:'editBenefitButton',
            bind: {
                disabled: '{!benefitGrid.selection}'
            },
            handler: 'onPlanBenefitGridItemClick'
        }, {
            text: 'Copy & Edit',
            reference:'copyEditButton',
            bind: {
                disabled: '{!benefitGrid.selection}'
            },
            handler: 'onPlanBenefitGridItemClick'
        }, {
            text: 'Cancel',
            reference:'cancelButton',
            handler: 'onCancelClick'
        }
    ]

});