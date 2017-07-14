Ext.define('Atlas.plan.store.CoverageCodes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-coveragecodes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'CoverageCode'
        },
        url: 'shared/{0}/listitems'
    }
});