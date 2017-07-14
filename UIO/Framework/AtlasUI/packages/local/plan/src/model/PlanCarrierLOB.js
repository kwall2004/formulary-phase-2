/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.PlanCarrierLOB', {
    extend: 'Atlas.common.model.Base',
    //idProperty: 'SystemID',

    fields: [
        {name: 'carrierId', type: 'number'},
        {name: 'lobName', type: 'string'},
        {name: 'carrierLOBId', type: 'number'},
        {name: 'dbRowID', type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/carrierlobs'
    }
});