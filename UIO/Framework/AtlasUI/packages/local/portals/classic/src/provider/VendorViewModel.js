Ext.define('Atlas.portals.provider.VendorViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.portalsprovidervendor',

  stores: {
    providerTaxId: {
      model: 'Atlas.portals.provider.model.ProviderTaxIDList'
    },
    vendorLedgerMaster: {
      model: 'Atlas.portals.provider.model.VendorLedgerMaster'
    },
    vendorComboStore: {
      proxy: {
        type: 'memory'
      }
    }
  }
});
