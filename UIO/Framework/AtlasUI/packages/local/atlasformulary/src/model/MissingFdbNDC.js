Ext.define('Atlas.atlasformulary.model.MissingFdbNDC', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.missingfdbndc',

  fields: [
    'NDC',
    'LabelName',
    'GPI',
    {
      name: 'DateToMarket',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],
  /* eslint-disable object-curly-newline */
  validators: {
    GPI: [{ type: 'presence' }],
    LabelName: [{ type: 'presence' }],
    NDC: [{ type: 'presence' }]
  },
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/missingndcfdb',
    idParam: 'ndc'
  }
});
