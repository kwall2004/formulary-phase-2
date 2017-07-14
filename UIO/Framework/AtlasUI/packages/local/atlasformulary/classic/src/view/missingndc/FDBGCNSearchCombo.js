Ext.define('Atlas.atlasformulary.view.missingndc.FDBGCNSearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'fdbgcnsearchcombo',
  width: 300,

  store: {
    type: 'missingndcgcnsearch'
  },  

  typeAhead: false,
  hideTrigger: true,
  emptyText: 'GCN or label name...',

  listConfig: {
    // Custom rendering template for each item
    getInnerTpl: function () {
      return '<ul style="list-style:none; padding: 10px; line-height: 15px;">' +
        '<li>NDC: <span style="font-weight:200">{NDC}</span></li>' +
        '<li>Label Name: <span style="font-weight:200">{LabelName}</span></li>' +
        '<li>GCN: <span style="font-weight:200">{GCN_SEQNO}</span></li>' +
        '</ul>';
    }
  },
  minChars: 0,
  queryParam: 'queryString',
  queryMode: 'remote'
});
