Ext.define('Atlas.atlasformulary.view.druglistconfig.DrugListConfigModel', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearchModel',
  alias: 'viewmodel.druglistconfig',

  data: {
    drugListSK: null,
    drugListDetailSK: null,
    mode: 'view'
  }
});
