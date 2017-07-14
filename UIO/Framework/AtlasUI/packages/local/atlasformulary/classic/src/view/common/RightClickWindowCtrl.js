Ext.define('Atlas.atlasformulary.view.common.RightClickWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.rightclickwindowctrl',

  listen: {
    controller: {
      'addndcnoteswindow': {
        newNDCNoteSaved: 'onNewNDCNoteSaved'
      }
    }
  },

  loadNDCNotes: function (NDC) {
    var store = this.getViewModel().getStore('ndcnotes');

    this.getViewModel().set('NDC', NDC);
    store.proxy.setExtraParam('ndc', NDC);
    store.load();
  },

  onTabActivate: function (tab) {
    this.getViewModel().set('activeTab', tab.itemId);
  },

  onAddNoteClick: function () {
    var me = this,
      addNDCNotesWindow = Ext.create(Atlas.atlasformulary.view.common.AddNDCNotesWindow, {
        viewModel: {
          data: {
            note: {
              NDC: me.getView().getViewModel().get('NDC'),
              UserId: Atlas.user.un
            }
          }
        }
      });
    addNDCNotesWindow.show();
  },

  onNewNDCNoteSaved: function () {
    this.getViewModel().getStore('ndcnotes').reload();
  },

  onNoteDblClicked: function (grid, record) {
    var NDCNoteDetail = Ext.create(Atlas.atlasformulary.view.common.NDCNoteDetail, {
      viewModel: {
        data: {
          note: record.data
        }
      }
    });
    NDCNoteDetail.show();
  },

  onCloseClick: function () {
    this.getView().destroy();
  },

  loadFormulariesByNDC: function (NDC) {
    var store = this.getViewModel().getStore('ndcformularies');

    this.getViewModel().set('NDC', NDC);
    store.proxy.setExtraParam('ndc', NDC);
    store.load();
  },

  loadNDCHistory: function (NDC) {
    var store = this.getViewModel().getStore('customndchistories');

    this.getViewModel().set('NDC', NDC);
    store.proxy.setExtraParam('ndc', NDC);
    store.load();
  },

  loadAllStores: function (NDC) {
    this.loadNDCNotes(NDC);
    this.loadFormulariesByNDC(NDC);
    this.loadNDCHistory(NDC);
  }
});
