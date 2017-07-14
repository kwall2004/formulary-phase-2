/**
 * Created by rsalekin on 11/22/2016.
 */
Ext.define('Atlas.pharmacy.model.ContractMaster', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pContractID: '',
            pFieldList: '',
            pFields: ''
        },
        url: 'pharmacy/{0}/contractmasterdata'
    }
});
