Ext.define('Atlas.atlasformulary.view.formularyconfig.TiersGrid', {
  extend: 'Ext.grid.Panel',

  forceFit: true,
  striped: false,

  selModel: {
    toggleOnClick: true,
    allowDeselect: true,
    mode: 'SINGLE'
  },

  columns: [
    {
      dataIndex: 'FrmlryTierNbr',
      flex: 1
    },
    {
      dataIndex: 'FrmlryTierName',
      flex: 3
    }
  ],

  viewModel: {
    data: {
      formularySK: null,
      parent: null
    },
    stores: {
      tiers: {
        type: 'formularytier'
      }
    }
  },

  bind: {
    store: '{tiers}'
  },

  initComponent: function () {
    var formularySK = this.getViewModel().get('formularySK');

    if (formularySK) {
      var store = this.getViewModel().getStore('tiers');
      store.getProxy().setExtraParam('frmlrysk', formularySK);
      store.reload();
    }

    this.callParent();
  }
});
