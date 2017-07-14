/**
 * Created by d4662 on 11/11/2016.
 */
Ext.define('Atlas.plan.store.OutreachContactedEntity', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.plan-outreachContactedEntity',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'OutreachContactedEntity'
        },
        url: 'shared/{0}/listitems'
    }
});