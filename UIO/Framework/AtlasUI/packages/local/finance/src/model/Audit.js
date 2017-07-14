Ext.define('Atlas.finance.model.Audit', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'selectedItems', type: 'string' },
        { name: 'auditId', type: 'string' },
        { name: 'auditType', type: 'string' },
        { name: 'auditCompleteDate', type: 'string' },
        { name: 'scriptId', type: 'string' },
        { name: 'transactionId', type: 'string' },
        { name: 'rxID', type: 'string' },
        { name: 'rxNum', type: 'string' },
        { name: 'ncpdpid', type: 'string' },
        { name: 'pharmacyName', type: 'string' },
        { name: 'serviceDate', type: 'string' },
        { name: 'qty', type: 'string' },
        { name: 'takebackTypeDescr', type: 'string' },
        { name: 'takebackQty', type: 'string' },
        { name: 'adjustTransId', type: 'string' },
        { name: 'processDate', type: 'string', convert: function(val){
            if (val){
                return Ext.Date.utcToLocal(new Date(val));
            }
        }},
        { name: 'newTotalAmt', type: 'string', convert: function(value){
            return Ext.util.Format.currency(value);
        }},
        { name: 'daysSupply', type: 'string' },
        { name: 'medication', type: 'string' },
        { name: 'gcnseqno', type: 'string' },
        { name: 'GPICode', type: 'string' },
        { name: 'systemID', type: 'string' },
        { name: 'lastModified', type: 'string' },
        { name: 'reason', type: 'string' },
        { name: 'totalAmt', type: 'string', convert: function(value){
            return Ext.util.Format.currency(value);
        }}
    ],

    proxy: {
        url: 'finance/{0}/pharmacyauditclaimsext',
        extraParams: {
            pagination:true
        }
    }
});