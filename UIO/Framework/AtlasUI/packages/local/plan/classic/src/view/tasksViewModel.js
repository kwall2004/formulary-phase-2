/**
 * Created by d3973 on 11/1/2016.
 */
Ext.define('Atlas.plan.view.tasksViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plantasksviewmodel',

    stores: {
        pbmTaskConfig:{
            model: 'Atlas.plan.model.PbmTaskConfiguration',
            //autoLoad: true,
            storeId: 'pbmTaskConfiguration',
            data: [{
                TaskName: 'All',
                TaskConfigId: 0
            }]
        },

        pbmTaskSeries: {
            model: 'Atlas.plan.model.pbmTaskSeries',
            storeId: 'pbmTaskSeries'
        },

        pbmTaskList: {
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'pbmTaskList'
        },

        pbmTaskStatus: {
            model: 'Atlas.common.model.shared.ListModel',
            storeId: 'pbmTaskStat',
            data: [{
                name: 'All',
                value: ''
            }]
        },

        pbmTaskScheduler: {
            model: 'Atlas.plan.model.PbmTaskScheduler',
            storeId: 'pbmTaskSched'
        }
    }
});