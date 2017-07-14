Ext.define('Atlas.atlasformulary.store.FormularyHeaders', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.formularyheaders',
  model: 'Atlas.atlasformulary.model.FormularyHeader',
  pageSize: 25,

  proxy: {
    type: 'formulary',
    url: '/formularyheader',
    idParam: 'frmlrysk',
    skParam: ''
  }
});
