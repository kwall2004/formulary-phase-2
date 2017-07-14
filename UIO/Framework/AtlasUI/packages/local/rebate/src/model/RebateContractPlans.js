/**
 * Created by j2487 on 11/18/2016.
 */
Ext.define('Atlas.rebate.model.RebateContractPlans', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'contractID', type: 'string' },
        { name: 'planGroupID', type: 'string' },
        { name: 'effDate', type: 'string' },
        { name: 'termDate', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'lastModified', type: 'string' }],
    proxy: {
        url: 'finance/{0}/rebatecontractplans'
    }
})