Ext.define('Atlas.atlasformulary.view.missingndc.MedispanGPISearchCombo', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'medispangpisearchcombo',
  width: 300,

  store: {
    type: 'missingndcgpisearch'
  },  

  typeAhead: false,
  hideTrigger: true,
  emptyText: 'GPI or label name...',

  listConfig: {
    // Custom rendering template for each item
    getInnerTpl: function () {
      return '<ul style="list-style:none; padding: 10px; line-height: 15px;">' +
        '<li>NDC: <span style="font-weight:200">{NDC}</span></li>' +
        '<li>Label Name: <span style="font-weight:200">{LabelName}</span></li>' +
        '<li>GPI: <span style="font-weight:200">{GPI}</span></li>' +
        '</ul>';
    }
  },
  minChars: 0,
  queryParam: 'queryString',
  queryMode: 'remote'
});
