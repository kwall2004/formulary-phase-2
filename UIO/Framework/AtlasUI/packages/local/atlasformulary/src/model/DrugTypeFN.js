Ext.define('Atlas.atlasformulary.model.DrugTypeFN', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.drugtypefn',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'DrugTypeFnSK' },
    { name: 'DrugTypeFnCd' },
    { name: 'DrugTypeFnName' },
    { name: 'DrugTypeFnDesc' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/drugtypefn'
  }
});

