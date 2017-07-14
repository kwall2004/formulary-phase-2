/**
 * Created by T4317 on 11/22/2016.
 */
Ext.define('Atlas.common.model.AdvanceClaimSearch', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'claims/{0}/claimmasterdatacount'
    }
});
