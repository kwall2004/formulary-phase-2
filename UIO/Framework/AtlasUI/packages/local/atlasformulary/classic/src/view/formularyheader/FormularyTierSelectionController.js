Ext.define('Atlas.atlasformulary.view.formularyheader.FormularyTierSelectionController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularytierselection',

  init: function () {
    var view = this.getView();

    this.getViewModel().set('viewOnly', view.viewOnly);
    this.callParent(arguments);
  },

  onAddClick: function () {
    var combo = this.getView().down('#tierCombo');

    if (combo) {
      this.getView().fireEvent('onListEditorAdd', combo.value);
      combo.setValue(null);
    }
  },

  onRemoveClick: function (grid, rowIndex) {
    var combo = this.getView().down('#tierCombo');
    var rec = grid.getStore().getAt(rowIndex);

    if (combo) {
      combo.setValue(null);
    }

    this.getView().fireEvent('onListEditorRemove', rec);
  },

  onSpecialKey: function (field, e) {
    if (e.getKey() === e.ENTER) {
      this.onAddClick();
    }
  }
});

