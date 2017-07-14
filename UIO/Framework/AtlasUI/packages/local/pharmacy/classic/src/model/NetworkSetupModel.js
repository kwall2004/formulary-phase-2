/**
 * Created by n6684 on 11/7/2016.
 */
Ext.define('Atlas.pharmacy.model.NetworkSetupModel', {
    extend: 'Atlas.common.model.Base',
    fields: [{
        name: 'NetworkID',
        type: 'int'
    }, {
        name: 'NetworkName',
        type: 'string'
    }, {
        name: 'NetworkDescription',
        type: 'string'
    }],

    proxy: {
        extraParams: {
            pagination: true
        },

        url: 'pharmacy/{0}/NetworkMaster',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function (payload) {

                payload.data.forEach(function (item, index) {
                    item.NetworkName = item.NetworkDescription;
                });
                return payload.data;
            }
        }
    }

});

