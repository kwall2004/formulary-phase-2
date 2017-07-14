Ext.define('Atlas.atlasformulary.model.MissingNDCMedispanSearch', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.missingndcmedispansearch',

  remoteSort: true,
  remoteFilter: true,

  fields: [
    'NDC',
    'LabelName'
  ],

  proxy: {
    url: '/missingndcmedispansearch',

    extraParams: {
      querystring: ''
    }
  }
});
