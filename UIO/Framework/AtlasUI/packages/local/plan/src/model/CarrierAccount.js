/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.CarrierAccount',{
    extend: 'Atlas.common.model.Base',
    //idProperty: 'SystemID',
    fields: [
        {name: 'carrierId',  type: 'number'},
        {name: 'carrierAcctNumber',  type: 'string'},
        {name: 'accountName',  type: 'string'},
        {name: 'SystemID',  type: 'number'},
        {name: 'lastModified',  type: 'date'},
        {name: 'dbRowID',  type: 'string'},
        {name: 'rowNum',  type: 'number'}
    ],
    proxy: {
        url: 'plan/{0}/carrieraccountext',
        extraParams:{
            pBatchSize: 100//,
           // pWhere: '1=1'
        }
    }
});