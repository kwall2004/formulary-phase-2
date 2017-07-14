/**
 * Created by n6684 on 12/5/2016.
 */

Ext.define('Atlas.authorization.view.EDIPartnerContactInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin_edipartnercontactinfoviewmodel',
    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false
        }
    }
});