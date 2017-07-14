/**
 * Created by b6636 on 12/7/2016.
 */
Ext.define('Atlas.portals.provider.model.UserList', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'system/hp/exportuserlist'
    }
});