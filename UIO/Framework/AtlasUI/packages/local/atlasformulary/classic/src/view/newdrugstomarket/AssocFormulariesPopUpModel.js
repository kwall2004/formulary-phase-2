Ext.define('Atlas.atlasformulary.view.newdrugstomarket.AssocFormulariesPopUpModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.assocformulariespopup',

  data: {
    NDCPassed: null
  },

  stores: {
    associatedformularies: {
      type: 'associatedformularies',
      autoLoad: true,
      session: true
    }
  }
});
