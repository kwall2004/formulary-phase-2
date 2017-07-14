Ext.define('Atlas.home.xclassview.TaskSchedulerAlert', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.feature.Grouping'
    ],

    controller: 'xclasstaskscheduleralert',
    viewModel: {
        stores: {
            taskscheduleralert: {
                model: 'Atlas.home.model.TaskSchedulerAlert',
                groupField: 'GroupText'
            }
        }
    },

    tbar: [
        '->',
        {text: 'View All Tasks', iconCls: 'x-fa fa-calendar-check-o', handler: 'onViewTasksClick'}
    ],

    bind: '{taskscheduleralert}',
    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store){
            if (new Date(record.data.dueDateBegin) < Atlas.common.utility.Utilities.getLocalDateTime() && (record.data.completeDate == null || record.data.completeDate == undefined || record.data.completeDate == '')) {
                return 'm-red-color';
            }
            else if (Math.ceil(Math.abs(Atlas.common.utility.Utilities.getLocalDateTime().getTime() - new Date(record.data.dueDateBegin).getTime()) / (1000 * 3600 * 24)) < 8) {
                return 'm-blue-color';
            }
            else if (record.data.completeDate != null && record.data.completeDate != undefined && record.data.completeDate != '') {
                if (new Date(record.data.completeDate) > new Date(record.data.dueDateEnd)) {
                    return 'm-red-color';
                }
            }
            else {
                return '';
            }
        }
    },
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'GroupText',
            dataIndex: 'GroupText',
            hidden: true
        },
        {
        xtype: 'gridcolumn',
        text: 'Status',
        dataIndex: 'taskStatus'
    }, {
        xtype: 'gridcolumn',
        text: 'Contract ID',
        dataIndex: 'cmsContractId'
    }, {
        xtype: 'gridcolumn',
        text: 'Plan Group',
        dataIndex: 'planGroupName'
    }, {
        xtype: 'gridcolumn',
        text: 'Task',
        dataIndex: 'taskDescription'
    }, {
        xtype: 'datecolumn',
        text: 'Submission From',
        dataIndex: 'dueDateBegin',
        format: 'm/d/Y h:m:s A',
            renderer:'localizeDateTime',
        width: 145
    }, {
        xtype: 'datecolumn',
        text: 'Submission To',
        dataIndex: 'dueDateEnd',
        format: 'm/d/Y h:m:s A',
            renderer:'localizeDateTime',
        width: 145
    }, {
        xtype: 'datecolumn',
        text: 'Completed Date',
        dataIndex: 'completeDate',
            renderer:'localizeDateTime',
        format: 'm/d/Y'
    }],
    listeners: {
        itemdblclick: 'onItemDblClick'
    },

    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '<span style="font-weight:bold">{name}</span>'
    }]
});