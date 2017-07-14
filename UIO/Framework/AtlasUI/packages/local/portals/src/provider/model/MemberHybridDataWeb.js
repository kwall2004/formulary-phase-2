Ext.define('Atlas.portals.provider.model.MemberHybridDataWeb', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSeqNum: 0
        },
        url : 'member/hp/memberhybriddataweb'
    }
});