/**
 * Created by T4317 on 9/28/2016.
 */
Ext.define('Atlas.prescriber.model.PrescriberPasswordReset',{
    extend: 'Atlas.common.model.Base',
    proxy: {
        url:'prescriber/{0}/prescriberpassword'
    }
});