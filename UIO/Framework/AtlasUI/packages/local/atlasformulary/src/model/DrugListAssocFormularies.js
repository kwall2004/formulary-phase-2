Ext.define('Atlas.atlasformulary.model.DrugListAssocFormularies', {
  extend: 'Atlas.atlasformulary.model.Base',

  idProperty: 'DrugListSK',

  fields: [
    'TenantOwner',
    'FrmlryName',
    'FrmlryID',
    'FrmlryVer',
    'EfctvStartDt'
  ],

  proxy: {
    type: 'formulary',
    url: '/druglistformulary',
    idParam: 'druglistsk',
    autoLoad: false
  }
});
