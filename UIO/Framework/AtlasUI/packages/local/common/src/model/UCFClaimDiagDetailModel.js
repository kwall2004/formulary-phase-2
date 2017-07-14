/**
 * Created by d4662 on 1/4/2017.
 */
Ext.define('Atlas.common.model.UCFClaimDiagDetailModel', {
    extend: 'Atlas.common.model.Base',
    /*fields: [
        {name: 'SystemID', type: 'string'},
        {name: 'serviceRsnCode', type: 'string'},
        {name: 'profServCode', type: 'string'},
        {name: 'resultOfServiceCode', type: 'string'}

    ],*/
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'claims/rx/ucfclaimdiagdetail'
    }
})
