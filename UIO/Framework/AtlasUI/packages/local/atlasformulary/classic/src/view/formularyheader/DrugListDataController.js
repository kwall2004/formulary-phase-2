Ext.define('Atlas.atlasformulary.view.formularyheader.DrugListDataController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.druglistdata',

  init: function () {
    var view = this.getView();
    this.getViewModel().set('viewonly', view.viewOnly);
    this.callParent(arguments);
  },

  onAddClick: function (combo, record) {
    this.getView().fireEvent('onAddDrugList', record);
    this.getViewModel().set('drugListInput', '');
    if (combo) {
      combo.setValue(null);
    }
  },

  onPlusClick: function () {
    var combo = this.getView().down('#drugListCombo');
    this.onAddClick(combo, combo.findRecordByValue(combo.getValue()));
  },

  onRemoveClick: function (grid, rowIndex) {
    var rec = grid.getStore().getAt(rowIndex);
    this.getView().fireEvent('onRemoveDrugList', rec);
  },

  onEnterKey: function (field, e) {
    if (e.getKey() === e.ENTER) {
      this.onAddClick();
    }
  }
});
