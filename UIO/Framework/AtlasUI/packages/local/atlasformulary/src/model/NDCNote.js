Ext.define('Atlas.atlasformulary.model.NDCNote', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'NDCNoteSK',
    'NDC',
    'UserId',
    'NDCNotes',
    {
      name: 'LastModfdDate',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s.u'
    },
    'LastModfdBy'
  ],

  proxy: {
    url: '/ndcnotes',
    idParam: 'ndc'
  }
});
