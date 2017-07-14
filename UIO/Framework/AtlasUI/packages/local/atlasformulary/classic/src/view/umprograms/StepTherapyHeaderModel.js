Ext.define('Atlas.atlasformulary.view.umprograms.StepTherapyHeaderModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.steptherapyheader',

  data: {
    programSK: null,
    mode: 'read',
    titleMode: 'Viewing',
    stHeader: null,
    formDisabled: false,
    savePressed: false,
    headerDirty: false
    //successMessage: [],
  },

  stores: {
    drugrefdb: {
      type: 'drugrefdb',
      autoLoad: true
    },
    steptherapyheaders: {
      type: 'steptherapyheaders',
      autoLoad: false
    },
    usergroups: {
      type: 'usergroups',
      autoLoad: true
    }
    
  }
});
