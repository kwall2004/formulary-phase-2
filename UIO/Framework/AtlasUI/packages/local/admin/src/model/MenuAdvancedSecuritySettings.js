/**
 * Created by n6684 on 12/9/2016.
 */
Ext.define('Atlas.admin.model.MenuAdvancedSecuritySettings', {
    extend: 'Atlas.common.model.Base',


    proxy: {
        url: 'system/{0}/idxmenugroupdata',
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
