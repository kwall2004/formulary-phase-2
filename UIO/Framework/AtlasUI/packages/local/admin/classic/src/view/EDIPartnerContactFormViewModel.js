/**
 * Created by n6684 on 12/5/2016.
 */

Ext.define('Atlas.authorization.view.EDIPartnerContactFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_edipartnercontactformviewmodel',
    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false
        }
    }
});