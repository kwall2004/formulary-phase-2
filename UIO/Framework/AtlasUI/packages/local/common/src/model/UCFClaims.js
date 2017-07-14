/**
 * Created by T4317 on 11/21/2016.
 */
Ext.define('Atlas.common.model.UCFClaims', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'Account'},
        { name: 'Carrier'},
        { name: 'ClaimRefNum'},
        { name: 'LN'},
        { name: 'LOB'},
        { name: 'MemberName'},
        { name: 'NCPDPID'},
        { name: 'NPI'},
        { name: 'PharmacyName'},
        { name: 'PrescriberName'},
        { name: 'ProductID'},
        { name: 'RxNumber'},
        { name: 'ServiceDate',type: 'date', dateFormat: 'Y-m-d'},
        { name: 'recipientID'},
        { name: 'stat'},
        { name: 'status' , calculate: function(obj) {
            var status = '';

            if(obj.stat){
                if(obj.stat === 'P'){
                    status = 'Paid'
                } else if(obj.stat === 'R') {
                    status = 'Rejected'
                } else if(obj.stat === 'A') {
                    status = 'Reversed'
                } else if(obj.stat === 'C') {
                    status = 'Captured'
                } else if(obj.stat === 'D') {
                    status = 'Duplicate Paid'
                } else if(obj.stat === 'F') {
                    status = 'Pa Defered'
                } else if(obj.stat === 'Q') {
                    status = 'Duplicate of Capture'
                } else if(obj.stat === 'S') {
                    status = 'Duplication of Reversed'
                }
            }

            return status;
        }},
        { name: 'transactionID'}
    ],
    proxy: {
        url: 'claims/{0}/ucfclaims'
    }
});