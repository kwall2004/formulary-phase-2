/**
 * Created by d4662 on 1/10/2017.
 */
Ext.define('Atlas.common.model.UFCPatRespQual', {
    extend: 'Atlas.common.model.Base',
    fields:[

        {name:'otherPayerPatRespQual',type:'string'},
        {name:'otherPayerPatRespAmt',type:'number'},
        {name:'systemId',type:'number'},
        {name:'transactionID',type:'number'}
    ]
});


