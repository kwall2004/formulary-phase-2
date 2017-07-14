/**
 * Created by d3973 on 11/7/2016.
 */
Ext.define('Atlas.plan.model.PbmTaskScheduler', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'GroupText',
        type: 'string'
    }, {
        name: 'ApplyToSeries',
        type: 'boolean'
    }, {
        name: 'systemID',
        type: 'number'
    }, {
        name: 'taskSeriesId',
        type: 'number'
    }, {
        name: 'cmsContractId',
        type: 'string'
    }, {
        name: 'planGroupName',
        type: 'string'
    }, {
        name: 'emailList',
        type: 'string'
    },
        {
            // these dates come back from teh database in string format, but are set by date.
            name: 'dueDateBegin',
            type: 'string',convert: function (val) {
            var date = Ext.Date.parse(val, "c");
            if (!date && val)
            {
               return val;
            }

            return date;

        }
        },{
        name: 'taskConfigId',
        type: 'number'
    }, {
        name: 'taskDescription',
        type: 'string'
    }, {
        name: 'active',
        type: 'boolean'
    }, {
            name: 'completeDate',
            type: 'string',
            dateFormat: 'Y-m-d'
        }
    , {
        name: 'dueDateEnd',
            type: 'string',convert: function (val) {
                var date = Ext.Date.parse(val, "c");
                if (!date && val)
                {
                    return val;
                }

                return date;

            }
    }, {
        name: 'runProgram',
        type: 'string'
    }, {
        name: 'planGroupId',
        type: 'number'
    }, {
        name: 'taskId',
        type: 'number'
    }, {
        name: 'taskStatus',
        type: 'string'
    }, {
        name: 'completedBy',
        type: 'string'
    }, {
        name: 'documentId',
        type: 'number'
    }],

    proxy: {
        url: 'shared/{0}/pbmtaskscheduler'
       , extraParams: {
            pDateFrom:'',
            pDateTo: '',
            pTaskID: '',
            pCLTZ: '',
            pTaskStatus: '',
            pagination: true
        }
    }
});