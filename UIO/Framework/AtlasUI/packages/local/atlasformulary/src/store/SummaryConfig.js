Ext.define('Atlas.atlasformulary.store.SummaryConfig', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfig',
  model: 'Atlas.atlasformulary.model.SummaryConfig',
  pageSize: 25,

  proxy: {
    type: 'formulary',
    url: '/summaryconfig',
    idParam: 'SumRptCfgSK',
    skParam: ''
  }
});
