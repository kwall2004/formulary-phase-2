Ext.define('Atlas.atlasformulary.store.SummaryReportFrontTextFiles', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryreportfronttextfiles',
  model: 'Atlas.atlasformulary.model.SummaryReportFrontTextFiles',

  expandData: true,
  proxy: {
    type: 'formulary',
    url: '/SummaryConfigFrontText',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
