Ext.define('Atlas.atlasformulary.view.common.AssocFormulariesWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.assocformularieswindow',

  loadAssocFormularies: function (drugListSK) {
    var store = this.getViewModel().getStore('druglistassocformularies');

    store.proxy.setExtraParam('druglistsk', drugListSK);
    store.load();
  },

  onCloseClicked: function () {
    this.getView().destroy();
  }
});
