Ext.define('Atlas.atlasformulary.store.MissingNDC', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingndc',
  model: 'Atlas.atlasformulary.model.MissingNDC',

  proxy: {
    url: '/missingndcmedispan',
    idParam: 'ndc'
  }
});
