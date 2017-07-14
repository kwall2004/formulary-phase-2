Ext.define('Atlas.atlasformulary.view.drugsearch.DrugSearchModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.drugsearch',

  data: {
    searchParams: {
      formularySK: null,
      drugListSK: null,
      orderBy: null,
      userId: null,
      sessionId: null,
      payload: [],
      criteriaChange: true,
      startIndex: 0,
      count: 25
    },
    dataSource: 'fdb',
    hierarchyTreeSingleSelect: false,
    drugListImportHidden: true,
    drugListActivateHidden: true,
    drugListSK: null
  },

  stores: {
    dataSources: {
      autoLoad: false,
      proxy: {
        type: 'formulary',
        url: '/drugrefdb'
      }
    },
    criteriaColumns: {
      autoLoad: false,
      proxy: {
        type: 'formulary',
        url: '/drugrefdbvalqulfrtype'
      }
    },
    criteria: {
      type: 'rules'
    },
    resultsPerPage: {
      fields: ['resultsPerPage'],
      data: [
        [25], [50], [100], [250], [500]
      ]
    }
  }
});
