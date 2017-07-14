Ext.define('Atlas.atlasformulary.model.FormularySearch', {
  extend: 'Atlas.atlasformulary.model.Base',
  requires: [
    'Atlas.atlasformulary.model.Rule'
  ],
  /* eslint-disable object-curly-newline, object-property-newline */
  fields: [
    { name: 'TenantOwner', type: 'string' },
    { name: 'FrmlryName', type: 'string' },
    { name: 'LOBName', type: 'string' }
  ],
  /* eslint-enable object-curly-newline, object-property-newline */
  hasOne: {
    role: 'Rule',
    model: 'Atlas.atlasformulary.model.Rule'
  },

  proxy: {
    url: '/formularysearch'
  }
});
