Ext.define('Atlas.plan.store.CopayFunctions',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-copayfunctions',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'CopayFunctions'
        },
        url: 'shared/{0}/listitems'
    }
});


