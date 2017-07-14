Ext.define('Atlas.atlasformulary.store.CustomNDCHistories', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.customndchistories',
  model: 'Atlas.atlasformulary.model.CustomNDCHistory',

  proxy: {
    url: '/customndchistory',

    extraParams: {
      ndc: null
    }
  }
});