/**
 * Created by S4505 on 4/6/2017.
 */

Ext.define('Atlas.common.store.MemberPAHistory',{
    alias: 'store.common-memberPAHistory',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.common.model.MemberPAHistory',
    remoteSort: true,
    remoteFilter: true,
    sorters: [{
        property: 'lastModified',
        direction: 'DESC'
    }],
    proxy: {
        type:'layer7',
        extraParams:{
            pagination: true
        },
        url: 'member/{0}/memberPaHistory'
    }
});
