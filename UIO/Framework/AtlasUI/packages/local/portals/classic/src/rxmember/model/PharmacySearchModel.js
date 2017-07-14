/**
 * Created by m4542 on 9/27/2016.
 */
Ext.define('Atlas.portals.view.rxmember.model.PharmacySearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PharmacySearchModel',
    data:{
      pharmacyDetailRecord:''
    },
    stores: {
        coveragestore: {
            model: 'Atlas.portals.rxmember.model.MemberCoverage'
        },
        pharmacygridstore: {
            model: 'Atlas.portals.rxmember.model.PharmacySearchResults'
        },
        pharmacytypestore: {
            model: 'Atlas.portals.rxmember.model.PharmacyType'
        },
        planGroupInfo: {
            model: 'Atlas.portals.rxmember.model.PlanGroupInfo'
        }
    }
});
