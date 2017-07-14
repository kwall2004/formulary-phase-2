/**
 * Created by n6684 on 11/17/2016.
 */
Ext.define('Atlas.pharmacy.model.PopupChooseNetworksModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        'ContractId', 'NetworkID', 'systemID', 'actionField'
    ],

    proxy: {
        // extraParams: {
        //     pageSize: 10,
        //     remoteSort:true,
        //     remoteFilter: true,
        //     pagination: true
        // },

        url: 'pharmacy/{0}/pharmacynetworks',
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