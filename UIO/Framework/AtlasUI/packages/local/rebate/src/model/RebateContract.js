/**
 * Created by j2487 on 11/14/2016.
 */
Ext.define('Atlas.rebate.model.RebateContract', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'contractID', type: 'string' },
        { name: 'manufacturerID', type: 'string' },
        { name: 'payCycle', type: 'string' },
        { name: 'effDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'termDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'issueDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'contractStatus', type: 'string' },
        { name: 'notes', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'issueBy', type: 'string' }
    ],
    proxy: {
        url: 'finance/{0}/rebatecontractmasterext',
        extraParams:{
            pBatchSize:0
        }
    }
});
