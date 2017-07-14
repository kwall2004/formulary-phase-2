Ext.define('Atlas.atlasformulary.view.druglists.DrugListsModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.druglists',

  data: {
    searchText: ''
  },

  stores: {
    druglists: {
      listeners: {
        load: 'onDrugListsPaged'
      },
      type: 'druglists',
      autoLoad: true
    },

    druglistspaged: {
      pageSize: 25,
      remoteSort: true,
      remoteFilter: true, // required for correct filtering using paging memory
      proxy: {
        type: 'memory',
        enablePaging: true
      }
    },

    druglistassocformularies: {
      type: 'druglistassocformularies',
      proxy: {
        url: '/druglistformulary',
        idParam: 'druglistsk',
        pageParam: '',
        startParam: '',
        limitParam: '',
        reader: {
          type: 'json',
          rootProperty: ''
        }
      }
    },

    resultsPerPage: {
      fields: [ 'resultsPerPage' ],
      data: [
        [ 25 ], [ 50 ], [ 100 ], [ 250 ], [ 500 ]
      ]
    }
  }
});
