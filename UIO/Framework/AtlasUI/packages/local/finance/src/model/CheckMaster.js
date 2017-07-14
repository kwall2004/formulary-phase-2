Ext.define('Atlas.finance.model.CheckMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'systemID', type:'number'},
        {name: 'vendorCd', type:'string'},
        {name: 'checkNum', type:'number'},
        {name: 'checkReconDate', type:'date'},
        {name: 'checkName', type:'string'},
        {name: 'vendorAcctType', type:'string'},
        {
            name: 'voidFlag',
            type: 'boolean',
            convert: function (val, rec) {
                return val == true ? 'VOID' : '';
            }
        },
        {name: 'eftTraceId', type:'string'},
        {name: 'rowNum', type:'int'},
        {name: 'checkState', type:'string'},
        {name: 'eftFlag', type:'boolean'},
        {name: 'rpsFlag', type:'boolean'},
        {name: 'checkType', type:'string'},
        {name: 'bankCode', type:'string'},
        {name: 'checkZip', type:'number'},
        {name: 'checkReconAmount', type:'number'},
        {name: 'printFlag', type:'int'},
        {name: 'checkCity', type:'string'},
        {
            name: 'checkCityStateZip',
            type:'string',
            convert: function (val, rec) {
                return rec.get('checkCity') + ', ' + rec.get('checkState') + ' ' + rec.get('checkZip');
            }
        },
        {
            name: 'checkDate',
            type:'date',
            convert: function(v) {
                return Atlas.common.utility.Utilities.formatDate(v, 'm/d/Y');
            }
        },
        {name: 'checkAddress1', type:'string'},
        {name: 'checkAddress2', type:'string'},
        {
            name: 'checkAddress',
            type:'string',
            convert: function (val, rec) {
                return rec.get('checkAddress1') + ' ' + rec.get('checkAddress2');
            }
        },
        {name: 'holdFlag', type:'boolean'},
        {name: 'remitBatch', type:'number'},
        {name: 'DBrowID', type:'string'},
        {name: 'vendorAcctNum', type:'string'},
        {name: 'vendorDFI', type:'string'}
    ],

    proxy: {
        url: 'finance/{0}/checkmasterdetail',
        extraParams: {
            pWhere: '',
            pSort: '',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: ''
        }
    }
});