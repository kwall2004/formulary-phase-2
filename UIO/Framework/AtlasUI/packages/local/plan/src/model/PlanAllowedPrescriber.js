/**
 * Created by S4505 on 11/7/2016.
 */


Ext.define('Atlas.plan.model.PlanAllowedPrescriber', {
    extend: 'Atlas.common.model.Base',
    //idProperty: 'systemId',
    fields: [
        {name: 'NPI', type: 'number'},
        {name: 'Prescribername', type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/planallowedprescriber'
    }
});
