/**
 * Created by n6684 on 11/7/2016.
 */

Ext.define('Atlas.authorization.view.NetworkSetupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.networksetupviewmodel',

    stores: {
        allPharmacyNetworks: {
            model: 'Atlas.pharmacy.model.NetworkSetupModel',
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        }
    }
});
