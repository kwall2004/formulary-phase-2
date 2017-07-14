Ext.define('Atlas.atlasformulary.store.SummaryConfigDrugSortBy', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfigdrugsortby',
  model: 'Atlas.atlasformulary.model.SummaryConfigDrugSortBy',

  proxy: {
    url: '/SummaryDrugSortBy'
  }
});