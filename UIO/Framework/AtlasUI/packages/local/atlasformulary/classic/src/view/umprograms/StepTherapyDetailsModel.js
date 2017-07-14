Ext.define('Atlas.atlasformulary.view.umprograms.StepTherapyDetailsModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.StepTherapyDetails',

  data: {},
  stores: {
    steptherapyheaders: {
      type: 'steptherapyheaders',
      autoLoad: false
    }
  }
});