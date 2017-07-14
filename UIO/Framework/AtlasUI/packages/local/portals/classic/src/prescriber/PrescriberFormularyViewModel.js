Ext.define('Atlas.portals.view.prescriber.PrescriberFormularyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.prescriberformularyviewmodel',

    stores: {
        formularyPlanGroups: {
            model: 'Atlas.portals.view.prescriber.model.PrescriberFormularyModel'
        },
        formularyDocs: {
            model: 'Atlas.portals.view.prescriber.model.FormularyDocumentModel'
        }
    }
});