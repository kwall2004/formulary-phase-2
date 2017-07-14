/**
 * Created by rsalekin on 11/24/2016.
 */

Ext.define('Atlas.pharmacy.model.PharmacyIncludeExclude', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyincludeexclude'
    }
});