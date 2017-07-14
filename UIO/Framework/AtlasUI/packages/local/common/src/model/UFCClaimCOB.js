/**
 * Created by d4662 on 1/9/2017.
 */
Ext.define('Atlas.common.model.UFCClaimCOB', {
    extend: 'Atlas.common.model.Base',
    fields:[
        {name:'coverageType',type:'string'},
        {name:'payerID',type:'string'},
        {name:'payerIDQual',type:'string'},
        {name:'payerDate',type:'string'},
        {name:'paidAmt',type:'number'},
        {name:'paidAmtQual',type:'string'},
        {name:'rejCode',type:'string'},
        {name:'otherPayerPatRespQual',type:'string'},
        {name:'otherPayerPatRespAmt',type:'string'}
    ],
    proxy:{
        url:'claims/rx/ucfclaimcob'
    }
});

