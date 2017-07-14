Ext.define('Atlas.atlasformulary.store.DrugTherapeuticClassTypes', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.therapeuticclasstypes',
  model: 'Atlas.atlasformulary.model.DrugTherapeuticClassType',

  proxy: {
    url: '/drugthrputcclstype',
    pageParam: '',
    startParam: '',
    limitParam: ''
  }
});
