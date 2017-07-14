/**
 * Created by n6684 on 12/5/2016.
 */

Ext.define('Atlas.authorization.view.EDIPartnerRelationshipFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_edipartnerrelationshipformviewmodel',
    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false
        }
    }
});