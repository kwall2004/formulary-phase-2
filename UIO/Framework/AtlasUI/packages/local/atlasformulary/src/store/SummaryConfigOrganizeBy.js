Ext.define('Atlas.atlasformulary.store.SummaryConfigOrganizeBy', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.summaryconfigorganizeby',
  model: 'Atlas.atlasformulary.model.SummaryConfigOrganizeBy',

  proxy: {
    url: '/SummaryOrganizeBy'
  }
});