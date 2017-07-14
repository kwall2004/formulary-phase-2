/**
 * Created by n6684 on 11/21/2016.
 */

Ext.define('Atlas.pharmacy.model.PopupAddRelationShipModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {

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



Ext.define('Atlas.pharmacy.model.relationshipmasterdataModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/relationshipmasterdata',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function (value,index) {
                    value.PCpayCenterName = value.PCpayCenterId + ' ' + value.PCpayCenterName;
                });
                return payload.data;
            }
        }
    }

});




Ext.define('Atlas.pharmacy.model.setpharmacyrelationship', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyrelationship'
    }

});