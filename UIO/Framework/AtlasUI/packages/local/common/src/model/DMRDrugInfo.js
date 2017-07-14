/**
 * Created by T4317 on 11/9/2016.
 */
Ext.define('Atlas.common.model.DMRDrugInfo', {
    extend: 'Atlas.common.model.Base',
    /*fields: [
        {{name: 'value',type: 'string'},
        {{name: 'name',type: 'string'}
    ],*/
    fields:[
        {name:'FormularyId',type: 'string'},
        {name:'FormularyVersion',type: 'string'},
        {name:'PAInd',type: 'string'},
        {name:'PAMinAge',type: 'string'},
        {name:'PAMaxAge',type: 'string'},
        {name:'StepTherapyInd',type: 'string'},
        {name:'StepTherapyName',type: 'string'},
        {name:'PartDExcludedDrug',type: 'string'},
        {name:'MedicaidCarveOutDrug',type: 'string'},
        {name:'MedicaidFeeScreen',type: 'string'},
        {name:'NonMatched',type: 'string'},
        {name:'QtyLimit',type: 'string'},
        {name:'QtyLmtTimePeriod',type: 'string'},
        {name:'DrugType',type: 'string'},
        {name:'TierCode',type: 'string'},
        {name:'LN',type: 'string'},
        {name:'BN',type: 'string'},
        {name:'GCN_SEQNO',type: 'string'},
        {name:'ETC_ID',type: 'string'},
        {name:'ETC_NAME',type: 'string'},
        {name:'Covered',type: 'string'},
        {name:'dbRowID',type: 'string'},
        {name:'rowNum',type: 'number'}
        ],
    proxy: {
        url: 'member/{0}/dmrdruginfo'
    }
});

