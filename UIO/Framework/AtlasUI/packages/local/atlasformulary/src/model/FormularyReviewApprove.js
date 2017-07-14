Ext.define('Atlas.atlasformulary.model.FormularyReviewApprove', {
  extend: 'Atlas.atlasformulary.model.Base',

  proxy: {
    url: '/formularyapprove',
    actionMethods: {
      create: 'POST',
      read: 'POST',
      update: 'POST',
      destroy: 'POST'
    }
  }
});