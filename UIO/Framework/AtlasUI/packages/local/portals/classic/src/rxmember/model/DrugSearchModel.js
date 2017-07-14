Ext.define('Atlas.portals.rxmember.model.DrugSearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsRxmemberDrugSearchModel',
    data: {
        dtdRec: null,
        dtdRecNdc: null,
        dtdRecMedName: null
    },
    stores:{
        drugSearchResults: {
            model: 'Atlas.portals.rxmember.model.DrugSearchResults'
        },
        memberCoverages: {
            model: 'Atlas.portals.rxmember.model.MemberCoverage',
            filters: [
                function(item) {
                    return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                }
            ]
        },
        planGroupInfo: {
            model: 'Atlas.portals.rxmember.model.PlanGroupInfo'
        },
        claimsHistory: {
            model: 'Atlas.portals.rxmember.model.ClaimHistory'
        },
        drugInteractions: {
            model: 'Atlas.portals.rxmember.model.FindDrugInteractions'
        }
    },
    data: {
        'isPreferred': false,
        'planBenefitId': ''
    }
});