Ext.define('Atlas.atlasformulary.store.StepTherapyHeaders', {
  extend: 'Ext.data.Store',
  alias: 'store.steptherapyheaders',
  //model: 'Atlas.atlasformulary.model.StepTherapyHeader'
  proxy: {
    type: 'formulary',
    reader: {
    	rootProperty: ''
  	},
    url: '/StepTherapyHeader'    
  }
});
