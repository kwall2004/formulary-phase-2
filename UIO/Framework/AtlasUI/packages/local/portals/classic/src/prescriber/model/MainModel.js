Ext.define('Atlas.portals.prescriber.model.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalsPrescriberMainModel',

    stores: {
        claimsHistory: {
            model: 'Atlas.portals.prescriber.model.ClaimHistoryP'
        },
        formularyDrugSearchResults: {
            model: 'Atlas.portals.prescriber.model.FormularyDrugSearchResults'
        },
        hedisAlerts: {
            model: 'Atlas.portals.prescriber.model.HedisAlertP'
        },
        prescriberLetters: {
            model: 'Atlas.portals.prescriber.model.PrescriberLettersP'
        },
        priorAuthList: {
            model: 'Atlas.portals.model.SearchPriorAuth'
        },
        priorAuthHistory: {
            model: 'Atlas.portals.prescriber.model.PaHistoryP'
        }
    }
});