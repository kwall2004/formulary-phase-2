/**
 * Created by c4539 on 11/18/2016.
 */
Ext.define('Atlas.portals.provider.model.ValidatePriorAuthType', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'member/hp/validatepriorauthtype'
    }
});