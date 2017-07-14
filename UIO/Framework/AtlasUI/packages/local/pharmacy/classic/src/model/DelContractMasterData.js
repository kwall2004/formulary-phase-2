/**
 * Created by rsalekin on 11/23/2016.
 */
Ext.define('Atlas.pharmacy.model.DelContractMaster', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pContractID: ''
        },
        url: 'pharmacy/{0}/delcontractmasterdata'
    }
});
