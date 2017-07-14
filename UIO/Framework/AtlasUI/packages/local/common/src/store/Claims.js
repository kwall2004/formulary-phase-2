/**
 * Created by S4505 on 4/7/2017.
 */


Ext.define('Atlas.common.store.Claims',{
    alias: 'store.common-claims',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.common.model.Claims',
    remoteSort: true,
    remoteFilter: true,
    proxy: {
        type:'layer7',
        extraParams:{
            pagination: true
        },
        url: 'shared/{0}/claimshistory'
    }
});
