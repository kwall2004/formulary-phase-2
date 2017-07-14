Ext.define('Atlas.pharmacy.model.PharmCredQueues', {
    extend: 'Atlas.common.model.Base',
    proxy: {

        url: 'pharmacy/{0}/pharmcredqueues',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
    /*
     //Add metaData directly to Store for convenient access
     if (reader) {
     me.setExtraData(reader.metaData)
     }
     */

});
