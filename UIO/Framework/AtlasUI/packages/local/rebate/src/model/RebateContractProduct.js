/**
 * Created by j2487 on 11/16/2016.
 */
Ext.define('Atlas.rebate.model.RebateContractProduct', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'NDC', type: 'string' },
        { name: 'BN', type: 'string' },
        { name: 'CostBasis', type: 'string' },
        { name: 'Percentage', type: 'string' },
        { name: 'RebateType', type: 'string' },
        { name: 'DetailID', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'EffDate', type: 'string' },
        { name: 'TermDate', type: 'string' }
    ],
    proxy: {
        url: 'finance/{0}/rebatecontractproductext'
    }
});