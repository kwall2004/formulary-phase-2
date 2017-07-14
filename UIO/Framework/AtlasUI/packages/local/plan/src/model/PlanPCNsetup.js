/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.model.PlanPCNsetup', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'pcnCode', type: 'string'},
        {name: 'carrierId', type: 'number'},
        {name: 'carrierName', type: 'string'},
        {name: 'carrierLOBId', type: 'number'},
        {name: 'carrierLOBName', type: 'string'},
        {name: 'pcnDesc', type: 'string'},
        // {name: 'systemID', type: 'number'},
        {name: 'lastModified', type: 'date'},
        {name: 'BIN', type: 'string'},
        {name: 'carrierAcctNumber', type: 'string'},
        {name: 'carrierAcctName', type: 'string'},
        {name: 'multiAccount', type: 'boolean'},
        {name: 'dmrCustCode', type: 'string'},
        {name: 'dmrLobName', type: 'string'}
    ],
    proxy: {
        url: 'claims/{0}/pcnmasterext'
    }
});