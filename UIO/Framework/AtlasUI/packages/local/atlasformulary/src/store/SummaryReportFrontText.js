Ext.define('Atlas.atlasformulary.store.SummaryReportFrontText', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryreportfronttext',
  model: 'Atlas.atlasformulary.model.SummaryReportFrontText',

  proxy: {
    type: 'formulary',
    url: '/SummaryConfigFrontText',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
