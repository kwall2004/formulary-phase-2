/**
 * Created by s6685 on 12/2/2016.
 */
Ext.define('Atlas.admin.model.EDITransactionModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name:'TransDate',type: 'string',convert: function (val) {
                if(val) {
                    var dateparts = val.split('/');
                    var getyear = new Date(val).getFullYear();
                    return dateparts[0] + '/' + dateparts[1] + '/' + getyear;
                }
            }},
        {
            name:'ServiceDate',type: 'string',convert: function (val) {
            if(val) {
                var dateparts = val.split('/');
                var getyear = new Date(val).getFullYear();
                return dateparts[0] + '/' + dateparts[1] + '/' + getyear;
            }
        }}],
    proxy: {
        extraParams: {
            pTransactionID:'',
            pFieldList:''
        },
        url: 'claims/rx/editransaction'

    }
});
