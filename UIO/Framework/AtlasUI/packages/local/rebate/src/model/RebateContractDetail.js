/**
 * Created by j2487 on 11/15/2016.
 */
Ext.define('Atlas.rebate.model.RebateContractDetail', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'detailID', type: 'string' },
        { name: 'parentSystemID', type: 'string' },
        { name: 'carrierLOBID', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'lastModified', type: 'string' },
        { name: 'dbRowID', type: 'string' },
        { name: 'rowNum', type: 'string' }
    ],
    proxy: {
        url: 'finance/{0}/rebatecontractdetailext',
        extraParams:{
            pBatchSize:0
        }
    }
});