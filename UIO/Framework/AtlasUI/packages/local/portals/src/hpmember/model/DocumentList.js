/**
 * Created by T3852 on 10/28/2016.
 */
Ext.define('Atlas.portals.hpmember.model.DocumentList', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'member/hp/documentcontentportal'
    }
});