Ext.define('Atlas.pharmacy.model.Pharmacy', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'pharmacy/{0}/pharmacyextendedsearch'
    }
});
