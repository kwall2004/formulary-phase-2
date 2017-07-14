/**
 * Created by s6627 on 1/12/2017.
 */
Ext.define('Atlas.member.model.MemberLockStatus', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:'MemberLockStatus'
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'shared/{0}/listitems'
    }
});