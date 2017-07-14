/**
 * Created by j2487 on 11/21/2016.
 */
Ext.define('Atlas.rebate.model.CompetitorProduct', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'ContractNDC', type: 'string' },
        { name: 'CompetitorGCN', type: 'string' },
        { name: 'CompetitorProductName', type: 'string' },
        { name: 'DetailID', type: 'string' },
        { name: 'systemID', type: 'string' }
    ],
    proxy: {
        url: 'finance/{0}/rebatecontractcompetitor'
    }
})