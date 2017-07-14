Ext.define('Atlas.atlasformulary.store.SummaryConfigTiers', {
  extend: 'Ext.data.Store',
  model: 'Atlas.atlasformulary.model.SummaryConfigTier',
  alias: 'store.summaryconfigtiers',

  proxy: {
    type: 'formulary',
    url: '/summaryconfigtier',
    idParam: 'formularySK',
    reader: {
      type: 'json',
      rootProperty: 'Rows'
    }
  }
});
