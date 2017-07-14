/**
 * Created by S4505 on 4/10/2017.
 */
Ext.define('Atlas.casemanagement.store.casedetails.FaxHistory',{
    alias: 'store.casemanagement-faxhistory',
    extend: 'Ext.data.Store',
    model: 'Atlas.casemanagement.model.FaxHistoryModel',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type:'layer7',
        extraParams: {
            pagination: true
        },
        url: 'member/{0}/mtmfaxattachment'
    }

});