Ext.define('Atlas.atlasformulary.view.common.DrugListSelectionController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.druglistselection',

  onListSelected: function (theCell, td, cellIndex, record) {
    this.getView().fireEvent('listSelected', record.get('name'));
    this.getView().destroy();
  }
});