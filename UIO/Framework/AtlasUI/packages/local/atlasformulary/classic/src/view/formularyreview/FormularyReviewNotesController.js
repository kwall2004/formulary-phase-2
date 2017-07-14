Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewNotesController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyreviewnotes',

  init: function () {
    var vm = this.getViewModel(),
      formularyNotesStore = vm.getStore('reviewnotes'),
      sk = vm.get('formularySK');

    formularyNotesStore.getProxy().setExtraParam('formularysk', sk);
    formularyNotesStore.load();
  },

  onOKClick: function () {
    this.getView().destroy();
  },

  onDoubleClickRow: function () {
    var grid = this.lookupReference('notesGrid'),
      selected = grid.getSelectionModel(),
      wPopUp = new Atlas.atlasformulary.view.formularyreview.FormularyReviewNoteDetail({
        itemConfig: {
          selectedRow: selected
        }
      });

    wPopUp.show();
  }
});
