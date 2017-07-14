Ext.define('Atlas.atlasformulary.model.FormularyHeader', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FrmlryVer' },
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
    { name: 'CreatedBy' },
    { name: 'LOBName' },
    { name: 'PlanType' },
    { name: 'DrugRefDbName' },
    { name: 'DrugThrputcClsTypeCode' },
    { name: 'DrugPostObsltAlwdDays' },
    { name: 'DrugTypeFunction' },
    { name: 'FrmlryName' },
    { name: 'FrmlryID' },
    { name: 'FrmlrySK' },
    { name: 'StatDesc' },
    {
      name: 'AutomaticallyAssignNewNDCsInd',
      type: 'boolean'
    },
    {
      name: 'IsExcludeOTC',
      type: 'boolean'
    }
  ],
  validators: {
    FrmlryName: [{ type: 'presence' }],
    EfctvStartDt: [{ type: 'presence' }],
    EfctvEndDt: [{ type: 'presence' }],
    LOBName: [{ type: 'presence' }],
    PlanType: [{ type: 'presence' }],
    DrugRefDbName: [{ type: 'presence' }],
    DrugThrputcClsTypeCode: [{ type: 'presence' }],
    DrugPostObsltAlwdDays: [{ type: 'presence' }],
    DrugTypeFunction: [{ type: 'presence' }]
  },
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/formularyheader',
    idParam: 'frmlrysk',
    skParam: '',
    pageParam: '',
    limitParam: '',
    startParam: '',
    pagination: true
  }
});
