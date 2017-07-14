Ext.define('Atlas.atlasformulary.store.DrugTypeFN', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.drugtypefn',
  model: 'Atlas.atlasformulary.model.DrugTypeFN',

  proxy: {
    url: '/drugtypefn',
    pageParam: '',
    startParam: '',
    limitParam: ''
  }
});