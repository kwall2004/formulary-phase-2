/**
 * Created by c4539 on 11/10/2016.
 */
Ext.define('Atlas.portals.provider.model.ListItems', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'portal/hp/listitems'
    }
});