Ext.define('Atlas.atlasformulary.model.SummaryReportBackTextFiles', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    {name: 'fileNames', type: 'string'}
  ],
  proxy: {
    url: '/SummaryConfigBackText'
  }
});
