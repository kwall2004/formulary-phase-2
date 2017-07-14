/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.store.RejectionCodes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-rejectioncodes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'InterventionRejectionCodes'
        },
        url: 'shared/{0}/listitems'
    }
});

