/**
 * Created by c4539 on 11/16/2016.
 */
Ext.define('Atlas.portals.provider.model.DiagCodeMaster', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'provider/hp/diagcodemaster'
    }
});