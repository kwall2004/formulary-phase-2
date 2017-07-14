Ext.define('Atlas.atlasformulary.view.formularyconfig.FormularyDetailsModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.FormularyDetails',

  data: {},
  stores: {
    formularyheaders: {
      type: 'formularyheaders',
      autoLoad: false
    }
  }
});