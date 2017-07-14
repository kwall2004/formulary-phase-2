/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.PharmacyType',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'pcnCode',

    fields: [
        {name: 'value',  type: 'string'},
        {name: 'name',  type: 'string'}
    ],

   /* proxy: {
        url: 'shared/{0}/listitems'
    }*/

     proxy: {
     extraParams: {
     pListName: 'DispenserType'
     },
     url: 'shared/{0}/listitems'
     }
});