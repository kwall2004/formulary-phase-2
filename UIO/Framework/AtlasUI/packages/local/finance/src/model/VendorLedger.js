Ext.define('Atlas.finance.model.VendorLedger', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'note', type:'string'},
        {name: 'systemID', type:'number'},
        {name: 'PayCenterName', type:'string'},
        {name: 'checkNum', type:'int'},
        {name: 'remitSeqNum', type:'int'},
        {name: 'CreateDateTime', type:'date'},
        {name: 'checkName', type:'string'},
        {
            name: 'voidFlag',
            type: 'boolean',
            convert: function (val, rec) {
                return val == true? 'VOID' : '';
            }
        },
        {name: 'vendorCode', type:'string'},
        {name: 'eftTraceId', type:'string'},
        {name: 'ncpdpId', type:'string'},
        {name: 'dateReceived', type:'date'},
        {name: 'taxID', type:'string'},
        {name: 'pharmacyName', type:'string'},
        {name: 'rowNum', type:'int'},
        {name: 'remitAmt', type:'number'},
        {name: 'payCenterId', type:'string'},
        {name: 'createDate', type:'date'},
        {name: 'refundAmt', type:'number'},
        {name: 'balanceDue', type:'number'},
        {name: 'seqNum', type:'int'},
        {name: 'prevBalance', type:'number'},
        {
            name: 'checkDate',
            type:'date',
            convert: function(val, rec){
                return Atlas.common.utility.Utilities.formatDate(val, 'm/d/Y');
            }
        },
        {name: 'relationshipId', type:'string'},
        {name: 'referenceNum', type:'string'},
        {name: 'remitBatch', type:'int'},
        {name: 'RelationshipName', type:'string'},
        {name: 'DBrowID', type:'string'},
        {name: 'checkAmt', type:'number'},
        {name: 'lastModified', type:'date'},
        {name: 'lobID', type:'string'}
    ],

    proxy: {
        url: 'finance/{0}/vendorledgerdetail',
        extraParams:{
            pWhere: "",
            ipiBatchSize: 0,
            ipiJumpStart: 0,
            ipcDirection:"Fwd", //required
            ipcBckRecPointer: "",
            ipcFwdRecPointer: "",
            pagination: true
        }
    }
});