Ext.define('Atlas.atlasformulary.view.umprograms.ManageUMProgramModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.manageumprogram',

  data: {
    searchParams: {
      count: 25
    }
  },
  stores: {
    umprograms: {

      type: 'umprograms',
      autoLoad: false,
      listeners: {
        load: 'onUMProgramsPaged'
      }
    },

    umprogramspaged: {
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
