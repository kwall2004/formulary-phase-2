/**
 * Created by t3852 on 11/10/2016.
 */
Ext.define('Atlas.portals.hpmember.MemberRegister', {
    extend: 'Atlas.common.model.Base',

    fields: [
    ],
    proxy: {
        url : 'portal/hp/memberregister'
    }
});