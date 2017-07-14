Ext.define('Atlas.pharmacy.view.Outreach', {
    extend: 'Ext.panel.Panel',
    xtype: 'pharmacy-outreach',
    title: 'Pharmacy OutReach',
    padding: '0 10 0 10',    // top right bottom left
    viewModel: 'outreach',
    controller: 'outreach',
    scrollable: true,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
            xtype: 'pharmacyoutreachsearch'
        },{
            xtype: 'pharmacyoutreachgrid'
        }
    ]
});