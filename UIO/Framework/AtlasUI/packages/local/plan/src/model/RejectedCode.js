/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.RejectedCode',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'pcnCode',

    fields: [
        {name: 'id',  type: 'string'},
        {name: 'value',  type: 'string'}

    ],

    proxy: {
        url: 'claims/{0}/ncpdperrcodes'
    }
});