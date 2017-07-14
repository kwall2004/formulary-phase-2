Ext.define('Atlas.atlasformulary.view.common.DrugListSearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'smartdruglistsearchcombo',
  width: 300,

  viewModel: {
    stores: {
      smartsearchstore: {
        model: 'Atlas.atlasformulary.model.DrugListSearch',
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
        '<h5>Drug List Name:<span> {DrugListName}</span></h5>' +
        '<h5>LOB: <span>{LOBName}</span></h5>';
    }
  },
  minChars: 0,
  queryParam: 'searchstring',
  queryMode: 'remote'
});
