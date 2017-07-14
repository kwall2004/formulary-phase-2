/**
 * Created by T4317 on 11/29/2016.
 */
Ext.define('Atlas.common.model.ClaimCompounds', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [
        {name: 'recipientID'},
        {name: 'respStatus'},
        {name: 'ncpdpID'}
    ],
    proxy: {
        url: 'claims/{0}/compoundclaimdetails'
    }
});

