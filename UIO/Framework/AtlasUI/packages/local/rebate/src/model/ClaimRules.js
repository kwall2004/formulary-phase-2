/**
 * Created by akumar on 02/23/2017.
 */
Ext.define('Atlas.rebate.model.ClaimRules', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'finance/{0}/rebateclaimsubmitrules'
    }
});