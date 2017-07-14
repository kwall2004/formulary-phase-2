/**
 * Created by b6636 on 10/18/2016.
 */
Ext.define('Atlas.portals.hpmember.HealthPassportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.healthportalmodel',

    stores: {
        DoctorVisitsStore: {
            model: 'Atlas.portals.hpmember.model.HealthPassportData'
        },

        PrescriptionStore: {
            model: 'Atlas.portals.hpmember.model.HealthPassportData'
        },

        ImmunizationStore: {
            model: 'Atlas.portals.hpmember.model.HealthPassportData'
        },

        LabStore: {
            model: 'Atlas.portals.hpmember.model.HealthPassportData'
        },

        GapStore: {
            model: 'Atlas.portals.hpmember.model.HealthPassportData'
        }
    },

    data: {
        FromDate: '',
        ToDate: '',
        JobNumber: ''
    }
});