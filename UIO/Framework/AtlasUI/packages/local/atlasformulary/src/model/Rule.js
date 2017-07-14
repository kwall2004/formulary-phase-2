Ext.define('Atlas.atlasformulary.model.Rule', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.rule',
  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'id' },
    { name: 'property' },
    { name: 'operator' },
    { name: 'value' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'memory'
  }
});
