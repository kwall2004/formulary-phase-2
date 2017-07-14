/**
 * Created by T4317 on 11/23/2016.
 */
Ext.define('Atlas.common.model.AdvanceClaimSearchByBatch', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'claims/rx/claimmasterdatabybatch',
        extraParams: {
            pagination: true
        }
    }
});
