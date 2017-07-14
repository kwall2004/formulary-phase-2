/**
 * Created by S4505 on 12/14/2016.
 */

Ext.define('Atlas.plan.store.LineOfBusiness',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-lineofbusiness',
    model: 'Atlas.common.model.shared.ListDetailModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'LineOfBusiness'
        },
        url: 'system/{0}/listdetail'
    },
    sorters: [{
        property: 'ListDescription',
        direction: 'ASC'
    }]
});
