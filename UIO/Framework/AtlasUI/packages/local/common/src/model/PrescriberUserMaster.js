/**
 * Created by T4317 on 10/5/2016.
 */
Ext.define('Atlas.common.model.PrescriberUserMaster',{
    extend: 'Atlas.common.model.Base',

    proxy: {
        updateUrl: 'prescriber/rx/prescriberusermaster',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});