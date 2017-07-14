Ext.define('Atlas.atlasformulary.model.SummaryReportBackText', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    {
      name: 'DefaultBackTextPath'
    }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/SummaryConfigBackText',
    summaryReportConfigSectionSK: 'summaryReportConfigSectionSK'
  }
});
