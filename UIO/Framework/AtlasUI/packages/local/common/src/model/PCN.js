/**
 * Created by T4317 on 11/8/2016.
 */
Ext.define('Atlas.common.model.PCN', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pApplyPCNCondition:'YES',
            pBatchSize:0,
            pWhere:''
        },
        url: 'claims/{0}/pcnmasterext'
    }
});

