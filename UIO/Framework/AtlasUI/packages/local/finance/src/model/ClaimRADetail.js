Ext.define('Atlas.finance.model.ClaimRADetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'Account', type: 'string'},
        {name: 'systemid', type: 'number'},
        {name: 'checkNum', type: 'number'},
        {name: 'serviceDate', type: 'string'},
        {
            name: 'checkAmt',
            type: 'number',
            convert: function (val, rec) {
                return rec.get('totalAmtPaid');
            }
        },
        {name: 'totalAmtPaid',type: 'number'},
        {name: 'relationshipid', type: 'string'},
        {name: 'checkName', type: 'string'},
        {
            name: 'voidFlag',
            type: 'boolean',
            convert: function (val, rec) {
                return val == true? 'VOID' : '';
            }
        },
        {name: 'transactionID', type: 'number'},
        {name: 'vendorCode', type: 'string'},
        {name: 'eftTraceId', type: 'string'},
        {name: 'remitDate', type: 'date'},
        {name: 'rowNum', type: 'int'},
        {name: 'ledgerSeq', type: 'number'},
        {name: 'Carrier', type: 'string'},
        {name: 'fillNumber', type: 'number'},
        {name: 'rxNum', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'medication', type: 'string'},
        {name: 'transactionDate', type: 'string'},
        {name: 'ndc', type: 'string'},
        {name: 'checkDate', type: 'date'},
        {name: 'invoiceNum', type: 'number'},
        {name: 'dispQuantity', type: 'number'},
        {name: 'holdFlag', type: 'boolean'},
        {name: 'remitBatch', type: 'number'},
        {name: 'paycenterid', type: 'string'},
        {name: 'ncpdpid', type: 'string'},
        {name: 'DBrowID', type: 'string'}
    ],

    proxy: {
        url: 'claims/{0}/claimradetail',
        extraParams: {
            pWhere: '',
            pSort: '',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: '',
            pagination: true
        }
    }
});