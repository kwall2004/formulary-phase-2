Ext.define('Atlas.portals.view.rxmember.MyBenefitsAndCoverageViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mybenefitsandcoverageviewmodel',

    stores: {
        portalmembercoveragep: {
            model: 'Atlas.portals.model.MyBenefitsAndCoverageModel'
        },
        memberDrugCopay: {
            model: 'Atlas.portals.model.MemberCoverageCopayModel'
        },
        memberDeductibles: {
            model: 'Atlas.portals.model.MemberDeductiblesModel'
        }
    }
});
