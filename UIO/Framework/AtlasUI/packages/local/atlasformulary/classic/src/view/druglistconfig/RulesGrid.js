Ext.define('Atlas.atlasformulary.view.druglistconfig.RulesGrid', {
  extend: 'Ext.grid.Panel',

  forceFit: true,
  striped: false,
  toggleOnClick: true,

  selModel: {
    toggleOnClick: true,
    allowDeselect: true,
    mode: 'SINGLE'
  },

  columns: [
    {
      dataIndex: 'DrugListDtlName'
    }
  ],

  viewModel: {
    data: {
      drugListSK: null
    },
    stores: {
      rules: {
        type: 'druglistdetails'
      }
    }
  },

  viewConfig: {
    loadMask: false
  },

  bind: {
    store: '{rules}'
  },

  initComponent: function () {
    var vm = this.getViewModel(),
      store = vm.getStore('rules'),
      proxy = store.getProxy();

    // TODO: Properly configure this for paging store.
    if (vm.get('drugListSK')) {
      proxy.setExtraParam('druglistsk', vm.get('drugListSK'));
      proxy.setExtraParam('isnewrequest', true);
      proxy.setExtraParam('startindex', 0);
      proxy.setExtraParam('count', 25);
      store.reload();
    }

    this.callParent();
  }
});

