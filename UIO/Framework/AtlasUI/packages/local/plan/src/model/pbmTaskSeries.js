/**
 * Created by d3973 on 11/15/2016.
 */
Ext.define('Atlas.plan.model.pbmTaskSeries', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'happensOnMonth',
        type: 'number'
    }, {
        name: 'reOccursEvery',
        type: 'number'
    }, {
        name: 'startDateTime',
        type: 'date'
    }, {
        name: 'taskFreq',
        type: 'string'
    }, {
        name: 'endDateTime',
        type: 'date'
    }, {
        name: 'happensOnDay',
        type: 'string'
    }, {
        name: 'taskSeriesId',
        type: 'number'
    }],

    proxy: {
        url: 'shared/{0}/pbmtaskscheduler'
    }
});