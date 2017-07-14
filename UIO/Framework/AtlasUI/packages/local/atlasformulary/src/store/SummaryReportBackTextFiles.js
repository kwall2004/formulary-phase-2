Ext.define('Atlas.atlasformulary.store.SummaryReportBackTextFiles', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryreportbacktextfiles',
  model: 'Atlas.atlasformulary.model.SummaryReportBackTextFiles',

  expandData: true,
  proxy: {
    type: 'formulary',
    url: '/SummaryConfigBackText',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
