Ext.define('Atlas.pharmacy.model.PharmacyDetails',{
    extend: 'Atlas.common.model.Base',

    fields: [

    ],

    proxy: {
        //TODO Find service
        url: 'pharmacy/{0}/'
    }
});