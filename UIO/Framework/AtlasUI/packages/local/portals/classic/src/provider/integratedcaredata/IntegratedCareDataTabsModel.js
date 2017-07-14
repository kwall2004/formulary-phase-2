/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.view.provider.integratedcaredata.IntegratedCareDataTabsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.integratedcaredatatabsmodel',

    stores: {
        portalDetailStore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        NurseFacilityStore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        MedicationStore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        LevelTwoAssessment: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        individualicplanstore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        CareTeamStore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        IntegratedConditionsStoreMed: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },


        IntegratedConditionsStoreBehavior: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        },

        ContinuityOfCareStore: {
            model: 'Atlas.portals.provider.model.IcbrDataPortalDetail'
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});