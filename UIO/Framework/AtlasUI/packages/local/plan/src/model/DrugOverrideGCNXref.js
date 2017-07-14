/**
 * Created by d3973 on 11/19/2016.
 */
Ext.define('Atlas.plan.model.DrugOverrideGCNXref', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'systemid',
        type: 'number'
    }, {
        name: 'GCN_SEQNO',
        type: 'number'
    }, {
        name: 'GNN60',
        type: 'string'
    }],

    proxy: {
        url: 'plan/{0}/prescdrugoverridegcnxref'
    }
});