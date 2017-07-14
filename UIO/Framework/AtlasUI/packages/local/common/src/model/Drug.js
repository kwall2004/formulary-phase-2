/*
 Developer: Tremaine Grant
 Description: model for drug
 Origin: Merlin
 8/16/16

 */
Ext.define('Atlas.common.model.Drug', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'LN',type: 'string'},
        {name: 'LBLRID',type: 'string'},
        {name: 'NDC',type: 'string'},
        {name: 'GCN_SEQNO',type: 'string'},
        {name: 'BN',type: 'string'},
        {name: 'GNN60',type: 'string'},
        {name: 'HICL_SEQNO',type: 'string'},
        {name: 'ProtectedClassDrug',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pPlanID:'HPM',
            iplExcludeObsDrug: false,
            pFilter : '',
            pagination : true
        },
        url: 'claims/{0}/medicationmasterext'
    }
});