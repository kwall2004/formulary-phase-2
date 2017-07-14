/**
 * Created by s6627 on 2/1/2017.
 */
Ext.define('Atlas.formulary.model.MedicationModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'LN',type: 'string'},
        {name: 'LBLRID',type: 'string'},
        {name: 'NDC',type: 'string'},
        {name: 'GCN_SEQNO',type: 'string'},
        {name: 'BN',type: 'string'},
        {name: 'GNN60',type: 'string'},
        {name: 'HICL_SEQNO',type: 'string'},
        {name: 'ProtectedClassDrug',type: 'string'},
        {name: 'UltChildETC',type: 'string'},
        {name: 'UltParentETC',type: 'string'},
        {name: 'NDCAndLabel',calculate:function(record)
        {
            return record.NDC+" "+ record.LN;
        }}
    ],
    proxy: {
        extraParams: {
            pPlanID:'HPM',
            iplExcludeObsDrug: true,
            pFilter : 'by NDC',
            pagination : true
        },
        url: 'claims/{0}/medicationmasterext'
    }
});