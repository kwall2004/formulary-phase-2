/**
 * Created by d3973 on 11/23/2016.
 */
Ext.define('Atlas.plan.model.LetterDisclaimers', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'DisclaimerName',
        type: 'string'
    }, {
        name: 'DisclaimerText',
        type: 'string'
    }, {
        name: 'PlanGroupID',
        type: 'number'
    }, {
        name: 'ConversionNeeded',
        type: 'boolean'
    }, {
        name: 'LetterFrom',
        type: 'string'
    }, {
        name: 'SystemID',
        type: 'number'
    }, {
        name: 'RowNum',
        type: 'number'
    }],

    proxy: {
        url: 'plan/{0}/planletterdisclaimers'
    }
});