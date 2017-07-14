Ext.define('Atlas.atlasformulary.model.TranslatedRule', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.translatedrule',
  /* eslint-disable object-curly-newline */
  fields: [
    {
      name: 'description',
      dataIndex: 'description'
    },
    { name: 'criteriaId' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'memory'
  }
});
