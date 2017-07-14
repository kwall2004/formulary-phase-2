Ext.define('Atlas.atlasformulary.view.umprograms.RulesGrid', {
  extend: 'Ext.grid.Panel',

  forceFit: true,
  flex: 1,
  striped: false,
  toggleOnClick: true,

  selModel: {
    toggleOnClick: true,
    allowDeselect: true,
    mode: 'SINGLE'
  },

  columns: [
    {
      dataIndex: 'name',

      renderer: function (value, metaData, record) {
        metaData.tdAttr = 'data-qtip="' + record.get('cacheStatusDesc') + '"';
        return value;
      }
    }
  ],

  viewModel: {
    data: {
      formularySK: null,
      parent: null,
      mode: 'read'
    }
  },

  viewConfig: {
    stripeRows: true,
    loadMask: false,

    getRowClass: function (record) {
      var result = '';
      var cacheStatus = record.get('cacheStatusSK');

      if (cacheStatus === 2 || cacheStatus === 3) {
        result = 'processStatus';
      } else if (cacheStatus === 5) {
        result = 'errorStatus';
      }

      return result;
    }
  },

  bind: '{rules}',

  initComponent: function () {
    var vm = this.getViewModel();
    var store = null;
    var formularySK = vm.get('formularySK');

    if (formularySK) {
      if (vm.get('mode') === 'edit') {
        store = Ext.create('Atlas.atlasformulary.store.DrugCategoriesEdit');
      } else {
        store = Ext.create('Atlas.atlasformulary.store.DrugCategoriesView');
      }

      var proxy = store.getProxy();
      proxy.setExtraParam('formularysk', formularySK);
      proxy.setExtraParam('isnewrequest', true);

      store.on('load', function () {
        // After the initial load, we no longer want isnewrequest to be true.
        store.getProxy().setExtraParam('isnewrequest', false);
      }, this);

      vm.setStores({
        rules: store
      });

      store.reload();
    }

    this.callParent();
  },

  dockedItems: [
    {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      displayInfo: true,
      emptyMsg: 'No rules to display.',
      bind: '{rules}'
    }
  ]
});
