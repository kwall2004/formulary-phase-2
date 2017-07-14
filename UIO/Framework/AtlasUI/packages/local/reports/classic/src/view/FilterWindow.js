Ext.define('Atlas.reports.view.FilterWindow', {
    extend: 'Ext.window.Window',
    title: 'Run Report Test: ', //+rec.data.reportName+'('+rec.data.reportID+')',
    //height: 400,
    width: 650,
    maxHeight: 800,
    autoHeight: true,
    modal: true,
    border: false,
    layout: 'fit',
    //items      : 'Atlas.reports.view.FilterWindowItems',
    //id: 'reportFilterID',
    controller: 'reportfiltercontroller',
    viewModel: 'reportfilterviewmodel',
    data: {
        //filterParm: record
    },
    items: [{
        xtype: 'reports-filterwindowitems'
    }],
    bbar: ['->', {
        text: 'Get Report',
        xtype: 'button',
        //handler: 'onClickRunReport',
        listeners: {
            click: 'onClickRunReport'
        }
    }, {
        text: 'Cancel',
        xtype: 'button',
        listeners: {
            click: function () {
                var win = this.up('window');
                win.close();
            }
        }
    }]
});