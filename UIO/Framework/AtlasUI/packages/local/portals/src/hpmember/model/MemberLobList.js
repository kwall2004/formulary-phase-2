/**
 * Created by c4539 on 10/27/2016.
 */
Ext.define('Atlas.portals.hpmember.model.MemberLobList', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        },
        url : 'member/hp/memberloblist'
    }
});