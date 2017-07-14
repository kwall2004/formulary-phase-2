Ext.define('Atlas.atlasformulary.view.filehistory.FileHistoryController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularyfilehistorycontroller',

  init: function () {
    var from = this.lookupReference('From').getValue(),
      to = this.lookupReference('To').getValue();

    if (from === null && to === null) {
      this.lookupReference('From').setValue(new Date(Number(new Date()) - 12096e5));
      this.lookupReference('To').setValue(new Date());
    }
    this.callParent(arguments);
  },

  onClearFilters: function () {
    // The "filters" property is added to the grid (this) by gridfilters
    this.getView().filters.clearFilters();
  },

  onFilehistoriesPaged: function (store, records) {
    var vm = this.getViewModel(),
      filehistoriesPaged = vm.getStore('filehistoriesPaged');

    filehistoriesPaged.getProxy().setData(records);
    filehistoriesPaged.reload();
  },

  onPageSizeSelect: function (pageSizeCombo) {
    var me = this,
      newCount = parseInt(pageSizeCombo.value, 10);

    this.getViewModel().getStore('filehistoriesPaged').setPageSize(newCount);

    this.getViewModel().getStore('filehistories').load({
      scope: me,
      params: {
        pageSize: newCount,
        count: newCount
      },
      callback: function () {
        this.getView().down('pagingtoolbar').doRefresh();
      }
    });
  },

  onPageSizeSelectRendered: function (pageSizeCombo) {
    pageSizeCombo.select([ 25 ]);
  },

  onDateRangeSubmit: function () {
    var me = this,
      vm = me.getViewModel();

    var startDate = this.lookupReference('From').getValue();
    var endDate = this.lookupReference('To').getValue();
    var store = vm.getStore('filehistories');

    if (startDate !== '' && startDate !== null && endDate !== '' && endDate !== null) {
      startDate = startDate.getMonth() + 1 + '-' + startDate.getDate() + '-' + startDate.getFullYear();
      endDate = endDate.getMonth() + 1 + '-' + endDate.getDate() + '-' + endDate.getFullYear();
      store.getProxy().setExtraParam('startdate', startDate);
      store.getProxy().setExtraParam('enddate', endDate);
    } else {
      delete store.getProxy().extraParams.startdate;
      delete store.getProxy().extraParams.enddate;
    }

    store.load();
  }

});
