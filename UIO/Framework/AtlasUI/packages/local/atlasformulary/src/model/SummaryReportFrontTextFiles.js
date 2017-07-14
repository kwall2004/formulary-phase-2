Ext.define('Atlas.atlasformulary.model.SummaryReportFrontTextFiles', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    {name: 'fileNames', type: 'string'}
  ],
  proxy: {
    url: '/SummaryConfigFrontText'
  }
});
