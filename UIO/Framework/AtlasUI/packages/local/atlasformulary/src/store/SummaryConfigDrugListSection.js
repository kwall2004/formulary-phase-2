Ext.define('Atlas.atlasformulary.store.SummaryConfigDrugListSection', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfigdruglistsection',

  proxy: {
    url: '/SummaryConfigDrugListSection',
    reader: {
      rootProperty: ''
    }
  }
});