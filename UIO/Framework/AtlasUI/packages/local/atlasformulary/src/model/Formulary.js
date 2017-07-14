Ext.define('Atlas.atlasformulary.model.Formulary', {
  extend: 'Ext.data.Model',
  fields: [
    'FrmlrySK',
    'FrmlryID',
    'TenantOwner',
    'FrmlryName',
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    'LOBName',
    'StatDesc',
    'CalendarYear',
    'FrmlryVer'
  ],
  proxy: {
    type: 'formulary',
    url: '/formulary',
    reader: {
      rootProperty: 'Rows',
      totalProperty: 'Count'
    },
    api: {
      destroy: '/formulary?formularyid='
    },
    pageParam: '',
    limitParam: '',
    startParam: ''
  }
});
