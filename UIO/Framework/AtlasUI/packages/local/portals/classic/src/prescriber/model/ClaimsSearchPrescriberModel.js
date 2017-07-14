/*
 * Last Developer: Srujith Cheruku
 * Date: 10-10-2016
 * Previous Developers: []
 * Origin: RxPrescriber- Claims Search Prescriber
 * Description: Gives users a place to view their claims
 */
Ext.define('Atlas.portals.prescriber.model.ClaimsSearchPrescriberModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalsClaimsSearchPrescriberModel',

    stores: {
        claimsHistory: {
            model: 'Atlas.portals.prescriber.model.ClaimHistoryP',
            autoLoad: true,
            remoteSort:true,
            remoteFilter: true
        },
        claimsMasterCount: {
            model:'Atlas.portals.prescriber.model.ClaimMasterCountP'
        }
    }
});