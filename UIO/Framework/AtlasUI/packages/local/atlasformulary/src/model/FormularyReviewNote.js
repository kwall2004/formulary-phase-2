Ext.define('Atlas.atlasformulary.model.FormularyReviewNote', {
  extend: 'Atlas.atlasformulary.model.Base',
  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FrmlryNoteSK' },
    { name: 'AprvlTypeSK' },
    { name: 'CreatedBy' },
    {
      name: 'CreatedTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.uP'
    },
    { name: 'FrmlrySK' },
    { name: 'formularySK' },
    { name: 'Subject' },
    { name: 'Notes' },
    { name: 'LastModfdBy' },
    {
      name: 'LastModfdTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.uP'
    }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/formularynotes',
    idParam: 'formularysk'
  }
});
