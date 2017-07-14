Ext.define('Atlas.atlasformulary.model.FormularyReviewReject', {
  extend: 'Atlas.atlasformulary.model.Base',

  proxy: {
    url: '/formularyreject',
    actionMethods: {
      create: 'POST',
      read: 'POST',
      update: 'POST',
      destroy: 'POST'
    }
  }
});