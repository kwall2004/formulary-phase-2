Ext.define('Atlas.portals.view.provider.ProviderHEDISSelfReportingPrintWindow', {
    extend: 'Ext.window.Window',
    xtype: 'providerHEDISSelfReportingPrintWindow',
    title: 'Print HEDIS',

    controller: 'providerHEDISSelfReportingPrintWindow',

    viewModel: {
        stores: {
            providerGroups: {
                type: 'provider-provgrouplistgraph'
            },
            providerLobs: {
                type: 'provider-providerloblist',
                autoLoad: false,
                includeAll: false,
                asynchronousLoad: false
            }
        }
    },

    selfReportingViewModel: null,
    modal: true,
    reference: 'printHedisDialog',
    bbar: [
        {xtype: 'button', text: 'OK', listeners: {click: 'onHedisPrintOK'}},
        {xtype: 'button', text: 'Cancel', listeners: {click: 'onHedisPrintCancel'}}
    ],
    padding: 10,
    layout: 'vbox',

    items: [
        {
            reference: 'providerCombo',
            xtype: 'combobox',
            fieldLabel: 'Provider',
            displayField: 'name',
            valueField: 'value',
            forceSelection: true,
            queryMode: 'local',
            lastquery: '',
            flex: 1,
            listeners: {
                change: 'onProviderChange'
            },
            bind: {
                store: '{providerGroups}'
            }
        },
        {
            xtype: 'combobox',
            fieldLabel: 'LOB',
            reference: 'lobCombo',
            name: 'lob',
            bind: {
                store: '{providerLobs}'
            },
            value: 'ALL',
            displayField: 'name',
            valueField: 'value',
            forceSelection: true,
            queryMode: 'local',
            lastquery: '',
            flex: 1
        }
    ]

});