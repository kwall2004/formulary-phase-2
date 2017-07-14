Ext.define('Atlas.atlasformulary.model.FormularyReviewPriority', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FrmlrySK' },
    { name: 'AprvlTypePrity' },
    { name: 'RejectTypePrity' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/formularyapprovalpriority',

    idParam: 'formularysk'
  }
});
