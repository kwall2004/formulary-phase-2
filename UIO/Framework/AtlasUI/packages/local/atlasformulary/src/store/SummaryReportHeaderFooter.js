Ext.define('Atlas.atlasformulary.store.SummaryReportHeaderFooter', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryreportheaderfooter',
  model: 'Atlas.atlasformulary.model.SummaryReportHeaderFooter',

  proxy: {
    type: 'formulary',
    url: '/SummaryConfigHeaderFooter',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
