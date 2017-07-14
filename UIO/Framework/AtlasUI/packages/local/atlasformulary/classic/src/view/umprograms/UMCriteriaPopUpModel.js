Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPopUpModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.umcriteriapopup',
  data: {
    isManualVisible2: false,
    umcriteriarec: null,
    userId: null,
    DrugCatgSK: null,
    FrmlrySK: null,
    FrmlryTierSK: null,
    IsCovered: null,
    mode: 'read'
  },
  stores: {
    priorAuthNames: {
      model: 'Atlas.atlasformulary.model.PriorAuthNames',
      autoLoad: true,
      sorters: [
        {
          property: 'ListDescription',
          direction: 'ASC'
        }
      ]
    },
    stepNames: {
      model: 'Atlas.atlasformulary.model.StepNames',
      autoLoad: true,
      sorters: [
        {
          property: 'RuleCriteria',
          direction: 'ASC'
        }
      ]
    },
    rxFillsList: {
      id: 'rxFillsList',
      fields: [ 'name', 'value' ],
      data: [
        {
          name: 'Days',
          value: 'Days'
        },
        {
          name: 'Weeks',
          value: 'Weeks'
        },
        {
          name: 'Months',
          value: 'Months'
        },
        {
          name: 'Years',
          value: 'Years'
        },
        {
          name: 'Lifetime',
          value: 'Lifetime'
        }
      ]
    },
    pdlList: {
      id: 'pdlList',
      fields: [ 'name', 'value' ],
      data: [
        {
          'name': 'Non-PDL',
          'value': 'Non-PDL'
        },
        {
          'name': 'Non-preferred',
          'value': 'Non-preferred'
        },
        {
          'name': 'Preferred',
          'value': 'Preferred'
        }
      ]
    },
    genderList: {
      id: 'genderList',
      fields: [ 'name', 'value' ],
      data: [
        {
          'value': 'M',
          'name': 'Male'
        },
        {
          'value': 'F',
          'name': 'Female'
        }
      ]
    }
  }
});
