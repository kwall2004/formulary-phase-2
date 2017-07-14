Ext.define('Atlas.atlasformulary.model.AssocFormularies', {
  extend: 'Atlas.atlasformulary.model.Base',
  fields: [
    'FrmlryName',
    'EfctvStartDt',
    'FrmlryVer',
    'EffectiveDate'
  ],

  proxy: {
    url: '/newdrugstomarket'
  }
});
