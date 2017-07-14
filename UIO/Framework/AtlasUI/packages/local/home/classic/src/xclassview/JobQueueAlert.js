Ext.define('Atlas.home.xclassview.JobQueueAlert', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.feature.Grouping'
    ],

    controller: 'xclassjobqueuealert',
    viewModel: {
        stores:{
            jobqueuealert: {
                model: 'Atlas.home.model.JobQueueAlert',
                groupField: 'jobStatus'
            }
        }
    },

    hideHeaders: true,

    bind: '{jobqueuealert}',
    columns: [{
        xtype: 'actioncolumn',
        iconCls: 'x-fa fa-print',
        width: 60,
        handler: 'onPrintClick'
    },{
        xtype: 'gridcolumn',
        text: 'Description',
        flex: 1,
        dataIndex: 'description',
        summaryType: 'count',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return ((value === 0 || value > 1) ? '<span style="font-weight:bold;">(' + value + ' Jobs)</span>' : '<span style="font-weight:bold;">(1 Job)</span>');
        }
    },{
        xtype: 'datecolumn',
        text: 'Create Time',
        dataIndex: 'endDateTime',
        format: 'm/d/Y H:i:s',
        width: 150
    }],
    listeners: {
        itemdblclick: 'onItemDblClick'
    },

    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        showSummaryRow: true,
        groupHeaderTpl: '<span style="font-weight:bold;{[values.rows[0].data.jobStatus === "Complete" ? "color:green;" : "color:red;"]}">{name}</span>'
    }]
});