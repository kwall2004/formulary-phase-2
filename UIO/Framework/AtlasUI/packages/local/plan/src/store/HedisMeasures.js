/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.store.HedisMeasures',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-hedismeasures',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'HedisMeasure'
        },
        url: 'shared/{0}/listitems'
    }
});
