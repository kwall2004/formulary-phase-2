Ext.define('Atlas.atlasformulary.model.DrugList', {
  extend: 'Atlas.atlasformulary.model.Base',
  idProperty: 'DrugListSK',
  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'AssociatedFormularies' },
    {
      name: 'AutomaticallyAssignNewNDCsInd',
      defaultValue: true
    },
    { name: 'DrugListName' },
    {
      name: 'DrugListSK',
      type: 'int'
    },
    { name: 'DrugListStatus' },
    { name: 'DrugRefDbName' },
    { name: 'DrugRefDbSK' },
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
    { name: 'InctvTs' },
    { name: 'DelTs' },
    { name: 'LOBName' },
    { name: 'LOBSK' },
    { name: 'TenantOwner' },
    { name: 'UserId' },
    { name: 'DrugPostObsltAlwdDays' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/druglist',
    idParam: 'druglistsk',
    pageParam: '',
    limitParam: '',
    startParam: '',
    pagination: true,
    extraParams: {
      includeinactive: true
    }
  }
});
