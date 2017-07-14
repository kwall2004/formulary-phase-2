/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.CarrierLOB', {
    extend: 'Atlas.common.model.Base',
    //idProperty: 'SystemID',

    fields: [
        {name: 'carrierId', type: 'number'},
        {name: 'SystemID', type: 'number'},
        {name: 'lobName', type: 'string'},
        {name: 'carrierLOBId', type: 'number'},
        {name: 'lastModified', type: 'date'},
        {name: 'dbRowID', type: 'string'},
        {name: 'rowNum', type: 'number'}
    ],
    proxy: {
        url: 'plan/{0}/carrierlobsext',
        extraParams:{
            pBatchSize: 100//,
           // pWhere: '1=1'
        }, reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                var uniquearray =[];
                payload.data.forEach(function(item, index){
                    var exists = false;

                    uniquearray.forEach(function(uniqueitem,uniqueindex){
                        if(uniqueitem.carrierLOBId==item.carrierLOBId)
                        {
                            exists = true;
                        }
                    });

                    if(!exists)
                    {
                        uniquearray.push(item);
                    }
                });

                return uniquearray;
            }
        }
    }
});