Ext.define('Atlas.atlasformulary.view.missingndc.FdbNDCSearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'fdbndcsearchcombo',
  width: 300,

  viewModel: {
    stores: {
      missingndcfdb: {
        type: 'missingndcfdbsearch'
      }
    }

  },

  bind: {
    store: '{missingndcfdb}'
  },

  typeAhead: false,
  hideTrigger: true,
  emptyText: 'NDC or label name...',

  listConfig: {
    // Custom rendering template for each item
    getInnerTpl: function () {
      return '<ul style="list-style:none; padding: 10px; line-height: 15px;">' +
        '<li>NDC: <span style="font-weight:200">{NDC}</span></li>' +
        '<li>Label Name: <span style="font-weight:200">{LabelName}</span></li>' +
        '</ul>';
    }
  },
  minChars: 0,
  queryParam: 'queryString',
  queryMode: 'remote'
});
