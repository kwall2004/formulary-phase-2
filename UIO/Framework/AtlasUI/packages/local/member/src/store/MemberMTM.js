/**
 * Created by S4505 on 4/11/2017.
 */

Ext.define('Atlas.common.store.MemberMTM',{
    alias: 'store.member-membermtm',
    extend: 'Ext.data.Store',
    remoteSort: true,
    autoLoad:false,
    model: 'Atlas.member.model.MemberMTMModel',
    proxy: {
        type:'layer7',
        url: 'member/{0}/mtmcases',
        timeout:120000,
        extraParams:{
            pagination:true
        }
    }
});
