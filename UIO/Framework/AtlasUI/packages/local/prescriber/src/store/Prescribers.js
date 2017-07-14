Ext.define('Atlas.prescriber.store.Prescribers',{
    alias: 'store.prescribers',
    extend:'Ext.data.Store',
    model: 'Atlas.prescriber.model.Prescriber',
    autoLoad: true
});