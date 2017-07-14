Ext.define('Atlas.atlasformulary.view.common.FormularyNotesWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularynoteswindowctrl',

  listen: {
    controller: {
      'addformularynoteswindow': {
        newFormularyNoteSaved: 'onNewFormularyNoteSaved'
      }
    }
  },

  loadFormularyNotes: function (formularySK) {
    var store = this.getViewModel().getStore('formularyreviewnotes');

    this.getViewModel().set('formularySK', formularySK);
    store.proxy.setExtraParam('formularysk', formularySK);
    store.load();
  },

  onAddNoteClick: function () {
    var me = this,
      addFormularyNotesWindow = Ext.create(Atlas.atlasformulary.view.common.AddFormularyNotesWindow, {
        viewModel: {
          data: {
            note: {
              FrmlrySK: me.getView().getViewModel().get('formularySK'),
              UserId: Atlas.user.un
            }
          }
        }
      });
    Ext.first('grid[itemId=formularyreviewnotesgrid]').focus();
    addFormularyNotesWindow.show();
  },

  onNewFormularyNoteSaved: function () {
    this.getViewModel().getStore('formularyreviewnotes').reload();
  },

  onNoteDblClicked: function (grid, record) {
    var FormularyNoteDetail = Ext.create(Atlas.atlasformulary.view.common.FormularyNoteDetail, {
      viewModel: {
        data: {
          note: record.data
        }
      }
    });
    FormularyNoteDetail.show();
  },

  onCloseClick: function () {
    this.getView().destroy();
  }

});
