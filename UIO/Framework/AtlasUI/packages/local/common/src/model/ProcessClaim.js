/**
 * Created by T4317 on 11/8/2016.
 */
Ext.define('Atlas.common.model.ProcessClaim', {
    extend: 'Atlas.common.model.Base',
    proxy:{
        url: 'claims/{0}/processucfclaim'
    }

});