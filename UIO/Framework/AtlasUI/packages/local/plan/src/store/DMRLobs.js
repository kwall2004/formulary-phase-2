Ext.define('Atlas.plan.store.DMRLobs',{
    alias: 'store.plan-dmrlobs',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.DMRLob',
    //model: 'Atlas.common.model.shared.ListModel',
    //sorters: 'planGroupName',
    autoLoad: true
    /*proxy: {
        extraParams: {
            pListName: 'DMRLOB'
        },
        url: 'shared/{0}/listitems'
    }*/
});