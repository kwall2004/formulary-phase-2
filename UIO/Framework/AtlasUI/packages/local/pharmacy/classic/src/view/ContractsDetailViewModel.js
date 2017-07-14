/**
 * Created by rsalekin on 11/15/2016.
 */

Ext.define('Atlas.authorization.view.ContractsDetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.contractsdetailview',

    stores: {
        storeSearchGrid: {
            model: 'Atlas.pharmacy.model.PharmacyRelationship',
            sorters: [{
                property: 'EffectiveDate',
                direction: 'DESC' // 'ASC' 'DESC'
            }],
            autoLoad: false
        }
    }
});
