/**
 * Created by T4317 on 10/27/2016.
 */
Ext.define('Atlas.common.model.shared.ClaimStatus', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:'ClaimTransactionStatus'
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'shared/{0}/listitems'
    }
});