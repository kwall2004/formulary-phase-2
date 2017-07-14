Ext.define('Atlas.atlasformulary.model.DrugCategory', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.formularydrugcategory',

  fields: [
    'formularySK',
    'drugCategorySK',
    'name',
    'cvrdInd',
    'NDCCount',
    'formularyTierSK',
    'formularyTierName'
  ],

  proxy: {
    url: '/drugcategory',

    extraParams: {
      formularysk: null,
      isnewrequest: true
    }
  }
});
