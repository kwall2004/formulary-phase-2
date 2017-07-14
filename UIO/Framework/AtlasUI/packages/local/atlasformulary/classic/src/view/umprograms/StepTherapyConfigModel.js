Ext.define('Atlas.atlasformulary.view.umprograms.StepTherapyConfigModel', {
    extend: 'Atlas.atlasformulary.view.drugsearch.DrugSearchModel',
    alias: 'viewmodel.steptherapyconfig',

    data: {
        formularySK: null,
        mode: 'view',
        formularyStatus: 'Draft',
        drugRefDbName: null,
        selectedDrugCategorySK: null
    }
});
