/**
 * Created by mkorivi on 11/15/2016.
 */

Ext.define('Atlas.casemanagement.model.MCSRecipientIdAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'pMCSRecipientId', type: 'string'}



    ],
    proxy: {
        url: 'vendor/hp/mcsrecipientidapi'

    },
    reader: {
        type: 'json',
        rootProperty: function (payload) {
            return payload.metadata.pMCSRecipientId;
        }
    }

})
