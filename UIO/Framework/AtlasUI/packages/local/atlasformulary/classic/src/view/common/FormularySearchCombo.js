Ext.define('Atlas.atlasformulary.view.common.FormularySearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'smartformularysearchcombo',
  width: 300,

  viewModel: {
    stores: {
      smartsearchstore: {
        model: 'Atlas.atlasformulary.model.FormularySearch',
        remoteSort: true,
        remoteFilter: true
      }
    }

  },

  bind: {
    store: '{smartsearchstore}'
  },

  typeAhead: false,
  hideLabel: true,
  hideTrigger: true,
  emptyText: 'Search...',

  listConfig: {
    userCls: 'common-key-value-boundlist',
    getInnerTpl: function () {
      return '<h5>Tenant Owner: <span> {TenantOwner}</span></h5>' +
        '<h5>Formulary Name:<span> {FrmlryName}</span></h5>' +
        '<h5>LOB: <span>{LOBName}</span></h5>';
    }
  },
  minChars: 0,
  queryParam: 'searchstring',
  queryMode: 'remote'
});
