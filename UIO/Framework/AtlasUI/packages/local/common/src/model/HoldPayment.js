/**
 * Created by T4317 on 10/21/2016.
 */
Ext.define('Atlas.common.model.HoldPayment', {
    extend: 'Atlas.common.model.Base',
    proxy:{
        url:'eligibility/hp/optionsvalue'
    }
});
