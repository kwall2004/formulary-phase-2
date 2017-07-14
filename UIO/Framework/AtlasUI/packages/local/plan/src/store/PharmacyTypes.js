/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.store.PharmacyTypes',{
    alias: 'store.plan-pharmacytypes',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.PharmacyType',
    //model: 'Atlas.common.model.shared.ListModel',
    //sorters: 'planGroupName',
    autoLoad: true
   /* proxy: {
        extraParams: {
            pListName: 'DispenserType'
        },
        url: 'shared/{0}/listitems'
    }*/
});