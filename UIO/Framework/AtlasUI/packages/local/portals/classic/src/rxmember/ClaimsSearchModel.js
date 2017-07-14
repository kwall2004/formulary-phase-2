/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search
 * Description: Model for the Claims Search Page
 */
Ext.define('Atlas.portals.view.rxmember.ClaimsSearchModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.claimsSearchModel',

  stores: {
    claimSearchStore: {
      pageSize: 10,
      model: 'Atlas.portals.rxmember.model.ClaimSearchModel'
            // remoteSort:true,
            // remoteFilter: true
    },
    pharmacyInfoStore: {
      model: 'Atlas.portals.rxmember.model.PharmacyInfoStoreModel',
      session: true
    },
    prescriberInfoStore: {
      model: 'Atlas.portals.rxmember.model.PrescriberInfoStoreModel',
      session: true
    }
  }

});