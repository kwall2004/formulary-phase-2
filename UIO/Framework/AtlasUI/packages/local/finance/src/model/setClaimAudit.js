/**
 * Created by d3973 on 12/22/2016.
 */
Ext.define('Atlas.finance.model.setClaimAudit', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'adjustedQty', type: 'number'},
        {name: 'adjustedDaysSupply', type: 'number'},
        {name: 'TakeBackType', type: 'string'},
        {name: 'resolutionNotes', type: 'string'},
        {name: 'Action', type: 'string'},
        {name: 'TransactionId', type: 'number'},
        {name: 'adjustedAmount', type: 'number'}
    ],

    proxy: {
        url: 'claims/{0}/claimsaudit'
    }
});