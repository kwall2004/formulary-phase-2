Ext.define('Atlas.portals.prescriber.HedisAlertWindow', {
    extend: 'Ext.Container',
    controller: 'portalsprescriberhedisalertwindow',
    xtype: 'portalsprescriberhedisalertwindow',
    layout: 'border',
    height: 300,
    width: 800,
    scrollable: 'y',
    items: {
        xtype: 'gridpanel',
        region: 'center',
        features: [{
            ftype: 'grouping',
            startCollapsed: true,
            hideGroupedHeader: true
        }],
        columns: [
            { text: 'Measure', dataIndex: 'measureDesc', flex: 2 },
            { text: 'Sub Measure', dataIndex: 'subMeasure', flex: 1, groupable: false },
            { text: 'Due By', dataIndex: 'dueBy', groupable: false },
            { text: 'Help Text', dataIndex: 'helpText', hidden: true, groupable: false }
        ],
        bind: {
            store: '{hedisAlerts}'
        }
    }
});