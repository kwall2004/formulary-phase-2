/**
 * Created by c4539 on 1/10/2017.
 */
Ext.define('Atlas.portals.provider.model.NotesMasterApi', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/hp/notesmasterapi'
    }
});