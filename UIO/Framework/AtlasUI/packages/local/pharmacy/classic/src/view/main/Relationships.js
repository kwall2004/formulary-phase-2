Ext.define('Atlas.pharmacy.view.main.Relationships', {
    extend: 'Ext.Panel',

    viewModel: {
        stores: {
            relationships: {
                model: 'Atlas.pharmacy.model.Relationships'
            }
        }
    },
    controller: 'pharmacy-relationships',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    scrollable: true,

    items: [
        {
            xtype: 'grid',
            title: 'Pharmacy Relationship map',
            height: 200,
            viewConfig: {
                deferEmptyText: false,
                emptyText: 'No Relationship data available'
            },
            bind: '{relationships}',
            listeners: {
                selectionchange: 'recordSelected'
            },
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Relationship ID',
                        dataIndex: 'RSrelationshipID'
                    },
                    {
                        text: 'Relationship Entity Name',
                        dataIndex: 'RSname',
                        renderer: function (value, metaData) {
                            metaData.tdCls = 'm-red-cell';
                            return value;
                        }

                    },
                    {
                        text: 'Relationship Type',
                        dataIndex: 'RSRelationTypeInfo'
                    },
                    {
                        text: 'Payment Center ID',
                        hidden: true,
                        dataIndex: 'PCpayCenterId'
                    },
                    {
                        text: 'Payment Center name',
                        dataIndex: 'PCpayCenterName',
                        renderer: function (value, metaData) {
                            metaData.tdCls = 'm-red-cell';
                            return value;
                        }
                    },
                    {
                        xtype:'datecolumn',
                        text: 'Effective Date',
                        dataIndex: 'PReffDate'
                    },
                    {
                        xtype:'datecolumn',
                        text: 'Term Date',
                        hidden: true,
                        dataIndex: 'PRtermdate'
                    },
                    {
                        text: 'Parent Name',
                        dataIndex: 'PMparentOrgName'
                    }
                ]
            }
        },
        {
            xtype: 'form',
            title: 'Relationship Details',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'panel',
                margin: 5,
                bodyPadding: 5,
                flex: 1
            },
            items: [
                {
                    title: 'Relationships',
                    items: [{
                        xtype: 'fieldset',
                        name: 'rel',
                        title: 'Relationship Name',
                        layout: 'anchor',
                        defaults: {
                            xtype: 'displayfield',
                            anchor: '100%'
                        },
                        items: [
                            {
                                fieldLabel: 'Address',
                                name: 'RSaddress1'
                            },
                            {
                                fieldLabel: 'Location',
                                name: '_RSCityState'
                            },
                            {
                                fieldLabel: 'Contact Name',
                                name: 'RScontactName'
                            },
                            {
                                fieldLabel: 'Contact Title',
                                name: 'RScontactTitle'
                            },
                            {
                                fieldLabel: 'Email',
                                name: 'RSemail'
                            },
                            {
                                fieldLabel: 'Phone',
                                name: 'RSphone'
                            },
                            {
                                fieldLabel: 'Extention',
                                name: 'RSext'
                            },
                            {
                                fieldLabel: 'Fax',
                                name: 'RSfaxNum'
                            },
                            {
                                fieldLabel: 'NPI',
                                name: 'RSNPI'
                            },
                            {
                                fieldLabel: 'Federal Tax ID',
                                name: 'RSFederalTaxId'
                            }
                        ]
                    }]
                },
                {
                    title: 'Payment Center',
                    items: [{
                        xtype: 'fieldset',
                        name: 'payment',
                        title: 'Payment Center Name',
                        layout: 'anchor',
                        defaults: {
                            xtype: 'displayfield',
                            anchor: '100%'
                        },
                        items: [
                            {
                                fieldLabel: 'Address',
                                name: 'PCremitAddress1'
                            },
                            {
                                fieldLabel: 'Location',
                                name: '_PCCityState'
                            },
                            {
                                fieldLabel: 'Contact Name',
                                name: 'PCremitContact'
                            },
                            {
                                fieldLabel: 'Contact Title',
                                name: 'PCremitContactTitle'
                            },
                            {
                                fieldLabel: 'Email',
                                name: 'PCremitEmail'
                            },
                            {
                                fieldLabel: 'Phone',
                                name: 'PCremitPhone'
                            },
                            {
                                fieldLabel: 'Extention',
                                name: 'PCremitExt'
                            },
                            {
                                fieldLabel: 'Fax',
                                name: 'PCremitFax'
                            },
                            {
                                fieldLabel: 'NPI',
                                name: 'PCNPI'
                            },
                            {
                                fieldLabel: 'Federal Tax ID',
                                name: 'PCFederalTaxId'
                            }
                        ]
                    }]
                },
                {
                    title: 'Parent Organization',
                    items: [{
                        xtype: 'fieldset',
                        name: 'parentorg',
                        title: 'Parent Organization Name',
                        layout: 'anchor',
                        defaults: {
                            xtype: 'displayfield',
                            anchor: '100%'
                        },
                        items: [
                            {
                                fieldLabel: 'Address',
                                name: 'PMaddress1'
                            },
                            {
                                fieldLabel: 'Location',
                                name: '_PMCityState'
                            },
                            {
                                fieldLabel: 'Contact Name',
                                name: 'PMcontactName'
                            },
                            {
                                fieldLabel: 'Contact Title',
                                name: 'PMcontactTitle'
                            },
                            {
                                fieldLabel: 'Email',
                                name: 'PMemail'
                            },
                            {
                                fieldLabel: 'Phone',
                                name: 'PMphone'
                            },
                            {
                                fieldLabel: 'Extention',
                                name: 'PMext'
                            },
                            {
                                fieldLabel: 'Fax',
                                name: 'PMfax'
                            }
                        ]
                    }]
                }
            ]
        }
    ]
});
