Ext.define('Atlas.atlasformulary.model.MissingNDC', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.missingndc',

  fields: [
    'DrugListSK',
    'NDC',
    'LabelName',
    'GCN_SEQNO',
    {
      name: 'DateToMarket',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],
  /* eslint-disable object-curly-newline */
  validators: {
    GCN_SEQNO: [{ type: 'presence' }],
    LabelName: [{ type: 'presence' }],
    NDC: [{ type: 'presence' }]
  },
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/missingndcmedispan',
    idParam: 'ndc'
  }
});
