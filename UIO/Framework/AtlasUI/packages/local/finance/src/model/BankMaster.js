Ext.define('Atlas.finance.model.BankMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'bank',
            type:'string',
            convert: function(v, rec) {
                return rec.get('bankCode') + ' - ' + rec.get('bankName');
            }
        },
        {name: 'bankCode', type:'string'},
        {name: 'bankName', type:'string'},
        {name: 'sungardMemoChecks', type:'boolean'},
        {name: 'systemID', type:'number'},
        {name: 'accountNum', type:'string'},
        {name: 'companyName', type:'string'},
        {name: 'RowNum', type:'int'},
        {name: 'AcctDescription', type:'string'},
        {name: 'lastEFTnum', type:'number'},
        {name: 'companyId', type:'string'},
        {name: 'originId', type:'string'},
        {name: 'lastCheckNum', type:'number'},
        {name: 'lastModified', type:'date'},
        {name: 'originDFI', type:'string'},
        {name: 'originName', type:'string'}
    ],

    proxy: {
        url: 'finance/{0}/bankacctmaster'
    }
});