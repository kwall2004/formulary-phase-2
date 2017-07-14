Ext.define('Atlas.atlasformulary.view.formularyheader.FormularyHeaderModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.formularyheader',

  requires: [
    'Atlas.atlasformulary.store.FormularyHeaders',
    'Atlas.atlasformulary.store.FormularyTierStore',
    'Atlas.atlasformulary.overrides.BetweenDates'
  ],

  data: {
    formularySK: null,
    mode: 'read',
    titleMode: 'Viewing',
    formularyHeader: null,
    savePressed: false,
    headerDirty: false,
    successMessage: [],
    pendingCalls: []
  },

  formulas: {
    disableDaysAfterObsolete: function (get) {
      return get('formularySK') !== null;
    }
  },

  stores: {
    tiers: {
      type: 'formularytier'
    },
    druglists: {
      type: 'druglists',
      autoLoad: true
    },
    druglistdata: {
      type: 'formularydruglists'
    },
    lob: {
      type: 'lob',
      autoLoad: true,
      listeners: {
        beforeload: 'onStoreBeforeLoad',
        load: 'onStoreLoad'
      }
    },
    formularyplantype: {
      type: 'formularyplantype',
      autoLoad: true,
      listeners: {
        beforeload: 'onStoreBeforeLoad',
        load: 'onStoreLoad'
      }
    },
    formularyplansubtype: {
      type: 'formularyplansubtype',
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
    },
    therapeuticclasstypes: {
      type: 'therapeuticclasstypes',
      autoLoad: true,
      listeners: {
        beforeload: 'onStoreBeforeLoad',
        load: 'onStoreLoad'
      }
    },
    drugtypefn: {
      type: 'drugtypefn'
    }
  }
});
