Ext.define('Atlas.atlasformulary.model.DrugListSearch', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline, object-property-newline */
  fields: [
     { name: 'TenantOwner', type: 'string' },
     { name: 'DrugListName', type: 'string' },
     { name: 'LOBName', type: 'string' }
  ],
  /* eslint-enable object-curly-newline, object-property-newline */
  proxy: {
    url: '/druglist'
  }
});
