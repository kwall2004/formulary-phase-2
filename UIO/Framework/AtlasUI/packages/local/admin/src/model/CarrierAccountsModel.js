/**
 * Created by agupta on 11/28/2016.
 */


Ext.define('Atlas.admin.model.CarrierAccountsModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.carrieraccountsmodel',

    fields: [ ],
    proxy: {
        extraParams: {

        },
        url: 'plan/{0}/carrieraccounts'

    }

});