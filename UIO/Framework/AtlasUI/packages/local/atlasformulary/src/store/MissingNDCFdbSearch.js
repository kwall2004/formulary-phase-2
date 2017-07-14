Ext.define('Atlas.atlasformulary.store.MissingNDCFdbSearch', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingndcfdbsearch',
  model: 'Atlas.atlasformulary.model.MissingNDCFdbSearch',

  proxy: {
    url: '/missingndcfdbsearch',

    extraParams: {
      querystring: ''
    }
  }
});
