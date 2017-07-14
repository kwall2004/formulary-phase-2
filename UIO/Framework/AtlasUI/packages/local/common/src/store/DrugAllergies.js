/**
 * Created by S4505 on 4/10/2017.
 */
/**
 * Created by S4505 on 4/7/2017.
 */


Ext.define('Atlas.common.store.DrugAllergies',{
    alias: 'store.common-drugallergies',
    extend: 'Ext.data.Store',
    //type:'clonestore',
    model: 'Atlas.common.model.shared.DrugAllergiesModel',
    autoLoad: false,
    proxy: {
        type:'layer7',
        url: 'member/{0}/memberallergies',
        pagination:true
    }
});
