
/**
 * Created by s6685 on 11/30/2016.
 */
Ext.define('Atlas.admin.model.EDITransactionsModel', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'NCPDPID',type: 'string' },
        { name: 'ProviderID',type: 'string' },
        { name: 'RecipientId',type: 'number' },
        { name: 'RowIndex',type: 'string' },
        { name: 'TranDate',type: 'date',dateFormat:'Y-m-d'},
        { name: 'TranCode',type: 'string' },
        { name: 'Port',type: 'string' },
        { name: 'TmOut',type: 'string' ,convert: function (val) {
            var date = Ext.Date.parse(val, "c");
            return date;

        }},
        { name: 'SystemID',type: 'number' },
        { name: 'PharmacyName',type: 'string' },
        { name: 'TransactionID',type: 'number' },
        { name: 'TransactionTime',type: 'number' },
        { name: 'MemberID',type: 'string' },
        { name: 'ServiceDate',type: 'date',dateFormat:'Y-m-d'},
        { name: 'TransCnt',type: 'number' },
        { name: 'Stat',type: 'string' },
        { name: 'NCPDPVersion',type: 'string' },
        { name: 'SOURCE',type: 'string' },
        { name: 'ProcessorCntr',type: 'string' },
        { name: 'TmIn',type: 'string',convert: function (val) {
            var date = Ext.Date.parse(val, "c");
            return date;

} },
        { name: 'MemberName',type: 'string' },
        { name: 'Socket',type: 'string' }
    ],

 proxy: {
     extraParams: {
         pFilterConditions:'',
         pStartIndex:'1',
         pMode:'F',
         pBatchSize:'500',
         pagination: true
     },
        url: 'claims/rx/editransactions'

    }
});
