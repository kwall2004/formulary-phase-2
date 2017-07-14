/**
 * Created by T4317 on 10/25/2016.
 */
Ext.define('Atlas.common.model.ClaimDurAlerts', {
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [
        { name:'recipientID'},
        { name:'respStatus'},
        { name:'ncpdpID'}
    ],
    proxy: {
        url: 'claims/rx/claimduralert'
    }
});