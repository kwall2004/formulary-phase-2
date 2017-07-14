Ext.define('Atlas.portals.view.provider.providerhome.HomeReplyWindowViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.homereplywindow',

  data: {
    rowSelection: null
  },

  stores: {
    messageStatuses: {
      model: 'Atlas.portals.provider.model.MessagesStatus'
    }
  }
});
