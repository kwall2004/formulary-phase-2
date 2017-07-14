Ext.define('Atlas.atlasformulary.view.newdrugstomarket.NewDrugsToMarketController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.newdrugstomarket',

  init: function () {
    this.getView().configure();
  },

  onSmartSearchSelect: function (combo) {
    var vm = this.getViewModel(),
      tree = this.lookup('hierarchytreepanel');

    if (tree.getStore().type === 'etctree') {
      vm.getStore('fdb').getProxy().setExtraParams({
        searchstring: combo.lastQuery
      });
      vm.getStore('fdb').reload();
    } else if (tree.getStore().type === 'gpitree') {
      vm.getStore('medispan').getProxy().setExtraParams({
        searchstring: combo.lastQuery
      });
      vm.getStore('medispan').reload();
    }
  },

  onBeforeLoad: function () {
    this.getView().mask('Loading...');
  },

  onLoad: function (store, records) {
    var vm = this.getViewModel();

    vm.getStore('paged').getProxy().setData(records);
    vm.getStore('paged').reload();
    this.getView().unmask();
  },

  clearFilters: function () {
    var grid = this.getView().down('grid'),
      columns = grid.columnManager.getColumns();

    this.onPageSizeSelect({
      value: 25
    });

    columns.forEach(function (column) {
      if (column.filter) {
        if (column.filter.type === 'string') {
          column.filter.setValue(null);
        } else if (column.filter.menu) {
          column.filter.menu.items.each(function (item) {
            if (item.setChecked) {
              item.setChecked(false);
            }
            return true;
          });
        }
      }
    });
    grid.filters.clearFilters();
  },

  onClearFiltersClick: function () {
    var vm = this.getViewModel(),
      tree = this.lookup('hierarchytreepanel');

    this.clearFilters();

    if (tree.getStore().type === 'etctree') {
      vm.getStore('fdb').getProxy().setExtraParams({
        fromdate: vm.get('fromDate'),
        thrudate: vm.get('thruDate')
      });
      vm.getStore('fdb').reload();
    } else if (tree.getStore().type === 'gpitree') {
      vm.getStore('medispan').getProxy().setExtraParams({
        fromdate: vm.get('fromDate'),
        thrudate: vm.get('thruDate')
      });
      vm.getStore('medispan').reload();
    }
  },

  showGenerateReport: function () {
    var popUp = new Atlas.atlasformulary.view.newdrugstomarket.GenerateReportPopUp({});
    popUp.show();
  },

  onFormulariesClick: function (grid, rowIndex) {
    var record = grid.getStore().getAt(rowIndex),
      popUp = new Atlas.atlasformulary.view.newdrugstomarket.AssocFormulariesPopUp({
        title: 'Associated Formularies - "' + record.get('LabelName') + '" (' + record.get('NDC') + ')',
        itemConfig: {
          NDCPassed: record.get('NDC')
        }
      });

    popUp.show();
  },

  onTreeToggle: function (segmentedButton, button, isPressed) {
    var vm = this.getViewModel(),
      sorters = this.lookup('druggrid').getStore().getSorters();

    sorters.clear();

    if (button.itemId === 'etcButton' && isPressed) {
      vm.set('dataSource', 'fdb');
    } else if (button.itemId === 'gpiButton' && isPressed) {
      vm.set('dataSource', 'medispan');
    }

    this.getView().configure();

    sorters.clear();
  },

  onTreeSelect: function (tree, record) {
    var vm = this.getViewModel();

    this.clearFilters();

    if (tree.getStore().type === 'etctree') {
      vm.getStore('fdb').getProxy().setExtraParams({
        etcid: record.get('ETC_ID')
      });
      vm.getStore('fdb').load();
    } else if (tree.getStore().type === 'gpitree') {
      vm.getStore('medispan').getProxy().setExtraParams({
        gpiid: record.get('GPI')
      });
      vm.getStore('medispan').load();
    }
  },

  onPageSizeSelect: function (combo) {
    var vm = this.getViewModel();

    vm.getStore('paged').loadPage(1);
    vm.getStore('paged').setPageSize(parseInt(combo.value, 10));
    this.getView().down('pagingtoolbar').doRefresh();
  },

  onPageSizeAfterRender: function (combo) {
    combo.select([25]);
  }
});
