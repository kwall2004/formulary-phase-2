Ext.define('Atlas.atlasformulary.view.common.DrugGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.druggrid',
  title: 'Drug Search Results',

  requires: [
    'Ext.grid.selection.SpreadsheetModel'
  ],

  controller: {
    onBeforeLoad: function (store, operation, eOpts) {
      this.getView().fireEvent('beforeload', store, operation, eOpts);
    },

    onLoad: function (store, records, successful, operation, eOpts) {
      this.getView().fireEvent('load', store, records, successful, operation, eOpts);
    },

    onBeforeSort: function (store, sorters, eOpts) {
      this.getView().fireEvent('beforesort', store, sorters, eOpts);
    },

    onBeforeChange: function (pagingWidget, newPageNumber) {
      var searchParams = this.getViewModel().get('searchParams');

      searchParams.startIndex = (newPageNumber - 1) * searchParams.count;
      searchParams.criteriaChange = false;
    }
  },

  viewModel: {
    stores: {
      fdb: {
        type: 'fdbdrug',

        listeners: {
          beforeload: 'onBeforeLoad',
          load: 'onLoad',
          beforesort: 'onBeforeSort'
        }
      },
      medispan: {
        type: 'medispandrug',

        listeners: {
          beforeload: 'onBeforeLoad',
          load: 'onLoad',
          beforesort: 'onBeforeSort'
        }
      }
    }
  },

  configure: function () {
    var vm = this.getViewModel();

    if (!vm.get('dataSource') || vm.get('dataSource') === 'fdb') {
      this.setStore(vm.getStore('fdb'));
      this.down('pagingtoolbar').setStore(vm.getStore('fdb'));
    } else if (vm.get('dataSource') === 'medispan') {
      this.setStore(vm.getStore('medispan'));
      this.down('pagingtoolbar').setStore(vm.getStore('medispan'));
    } else {
      Ext.raise({
        msg: 'Invalid source.',
        source: vm.get('dataSource')
      });
    }
  },

  emptyText: 'No results found...',
  scrollable: true,
  trackMouseOver: false,

  dockedItems: [
    {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      split: true,

      listeners: {
        beforechange: 'onBeforeChange'
      }
    }
  ]
});
