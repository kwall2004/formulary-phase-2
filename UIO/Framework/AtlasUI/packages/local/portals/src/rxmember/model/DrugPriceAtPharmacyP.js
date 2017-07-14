Ext.define('Atlas.portals.rxmember.model.DrugPriceAtPharmacyP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'NCPDPId',type: 'string'},
        {name: 'PharmacyName',type: 'string'},
        {name: 'Longitude',type: 'string'},
        {name: 'Latitude',type: 'string'},
        {name: 'Address1',type: 'string'},
        {name: 'Address2',type: 'string'},
        {name: 'City',type: 'string'},
        {name: 'State',type: 'string'},
        {name: 'ZipCode',type: 'string'},
        {name: 'County',type: 'string'},
        {name: 'Phone',type: 'string'},
        {name: 'DrugPrice',type: 'string'}
    ],

    proxy: {
        url: 'portal/{0}/drugpriceatpharmacyp'
    }
});