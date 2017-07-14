/**
 * Created by m4542 on 9/27/2016.
 */
Ext.define('Atlas.portals.rxmember.model.PharmacySearchResults', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'pharmacy/{0}/pharmacyextendedsearch',
        extraParams: {
            pagination: true
        }
    }
});