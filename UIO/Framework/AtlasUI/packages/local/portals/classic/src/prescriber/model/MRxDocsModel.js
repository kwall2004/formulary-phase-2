/**
 * Created by T3852 on 10/5/2016.
 */
Ext.define('Atlas.portals.view.prescriber.model.MRxDocsModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'portal/{0}/mrxdocs',
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