Ext.define('Atlas.atlasformulary.model.DrugTherapeuticClassType', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'DrugThrputcClsTypeCode',
    'DrugThrputcClsTypeSK',
    'Frmlry',
    'DrugThrputcClsTypeDesc',
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    {
      name: 'EfctvEndDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    'CreatedBy',
    {
      name: 'CreatedTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    },
    'LastModfdBy',
    {
      name: 'LastModfdTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    },
    {
      name: 'InctvTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    },
    {
      name: 'DelTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    }
  ],

  proxy: {
    url: '/drugthrputcclstype'
  }
});
