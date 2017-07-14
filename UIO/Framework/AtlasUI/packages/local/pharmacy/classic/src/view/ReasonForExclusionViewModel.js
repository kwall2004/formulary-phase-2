/**
 * Created by rsalekin on 11/24/2016.
 */
Ext.define('Atlas.pharmacy.view.ReasonForExclusionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.reasonforexclusion',

    stores: {
        storeExclusionReason: {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            proxy: {
                extraParams: {
                    pListName: 'PharmExclReason'
                }
                ,
                url: 'shared/{0}/listitems'
            }
            ,
            autoLoad: true
        }
    }
});
