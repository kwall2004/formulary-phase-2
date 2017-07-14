Ext.define('Atlas.atlasformulary.view.druglistheader.DrugListHeaderModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.druglistheader',

  requires: [
    'Atlas.atlasformulary.store.DrugLists',
    'Atlas.atlasformulary.service.FormularyRestException',
    'Atlas.atlasformulary.overrides.BetweenDates'
  ],

  data: {
    drugListSK: null,
    mode: 'view',
    titleMode: 'Viewing',
    drugListHeader: null,
    userId: Atlas.user.un,
    savePressed: false,
    headerDirty: false,
    pendingCalls: []
  },

  stores: {
    lob: {
      type: 'lob',
      autoLoad: true,
      listeners: {
        beforeload: 'onStoreBeforeLoad',
        load: 'onStoreLoad'
      }
    },
    drugrefdb: {
      type: 'drugrefdb',
      autoLoad: true,
      listeners: {
        beforeload: 'onStoreBeforeLoad',
        load: 'onStoreLoad'
      }
    }
  }
});
