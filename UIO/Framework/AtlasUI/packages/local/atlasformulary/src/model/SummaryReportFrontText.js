Ext.define('Atlas.atlasformulary.model.SummaryReportFrontText', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    { name: 'DefaultFrontTextPath' },
    { name: 'isTitlePageOnly', type: 'boolean' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/SummaryConfigFrontText',
    summaryReportConfigSectionSK: 'summaryReportConfigSectionSK'
  }
});
