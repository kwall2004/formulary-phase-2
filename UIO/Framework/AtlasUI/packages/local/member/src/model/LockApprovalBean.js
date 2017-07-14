/**
 * Created by s6627 on 1/11/2017.
 */
Ext.define('Atlas.member.model.LockApprovalBean', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'value',type: 'string'},
        {name: 'name',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pListName:'LockApprovers'
        },
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'shared/{0}/listitems'
    }
});