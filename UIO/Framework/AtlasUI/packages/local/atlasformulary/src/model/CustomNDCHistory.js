Ext.define('Atlas.atlasformulary.model.CustomNDCHistory', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.customndchistory',

  /* eslint-disable object-curly-newline */
  columns: [
    {
      name: 'ChangeDate',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'ChangeSummary' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/customndchistory',
    idParam: 'ndc'
  }
});
