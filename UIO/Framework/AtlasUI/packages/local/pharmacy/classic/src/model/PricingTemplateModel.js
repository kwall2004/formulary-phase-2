/**
 * Created by n6684 on 11/23/2016.
 */

Ext.define('Atlas.pharmacy.model.PricingTemplateServiceTypes', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            remoteSort:true,
            remoteFilter: true,
            pagination: true
        },

        url: 'pharmacy/{0}/PricingTemplateServiceTypes',
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
