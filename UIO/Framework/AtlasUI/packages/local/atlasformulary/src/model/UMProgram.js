Ext.define('Atlas.atlasformulary.model.UMProgram', {
  extend: 'Ext.data.Model',
  fields: [
    'CvrgPrptyPgmSK',
    'UserGrpName',
    'CvrgPrptyPgmName',
    'CvrgPrptyTypeDesc',
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    'Status'
  ],
  proxy: {
    type: 'formulary',
    url: '/UMProgram',
    idParam: 'CvrgPrptyPgmSK'
  }
});
