Ext.define('Atlas.atlasformulary.view.manageformulary.FormularyConfigModel', {
  extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearchModel',
  alias: 'viewmodel.formularyconfig',

  data: {
    formularySK: null,
    mode: 'view',
    formularyStatus: 'Draft',
    drugRefDbName: null,
    selectedDrugCategorySK: null
  }
});
