/**
 * Created by T4317 on 10/20/2016.
 */
Ext.define('Atlas.common.model.PharmacyUser', {
    extend: 'Atlas.common.model.Base',
    proxy:{
        url:'pharmacy/rx/pharmacyusermaster'
    }
});
