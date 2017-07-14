Ext.define('Atlas.plan.store.FormularyItems',{
    alias: 'store.plan-formularyitems',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.FormularyItem',
    sorters:{
        property:'FormularyID',
        direction:'DESC'
    }

});