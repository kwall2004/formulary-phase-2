Ext.define('Atlas.portals.view.registration.HPProviderRegistration', {
    extend: 'Ext.window.Window',
    xtype: 'hpproviderregistration',

    controller: 'hpproviderregistration',
    viewModel: {
        stores: {
            npilist: {},
            provloc: {
                model: 'Atlas.portals.provider.model.ProvLocMasterWeb'
            },
            availablelocations: {},
            selectedlocations: {},
            states: {
                type: 'provider-state'
            }
        }
    },

    title: 'Register New User',
    layout: 'center',
    modal: true,
    scrollable: true,
    items: [
        {
            xtype: 'form',
            cls: 'formPanel',
            reference: 'registrationForm',
            layout: 'card',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                width: 930,

                items: [                        {
                    xtype: 'fieldset',
                    title: 'Provider Info',
                    flex: 1,
                    defaults: {
                        labelWidth: 130,
                        width: 400
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Provider Group <br>Name',
                            allowBlank: false,
                            name: 'providerGroupName'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Address 1',
                            name: 'addressOne'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Address 2',
                            name: 'addressTwo'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'City',
                            name: 'city'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'State',
                            name: 'State',
                            reference: 'stateCombo',
                            displayField: 'abbr',
                            valueField: 'abbr',
                            bind: {
                            store: '{states}'
                            },
                            minChars: 0,
                            queryMode: 'local',
                            typeAhead: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Zip',
                            name: 'zip'
                        }
                    ]
                },
                    {
                        xtype: 'fieldset',
                        title: 'Office Contact',
                        flex: 1,
                        defaults: {
                            labelWidth: 130,
                            width: 400
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'First Name',
                                allowBlank: false,
                                name: 'firstName'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Last Name',
                                allowBlank: false,
                                name: 'lastName'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Email',
                                allowBlank: false,
                                name: 'email'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Phone',
                                allowBlank: false,
                                name: 'phone'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Fax',
                                name: 'fax'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Required Users',
                                name: 'requiredUsers'
                            }
                        ]
                    }]
            },{
                xtype: 'container',
                layout: 'hbox',
                width: 920,


                items: [                        {
                    xtype: 'fieldset',
                    title: 'Provider NPI Info',
                    flex: 1,
                    items: [
                        {
                            xtype: 'displayfield',
                            value: 'Please enter the NPI number of each provider in your group.'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Other Non-Health Care Provider',
                            name: 'otherProviderCheckBox',
                            reference: 'otherProviderCheckBox',
                            listeners: {
                                change: 'changeHealthProvider'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NPI Number',
                            reference: 'idField',
                            name: 'idField'
                        },{
                            xtype: 'toolbar',

                            items: [                        {
                                xtype: 'button',
                                text: 'Add to List',
                                handler: 'addNPI'
                            },
                                {
                                    xtype: 'button',
                                    text: 'Remove from List',
                                    handler: 'onRemoveFromListClick'
                                }]
                        },
                        {
                            xtype: 'grid',
                            reference: 'npiListGrid',
                            bind: '{npilist}',
                            height: 200,
                            columns: [
                                {
                                    text: 'NPI List',
                                    flex: 1,
                                    renderer: function (value, cell, record) {
                                        var data = record.getData();

                                        return data.npiInput + '-' + data.firstName + ' ' + data.lastName + ' ' + data.npiNumber;
                                    }
                                }
                            ]
                        }
                    ]
                },
                    {
                        xtype: 'fieldset',
                        title: 'Provider Locations',
                        flex: 1,
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'grid',
                                bind: '{availablelocations}',
                                reference: 'availableLocationsGrid',
                                width: 200,
                                height: 300,
                                columns: [
                                    {
                                        text: 'Available',
                                        flex: 1,
                                        renderer: function(value, gridcell, record) {
                                            var data = record.getData();

                                            return '<b>' + data.address1 + '</b><br>' + data.city + ', ' + data.state + '<br>' + data.zip;
                                        }
                                    }
                                ],
                                viewConfig: {
                                    plugins: {
                                        ptype: 'gridviewdragdrop',
                                        containerScroll: true,
                                        dragGroup: 'dd-grid-to-grid-group1',
                                        dropGroup: 'dd-grid-to-grid-group2'
                                    }
                                }
                            },
                            {
                                xtype: 'grid',
                                bind: '{selectedlocations}',
                                reference: 'selectedLocationGrid',
                                width: 200,
                                height: 300,
                                columns: [
                                    {
                                        text: 'Selected',
                                        flex: 1,
                                        renderer: function(value, gridcell, record) {
                                            var data = record.getData();

                                            return '<b>' + data.address1 + '</b><br>' + data.city + ', ' + data.state + '<br>' + data.zip;
                                        }
                                    }
                                ],
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
                                }
                            }
                        ]
                    }]
            },{
                xtype: 'container',
                layout: 'hbox',
                width: 575,

                items: [                        {
                    xtype: 'fieldset',
                    width: 550,
                    title: 'Additional Comments',
                    items: [
                        {
                            xtype: 'textarea',
                            width: 505,
                            name: 'comments'
                        }
                    ]
                }]
            }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Clear',
                    handler: 'clearForm'
                },
                {
                    text: '<i class="fa fa-arrow-left" aria-hidden="true"></i> Previous',
                    disabled: true,
                    reference: 'regPrev',
                    handler: 'onPreviousClick'
                },
                {
                    text:' Next <i class="fa fa-arrow-right" aria-hidden="true"></i>',
                    reference: 'regNext',
                    handler: 'onNextClick'
                },
                {
                    text: 'Register',
                    disabled: true,
                    reference: 'regSubmit',
                    handler: 'registerUser'
                }
            ]
        },
        {
            xtype: 'container',
            dock: 'bottom',
            html: 'I certify that I am the person identified above or the person\'s authorized representative.',
            padding: '0 0 0 10'
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'registrationStatus'
                }
            ]
        },
        {
            xtype: 'label',
            dock: 'top',
            cls: 'login-label',
            reference: 'regSuccessMsg'
        }
    ]
});