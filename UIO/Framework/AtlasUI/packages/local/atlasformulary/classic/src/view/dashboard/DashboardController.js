Ext.define('Atlas.atlasformulary.view.dashboard.DashboardController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.dashboard',

  lastIndex: 0,

  init: function () {
    if (this.getView().items.length < 3) {
      this.addColumns();
    }
  },

  onPartSelected: function (combo, record) {
    this.addPart(record.get('alias'));
    combo.clearValue();
  },

  onItemRemoved: function () {
    if (this.getColumnCount() < 3) {
      this.addColumns();
    }
  },

  addColumns: function () {
    var view = this.getView();
    var columnWidths = [
      0.33,
      0.33,
      0.34
    ];

    var startPoint = this.getColumnCount();

    for (var i = startPoint; i < columnWidths.length; i++) {
      var column = view.createColumn();
      column.columnWidth = columnWidths[i];
      view.add(column);
    }

    this.getView().updateLayout();
  },

  addPart: function (aliasOfPartToAdd) {
    if (this.getColumnCount() < 3) {
      this.addColumns();
    }
    var items = this.getView().items.items;
    var count = items[0].items.length + items[2].items.length + items[4].items.length;

    var placeToInsert = count < 3 ? count : (count % 3);
    this.getView().addNew(aliasOfPartToAdd, placeToInsert);
  },

  getColumnCount: function () {
    var count = 0;
    var items = this.getView().items.items;

    for (var i = 0; i < items.length; ++i) {
      if (!items[i].isSplitter) {
        count++;
      }
    }

    return count;
  }
});
