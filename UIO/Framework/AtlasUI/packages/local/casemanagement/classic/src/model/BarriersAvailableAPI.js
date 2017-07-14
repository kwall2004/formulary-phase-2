/**
 * Created by mkorivi on 11/21/2016.
 */

Ext.define('Atlas.casemanagement.model.BarriersAvailableAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value', type: 'string'}
        //{name: 'pBarriersSelectedList1', type: 'string'}

    ],
    proxy: {
        url: 'vendor/hp/barriersavailableapi',
        extraParams: {
            "pSort" : "",
            "pMode" :"mrx"
        }
    }
});

