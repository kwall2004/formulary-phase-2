Ext.define('Atlas.atlasformulary.store.SummaryConfigOtcBy', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfigotcby',
  model: 'Atlas.atlasformulary.model.SummaryConfigOtcBy',

  proxy: {
    url: '/SummaryOtcBy'
  }
});