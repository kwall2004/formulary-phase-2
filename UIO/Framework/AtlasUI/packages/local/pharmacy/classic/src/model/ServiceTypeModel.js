/**
 * Created by n6684 on 11/10/2016.
 */
Ext.define('Atlas.pharmacy.model.ServiceTypeModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'pharmacy/{0}/pharmacyservicetypes',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function(item, index){
                    item.TypeCode =[];
                });

                payload.metadata.ttPharmacyServiceType.ttPharmacyServiceType.forEach(function(itemmetadata, itemindex){
                    payload.data.forEach(function(item, index){
                              if(parseInt(item.NCPDPID) == parseInt(itemmetadata.NCPDPId)) {
                                  item.TypeCode.push(itemmetadata.pharmacyType);
                                }
                    });
                });


                return payload.data;
            }
        }
    }

});


Ext.define('Atlas.pharmacy.model.SetServiceTypeModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyservicetypes'

    }

});
