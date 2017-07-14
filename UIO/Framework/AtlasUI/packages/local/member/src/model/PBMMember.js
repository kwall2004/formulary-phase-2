/**
 * Created by j2487 on 12/1/2016.
 */
Ext.define('Atlas.member.model.PBMMember', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/{0}/pbmmemberid'
    }
})
