Ext.define('Atlas.formulary.view.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.oldFormularyMainModel',
    //remove this when data is live
    stores: {
        sections: {
            data: [
                {
                    text: 'Formulary Section 1',
                    sectionId: 'FormularySection1'
                },
                {
                    text: 'Formulary Section 2',
                    sectionId: 'FormularySection3'
                },
                {
                    text: 'Formulary Section 3',
                    sectionId: 'FormularySection3'
                }
            ]
        }
    }
});