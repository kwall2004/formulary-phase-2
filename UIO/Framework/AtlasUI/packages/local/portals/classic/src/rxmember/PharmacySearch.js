Ext.define('Atlas.portals.view.rxmember.PharmacySearch', {
    extend: 'Ext.panel.Panel',
    xtype: 'portals-rxmember-PharmacySearch',
    title: 'Pharmacy Search',
    viewModel: 'PharmacySearchModel',
    controller: 'pharmacySearchController',
    requires: [
        'Ext.panel.Panel',
        'Ext.grid.plugin.Exporter'
    ],
    layout: 'border',
    items: [{
        region: 'center',
        layout: 'border',
        xtype: 'form',
        cls: 'formPanel',
        reference: 'pharmacySearchForm',

        items:
            [{
                region: 'north',
                xtype: 'panel',
                cls: 'card-panel',
                title: 'Pharmacy Search',
                layout: 'hbox',
                defaults: {
                    bodyPadding: 10,
                    margin: 10
                },

                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',

                    items: [{
                        xtype: 'button',
                        text: 'Search',
                        listeners: {
                            click: 'onPharmacySearch'
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Reset',
                            listeners: {
                                click: 'resetFields'
                            }
                        }]
                }],

                items:[{
                xtype: 'container',
                defaults: {
                    labelWidth: 115,
                    autoWidth: true,
                    anchor: '100%'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'PharmacyName',
                    fieldLabel: 'Pharmacy Name'
                },
                {
                    xtype: 'combo',
                    reference: 'pharmacyType',
                    fieldLabel: 'Pharmacy Type',
                    itemId: "pharmacyType",
                    hiddenName:'pharmacyType',
                    bind: {
                        store: '{pharmacytypestore}'
                    },
                    displayField: 'name',
                    valueField: 'value',
                    triggerAction: 'all',
                    emptyText: 'Select a type'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Coverage:',
                    name: 'coverage',
                    reference: 'coverage',
                    queryMode: 'local',
                    displayField: 'DisplayName',
                    valueField: 'CarrierLOBId',
                    emptyText: 'Select a plan',
                    listeners: {
                        select: 'onCoverageSelected'
                    },
                    allowBlank: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Network',
                    name: 'pharmacyNetwork',
                    reference: 'pharmacyNetwork',
                    queryMode: 'local',
                    displayField: 'displayName',
                    valueField: 'networkId',
                    emptyText: 'Select a network'
                }]
            },
            {
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    items: [{
                        xtype: 'textfield',
                        name: 'ZipCode',
                        fieldLabel: 'Zip Code',
                        allowBlank: false
                    },
                    {
                        xtype: 'textfield',
                        name: 'mile_radius',
                        fieldLabel: 'Mile Radius'
                    }]
                }]
            }]
        },

        {
            region: 'center',
            xtype: 'gridpanel',
            cls: 'card-panel',
            reference: 'pharmacygridpanel',
            tbar: {
                xtype: 'toolbar',
                items: [
                    '* Select a network to display only \'In-network\' pharmacies',
                    '->'
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No pharmacies to display.'
            },
            plugins: [{
                ptype: 'gridexporter'
            }],
            columns: [
                {text: 'NCPDP', dataIndex: 'NCPDPID', flex: 1, hidden: true},
                {text: 'Pharmacy Name', dataIndex: 'NAME', flex: 3},
                {text: 'Address', dataIndex: 'address1', flex: 3},
                {text: 'City', dataIndex: 'city', flex: 3},
                {text: 'State', dataIndex: 'state', flex: 1, align: "center"},
                {text: 'Zip', dataIndex: 'zip', flex: 1, align: "center"}
            ],
            bind: {
                store: '{pharmacygridstore}'
            },
            listeners: {
                itemclick: 'onGridClick'
            }
        }]
    },
    {
        xtype: 'panel',
        cls: 'card-panel',
        title: 'Information',
        region: 'east',
        collapsible: true,
        autoScroll:true,
        defaults: {
            labelWidth: 115,
            autoWidth: true,
            anchor: '100%'
        },
        items: [{
            xtype: 'form',
            cls: 'formPanel',
            reference: 'pharmacydetails',
            items: [{
                xtype: 'fieldset',
                title: 'Location',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    xtype: 'displayfield'
                },
                items: [{
                    fieldLabel: 'Pharmacy Name:',
                    name: 'name'
                },
                {
                    fieldLabel: 'Service Type:',
                    name: '@PharmacyType'
                },
                {
                    fieldLabel: 'Address:',
                    name: 'locAddress1'
                },
                {
                    fieldLabel: 'Phone:',
                    name: 'locPhone'
                },
                {
                    fieldLabel: 'Fax:',
                    name: 'locFax'
                },
                {
                    xtype: 'button',
                    text: 'Get Directions',
                    margin: '10px 0 0 0',
                    bind: {
                        href:'{pharmacyDetailRecord}'
                    }
                }]
            },
            {
                xtype: 'fieldset',
                title: 'Services',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    xtype: 'displayfield',
                    labelWidth: 245
                },
                items: [{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Handicap Access:',
                    name: 'locHandicapAccessFlag',
                    reference: 'locHandicapAccessFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Drive-up Window:',
                    name: 'locDriveUpFlag',
                    reference: 'locDriveUpFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Sells Durable Medical Equipment:',
                    name: 'locDMEflag',
                    reference: 'locDMEflag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Accepts E-Prescriptions:',
                    name: 'locAcceptsErxFlag',
                    reference: 'locAcceptsErxFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Prescription Compounding Services:',
                    name: 'locCompoundServFlag',
                    reference: 'locCompoundServFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Prescription Delivery Services:',
                    name: 'locDeliveryServiceFlag',
                    reference: 'locDeliveryServiceFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Open 24 Hours:',
                    name: 'loc24HourFlag',
                    reference: 'loc24HourFlag',
                    checked: false,
                    disabled: true,
                    uncheckedValue: '0'
                }]
            },
            {
                xtype: 'fieldset',
                title: 'Store Hours',
                layout: {
                    type: 'vbox'
                },
                defaults: {
                    xtype: 'displayfield'
                },
                items: [{
                    name: '@fnlocHours'
                }]
            }]
        }]
    }]
});