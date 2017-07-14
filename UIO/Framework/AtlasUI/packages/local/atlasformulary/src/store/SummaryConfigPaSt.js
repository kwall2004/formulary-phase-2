Ext.define('Atlas.atlasformulary.store.SummaryConfigPaSt', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfigpast',

  proxy: {
    url: '/SummaryConfigPaSt',
    reader: {
      rootProperty: ''
    }
  }
});