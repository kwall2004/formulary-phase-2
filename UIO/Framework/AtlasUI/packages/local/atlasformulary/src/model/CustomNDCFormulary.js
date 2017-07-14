Ext.define('Atlas.atlasformulary.model.CustomNDCFormulary', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.customndcformulary',

  columns: [
    'TenantOwner',
    'Formularies'
  ],

  hasMany: {
    model: 'Atlas.atlasformulary.model.CustomNDCFormularyFormulary',
    name: 'Formularies',
    associationKey: 'Formularies'
  },

  proxy: {
    type: 'formulary',
    url: '/customndc',
    idParam: 'ndc'
  }
});
