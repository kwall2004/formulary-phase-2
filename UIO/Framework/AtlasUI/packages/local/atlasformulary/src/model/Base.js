Ext.define('Atlas.atlasformulary.model.Base', {
  extend: 'Ext.data.Model',
  require: [
    'Atlas.atlasformulary.data.proxy.FormularyProxy',
    'Atlas.atlasformulary.service.FormularyRestException'
  ],

  schema: {
    id: 'atlasformulary',
    namespace: 'Atlas.atlasformulary.model',
    proxy: {
      type: 'formulary'
    }
  }
});