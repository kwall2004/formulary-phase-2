// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.view.provider.providerhome.HomeMessageWindowViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.homemessagewindow',

  init: function () {
    var vm = this.getViewModel(),
      selectedRow = vm.getData().selectedRow.getData();

    vm.set('selection', selectedRow);
  },

  onAllMessagesView: function () {
    this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
      recipientIDInput: this.getViewModel().getData().selectedRow.getData().recipientID,
      atlasId: this.getViewModel().getData().selectedRow.getData().recipientID,
      activeTab: 'Messages'
    });
    this.getView().destroy();
  },

  onReplyClick: function () {
    var vm = this.getViewModel(),
      homeReplyWindow = new Atlas.portals.view.provider.providerhome.HomeReplyWindow({
        itemConfig: {
          selectedRow: vm.getData().selectedRow
        }
      });

    homeReplyWindow.show();
    this.getView().destroy();
  },

  onCancelClick: function () {
    this.getView().destroy();
  }
});