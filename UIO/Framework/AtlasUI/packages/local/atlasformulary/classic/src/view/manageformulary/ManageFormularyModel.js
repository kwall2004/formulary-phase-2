Ext.define('Atlas.atlasformulary.view.manageformulary.ManageFormularyModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.manageformulary',

  data: {
    searchParams: {
      count: 25
    }
  },
  stores: {
    formularyheaders: {

      type: 'formularyheaders',
      autoLoad: false,
      listeners: {
        load: 'onFormularyHeadersPaged'
      }
    },

    formularyheaderspaged: {
      pageSize: 25,
      remoteSort: true,
      remoteFilter: true, // required for correct filtering using paging memory
      proxy: {
        type: 'memory',
        enablePaging: true
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
