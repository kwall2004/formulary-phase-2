Ext.define('Atlas.atlasformulary.store.SummaryReportBackText', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryreportbacktext',
  model: 'Atlas.atlasformulary.model.SummaryReportBackText',

  proxy: {
    type: 'formulary',
    url: '/SummaryConfigBackText',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
