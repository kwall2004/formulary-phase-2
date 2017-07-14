/**
 * Created by d3973 on 11/16/2016.
 */
Ext.define('Atlas.plan.model.FaxHistory', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'FaxNumber',
        type: 'string'
    }, {
        name: 'DocumentID',
        type: 'number'
    }, {
        name: 'faxDate',
        type: 'date'
    }, {
        name: 'inOut',
        type: 'string'
    }, {
        name: 'SubmittedBy',
        type: 'string'
    }, {
        name: 'DESCRIPTION',
        type: 'string'
    }],

    proxy: {
        extraParams: {
            pcKeyType: 'PlanGroupDocSystemId'
        },
        url: 'shared/{0}/faxandattachment'
    }
});