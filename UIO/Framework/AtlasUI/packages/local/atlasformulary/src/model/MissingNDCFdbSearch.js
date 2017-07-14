Ext.define('Atlas.atlasformulary.model.MissingNDCFdbSearch', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.missingndcfdbsearch',

  remoteSort: true,
  remoteFilter: true,

  fields: [
    'NDC',
    'LabelName'
  ]
});
