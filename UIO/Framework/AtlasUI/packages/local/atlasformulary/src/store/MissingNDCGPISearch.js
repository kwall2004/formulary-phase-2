Ext.define('Atlas.atlasformulary.store.MissingNDCGPISearch', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingndcgpisearch',
  model: 'Atlas.atlasformulary.model.MissingNDCGPISearch',

  proxy: {
    url: '/missingndcgpisearch',

    extraParams: {
      querystring: ''
    }
  }
});
