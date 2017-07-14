Ext.define('Atlas.atlasformulary.store.MissingFdbNDC', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingfdbndc',
  model: 'Atlas.atlasformulary.model.MissingFdbNDC',

  proxy: {
    url: '/missingndcfdb',
    idParam: 'ndc'
  }
});
