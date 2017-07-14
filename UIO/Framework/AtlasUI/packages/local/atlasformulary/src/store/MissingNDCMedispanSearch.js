Ext.define('Atlas.atlasformulary.store.MissingNDCMedispanSearch', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.missingndcmedispansearch',
  model: 'Atlas.atlasformulary.model.MissingNDCMedispanSearch',

  proxy: {
    url: '/missingndcmedispansearch',

    extraParams: {
      querystring: ''
    }
  }
});
