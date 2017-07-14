Ext.define('Atlas.atlasformulary.model.MissingNDCGCNSearch', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.missingndcgcnsearch',

  fields: [
    'LabelName',
    'GCN_SEQNO',
    'NDC'
  ],

  proxy: {
    url: '/missingndcgcnsearch',

    extraParams: {
      querystring: ''
    }
  }
});
