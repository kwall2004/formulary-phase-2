Ext.define('Atlas.atlasformulary.model.FormularyLocalStorage', {
  extend: 'Ext.data.Model',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'id' },
    { name: 'key' },
    { name: 'value' },
    { name: 'user' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'localstorage',
    id: 'formularystorage'
  }
});
