/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.pharmacy.model.ContractsDetailModel', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'pharmacy/{0}/pharmacyrelationshipdetail',
        extraParams: {
            ipiBatchSize: 0,
            ipiJumpStart: 0,
            ipcFilter: "",
            ipcDirection:"Fwd",
            ipcBckRecPointer: "",
            ipcFwdRecPointer: "",
            pagination: true
        }
    }
});