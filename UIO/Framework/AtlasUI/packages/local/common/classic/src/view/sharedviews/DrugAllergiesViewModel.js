/**
 * Created by s6627 on 11/26/2016.
 */
Ext.define('Atlas.common.view.sharedviews.DrugAllergiesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DrugAllergiesViewModel',
    stores: {
        StoreAllergies: {
            // model: 'Atlas.common.model.shared.DrugAllergiesModel',
            // autoLoad: false
            type: 'common-drugallergies'
        },
        StoreStatus:
        {
            type: 'clonestore',
            model: 'Atlas.common.model.shared.ListModel',
            autoLoad: true,
            proxy: {
                extraParams: {
                    pListName: 'AllergyReportingSource'
                },
                url: 'shared/{0}/listitems'
            }
        }
    }
})