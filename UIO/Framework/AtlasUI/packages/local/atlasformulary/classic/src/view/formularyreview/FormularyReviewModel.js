Ext.define('Atlas.atlasformulary.view.formularyreview.FormularyReviewModel', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearchModel',
  alias: 'viewmodel.formularyreview',

  data: {
    reviewrecord: null,
    formularySK: null,
    datasource: null,
    isMedispan: false
  },

  stores: {
    reviewstore: {
      model: 'Atlas.atlasformulary.model.FormularyHeader',
      autoLoad: true
    },
    formularyreviewdrugs: {
      type: 'formularyreviewdrugs',
      autoLoad: false,
      listeners: {
        load: 'onFormularyReviewDrugsPaged'
      }
    },
    formularyreviewdrugspaged: {
      pageSize: 25,
      remoteSort: true,
      remoteFilter: true, // required for correct filtering using paging memory
      proxy: {
        type: 'memory',
        enablePaging: true
      }
    },
    reviewrules: {
      itemId: 'reviewrules',
      type: 'formularyreviewrules'
    },
    reviewetc: {
      type: 'formularyreviewetc'
    },
    reviewgpi: {
      type: 'formularyreviewgpi'
    },
    reviewnotes: {
      type: 'formularyreviewnotes'
    },
    reviewapprove: {
      type: 'formularyreviewapprove'
    },
    reviewpriority: {
      type: 'formularyreviewpriority'
    },
    reviewreject: {
      type: 'formularyreviewreject'
    },
    formularyreviewahfs: {
      type: 'formularyreviewahfs'
    },
    formularyreviewtiers: {
      type: 'formularyreviewtiers'
    },
    resultsPerPage: {
      fields: ['resultsPerPage'],
      data: [
        [25], [50], [100], [250], [500]
      ]
    }
  }
});
