Ext.define('Atlas.atlasformulary.store.MissingNDCGCNSearch', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingndcgcnsearch',
  model: 'Atlas.atlasformulary.model.MissingNDCGCNSearch',

  proxy: {
    url: '/missingndcgcnsearch',

    extraParams: {
      querystring: ''
    }
  }
});
