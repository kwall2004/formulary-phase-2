Ext.define('Atlas.home.model.TaskSchedulerAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'GroupText', type:'string'},
        {name: 'systemID', type:'number'},
        {name: 'taskSeriesId', type:'int'},
        {name: 'cmsContractId', type:'string'},
        {name: 'planGroupName', type:'string'},
        {name: 'emailList', type:'string'},
        {name: 'taskConfigId', type:'int'},
        {name: 'taskDescription', type:'string'},
        {name: 'active', type:'boolean'},
        {name: 'documentId', type:'int'},
        {name: 'runProgram', type:'string'},
        {name: 'planGroupId', type:'int'},
        {name: 'taskId', type:'int'},
        {name: 'taskStatus', type:'string'},
        {name: 'completedBy', type:'string'}
    ],

    proxy: {
        url: 'shared/{0}/pbmtaskscheduler',
        extraParams: {
            pDateFrom: '',
            pDateTo: '',
            pTaskID: 0,
            pCLTZ: '',
            pTaskStatus: ''
        },
        timeout: 120000
    }
});