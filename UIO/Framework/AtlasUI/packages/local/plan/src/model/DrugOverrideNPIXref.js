/**
 * Created by d3973 on 11/19/2016.
 */
Ext.define('Atlas.plan.model.DrugOverrideNPIXref', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'systemId',
        type: 'number'
    }, {
        name: 'specialtyName',
        type: 'string'
    }, {
        name: 'NPI',
        type: 'string'
    }, {
        name: 'prescriberName',
        type: 'string'
    }],

    proxy: {
        url: 'plan/{0}/prescdrugoverridenpixref'
    }
});