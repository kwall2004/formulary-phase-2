/**
 * Created by d3973 on 11/16/2016.
 */
Ext.define('Atlas.plan.model.PlanGroupHierarchy', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'carrierId',
        type: 'number'
    }, {
        name: 'carrierName',
        type: 'string'
    }, {
        name: 'carrierAcctNumber',
        type: 'string'
    }, {
        name: 'AccountName',
        type: 'string'
    }, {
        name: 'carrierLOBId',
        type: 'string'
    }, {
        name: 'LOBName',
        type: 'string'
    }, {
        name: 'SystemID',
        type: 'number'
    }, {
        name: 'lastModified',
        type: 'date'
    }],

    proxy: {
        extraParams: {
            pagination: true,
            pBatchSize: 0
        },
        url: 'plan/{0}/plangrouphierarchyext'
    }
});