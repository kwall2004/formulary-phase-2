Ext.define('Atlas.portals.view.provider.providerhome.InquiryViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.homeinquirywindow',

  stores: {
    medicaidStore: {
      proxy: {
        type: 'memory'
      }
    },
    hedisStore: {
      proxy: {
        type: 'memory'
      }
    },
    serviceCountsStore: {
      proxy: {
        type: 'memory'
      }
    }
  }
});
