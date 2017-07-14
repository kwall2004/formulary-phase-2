Ext.define('Atlas.pharmacy.view.CredentialingSurveyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacy-main-cred',

    stores: {
        states: {
            type: 'common-states',
            autoLoad: true
        },

        pharmacists: {
            //TBD
        },

        credentials: {
            model: 'Atlas.pharmacy.model.Credentials'
        },

        storeEmpType: {
            model: 'Atlas.pharmacy.model.storeOTCInd',
            data:[
                { id : 1, name : "Full Time" },
                { id : 2, name : "Part Time" },
                { id : 3, name : "Contractor" }
            ]
        },

        storePharmacistLicenseInformation:{

        }
    }
});
